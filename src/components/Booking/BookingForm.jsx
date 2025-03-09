
// import React, { useState, useEffect } from "react";
// import { useParams, useLocation} from "react-router-dom";
// import axios from "axios";

// const BookingForm = () => {
//     const { id } = useParams();  // Get carId from URL
//     const location = useLocation();  // Get state from the navigation
//     const { carImageUrl, carName, carPrice} = location.state || {};

//     const [car, setCar] = useState(null);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [status, setStatus] = useState("Pending");
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [cars, setCars] = useState([]);  // State to hold all cars
//     const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

//     useEffect(() => {
//         // Fetch all cars from the backend
//         axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
//             .then(response => {
//                 setCars(response.data);  // Store all cars in state
//             })
//             .catch(error => console.error("There was an error fetching the cars:", error));
//     }, []);  // Only run on mount

//     useEffect(() => {
//         if (cars.length > 0) {
//             // Find the car based on the carId from the URL
//             const foundCar = cars.find(car => car.id === parseInt(id)); // Use the `id` from URL
//             setCar(foundCar);  // Set the filtered car details
//         }
//     }, [cars, id]);  // Runs when cars or id changes

//       // Function to calculate totalAmount
//       useEffect(() => {
//         if (startDate && endDate && (carPrice || car?.price)) {
//             const start = new Date(startDate);
//             const end = new Date(endDate);
//             const timeDiff = end - start;
//             const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

//             if (dayDiff > 0) {
//                 setTotalAmount(dayDiff * (carPrice || car?.price));
//             } else {
//                 setTotalAmount(0); // If invalid date range
//             }
//         }
//     }, [startDate, endDate, carPrice, car]);

//     const handleBookingSubmit = (e) => {
//         e.preventDefault();
//         const userId = localStorage.getItem("userId");

//         const bookingData = {
//             carId: id,  // Send the carId from URL
//             userId,
//             startDate,
//             endDate,
//             totalAmount,
//             status:'pending',
//         };

//         // Make API call to create booking
//         axios.post("http://localhost:8080/MegaCity_war_exploded/booking", bookingData)
//             // .then(response => {
//             //     alert("Booking successfully created!");
//             // })
//             .then(response => {
//                 alert("Booking successfully created!");
//                 setIsBookingConfirmed(true); // Disable button
//                 setTimeout(() => {
//                    window.location.href = "/cars";// Redirect to car listing page
//                 }, 2000); // Wait 2 seconds before redirecting
//             })
//             .catch(error => {
//                 console.error("There was an error creating the booking:", error);
//             });
//     };

//     if (!car) {
//         return <div>Loading car details...</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Book Your Car</h2>
//             <div className="row">
//                 <div className="col-md-6">
//                 <img
//                         src={carImageUrl || car.imageUrl}  // Use image from state or fallback to car data
//                         alt={carName || car.name}  // Use car name from state or fallback to car data
//                         className="img-fluid"
//                         style={{ height: "350px", objectFit: "cover" }}
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <h3>{car.name}</h3>
//                     <p>{car.model} - {car.year}</p>
//                     <p><strong>Price per day: </strong>RS.{carPrice || car.price}</p>

//                     <form onSubmit={handleBookingSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="startDate" className="form-label">Start Date</label>
//                             <input
//                                 type="date"
//                                 id="startDate"
//                                 className="form-control"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="endDate" className="form-label">End Date</label>
//                             <input
//                                 type="date"
//                                 id="endDate"
//                                 className="form-control"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="totalAmount" className="form-label">Total Amount</label>
//                             <input
//                                 type="number"
//                                 id="totalAmount"
//                                 className="form-control"
//                                 value={totalAmount}
//                                 onChange={(e) => setTotalAmount(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         <button type="submit" 
//                         className="btn btn-primary w-100"
//                         disabled={isBookingConfirmed}
//                         >
//                             {/* Confirm Booking */}
//                             {isBookingConfirmed ? "Booking Confirmed!" : "Confirm Booking"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BookingForm;


