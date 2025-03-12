// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Table, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MyBookings = () => {
//     const { id } = useParams();  // Get carId from URL
//     const location = useLocation();

//     const [car, setCar] = useState(null);
//     const [bookings, setBookings] = useState([]);

//     const userId = localStorage.getItem("userId");

//     // Fetch all bookings for the logged-in user
//     useEffect(() => {
//         axios.get(`http://localhost:8080/MegaCity_war_exploded/booking?userId=${userId}`)
//             .then(response => setBookings(response.data))
//             .catch(error => console.error("Error fetching bookings:", error));
//     }, [userId]);

//     // Fetch car details
//     useEffect(() => {
//         axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
//             .then(response => {
//                 const foundCar = response.data.find(car => car.id === parseInt(id));
//                 setCar(foundCar);
//             })
//             .catch(error => console.error("Error fetching cars:", error));
//     }, [id]);

    

//     return (
//         <div className="container mt-5">
       
//             <h3 className="mt-5">My Bookings</h3>
//             <Table striped bordered hover className="mt-3">
//                 <thead>
//                     <tr>
//                         <th>Booking ID</th>
//                         <th>Car ID</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Total Amount</th>
//                         <th>Booking Status</th>
                      
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {bookings.map(booking => (
//                         <tr key={booking.id}>
//                             <td>{booking.id}</td>
//                             <td>{booking.carId}</td>
//                             <td>{booking.startDate}</td>
//                             <td>{booking.endDate}</td>
//                             <td>RS.{booking.totalAmount}</td>
//                             <td>{booking.status}</td>
                           
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

          
//         </div>
//     );
// };

// export default MyBookings;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyBookings = () => {
    const { id } = useParams();  // Get carId from URL
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/MegaCity_war_exploded/booking`, {
                    params: { userId }
                });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [userId]);

     const handleUpdateStatus = async (id, newStatus) => {
            try {
                const response = await axios.put(
                    `http://localhost:8080/MegaCity_war_exploded/booking?id=${id}&action=updateStatus&status=${newStatus}`
                );
        
                if (response.data === "Booking Status Updated Successfully") {
                    alert(`Booking ${newStatus} successfully!`);
        
                    // Update the state immediately
                    setBookings((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking.id === id ? { ...booking, status: newStatus } : booking
                        )
                    );
                } else {
                    alert("Failed to update booking!");
                }
            } catch (error) {
                console.error(`Error updating booking to ${newStatus}:`, error);
                alert(`Error updating booking to ${newStatus}. Check console for details.`);
            }
        };

    return (
        <div className="container mt-5">
            {/* Title and Refresh Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">📅 My Bookings</h3>
                <Button variant="outline-primary" onClick={() => window.location.reload()}>
                    🔄 Refresh
                </Button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-center text-muted">No bookings found.</p>
            ) : (
                <Table striped bordered hover responsive className="text-center">
                    <thead className="table-dark">
                        <tr>
                            {/* <th>#</th> */}
                            <th>Car ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id}>
                                {/* <td>{index + 1}</td> */}
                                <td>{booking.carId}</td>
                                <td>{booking.startDate}</td>
                                <td>{booking.endDate}</td>
                                <td>RS. {booking.totalAmount}</td>
                                <td className={booking.status === "Pending" ? "text-warning fw-bold" : "text-success fw-bold"}>
                                    {booking.status}
                                </td>
                                <td>
                                    {booking.status === "pending" && (
                            <>
                               
                                <button 
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                            
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default MyBookings;