import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingForm = () => {
    const { id } = useParams();  // Get carId from URL
    const location = useLocation();
    const { carImageUrl, carName, carPrice } = location.state || {};

    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    const userId = localStorage.getItem("userId");

    // Fetch all bookings for the logged-in user
    useEffect(() => {
        axios.get(`http://localhost:8080/MegaCity_war_exploded/booking?userId=${userId}`)
            .then(response => setBookings(response.data))
            .catch(error => console.error("Error fetching bookings:", error));
    }, [userId]);

    // Fetch car details
    useEffect(() => {
        axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
            .then(response => {
                const foundCar = response.data.find(car => car.id === parseInt(id));
                setCar(foundCar);
            })
            .catch(error => console.error("Error fetching cars:", error));
    }, [id]);

    // Calculate total amount when dates change
    useEffect(() => {
        if (startDate && endDate && (carPrice || car?.price)) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            // const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            // setTotalAmount(dayDiff > 0 ? dayDiff * (carPrice || car?.price) : 0);
             // Check if startDate and endDate are the same
        if (start.getTime() === end.getTime()) {
            setTotalAmount(carPrice || car?.price);  // Set totalAmount to carPrice if dates are the same
        } else {
            const dayDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setTotalAmount(dayDiff > 0 ? dayDiff * (carPrice || car?.price) : 0);  // Calculate based on day difference
        }
        }
    }, [startDate, endDate, carPrice, car]);

    // Handle booking submit (Create or Update)
    const handleBookingSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            carId: id,
            userId,
            startDate,
            endDate,
            totalAmount,
            status: "pending",
        };

        if (selectedBooking) {
            // Update existing booking
            axios.put(`http://localhost:8080/MegaCity_war_exploded/booking/${selectedBooking.id}`, bookingData)
                .then(() => {
                    alert("Booking successfully updated!");
                    setSelectedBooking(null);
                setIsBookingConfirmed(false);
                setStartDate(""); // Reset start date
                setEndDate("");   // Reset end date
                setTotalAmount(0); // Reset total amount
                refreshBookings();
                })
                .catch(error => console.error("Error updating booking:", error));
        } else {
            // Create new booking
            axios.post("http://localhost:8080/MegaCity_war_exploded/booking", bookingData)
                .then(() => {
                    alert("Booking successfully created!");
                    setIsBookingConfirmed(true);
                    setStartDate(""); // Reset start date
                    setEndDate("");   // Reset end date
                    setTotalAmount(0); // Reset total amount
                    refreshBookings();
                    setTimeout(() => {
                        window.location.href = "/cars";
                    }, 2000);
                })
                .catch(error => console.error("Error creating booking:", error));
        }
    };

    // Refresh bookings list
    const refreshBookings = () => {
        axios.get(`http://localhost:8080/MegaCity_war_exploded/booking?userId=${userId}`)
            .then(response => setBookings(response.data))
            .catch(error => console.error("Error refreshing bookings:", error));
    };

    // Handle booking edit (Populate form)
    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setStartDate(booking.startDate);
        setEndDate(booking.endDate);
        setTotalAmount(booking.totalAmount);
    };

    // Handle booking delete
    const handleDeleteBooking = (id) => {
        axios.delete(`http://localhost:8080/MegaCity_war_exploded/booking?id=${id}`)
            .then(() => {
                alert("Booking deleted successfully!");
                refreshBookings();
            })
            .catch(error => console.error("Error deleting booking:", error));
    };

    if (!car) return <div>Loading car details...</div>;

    return (
        <div className="container mt-5">
        <h2 className="text-center mb-4">{selectedBooking ? "Edit Booking" : "Book Your Car"}</h2>
        <div className="row">
            <div className="col-md-6">
                <img
                    src={carImageUrl || car.imageUrl}
                    alt={carName || car.name}
                    className="img-fluid"
                    style={{ height: "350px", objectFit: "cover" }}
                />
            </div>
            <div className="col-md-6">
                <h3>{car.name}</h3>
                <p>{car.model} - {car.year}</p>
                <p><strong>Price per day: </strong>RS.{carPrice || car.price}</p>

                {/* Booking Form (Handles both create and update) */}
                <form onSubmit={handleBookingSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <input type="number" className="form-control" value={totalAmount} readOnly />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isBookingConfirmed}>
                        {selectedBooking ? "Update Booking" : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </div>

            <h3 className="mt-5">My Bookings</h3>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Car ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.carId}</td>
                            <td>{booking.startDate}</td>
                            <td>{booking.endDate}</td>
                            <td>RS.{booking.totalAmount}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditBooking(booking)}>Edit</Button>
                                <Button variant="danger" className="ms-2" onClick={() => handleDeleteBooking(booking.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

          
        </div>
    );
};

export default BookingForm;

