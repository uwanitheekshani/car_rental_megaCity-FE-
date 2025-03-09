// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PaymentsPage = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         axios.get(`http://localhost:8080/MegaCity_war_exploded/booking?userId=${userId}`) // Change endpoint as needed
//             .then(response => {
//                 setBookings(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Error fetching bookings:", error);
//                 setLoading(false);
//             });
//     }, []);

//     const handlePayment = (bookingId) => {
//         axios.post("http://localhost:8080/MegaCity_war_exploded/payment", {
//             bookingId,
//             paymentAmount: 5000,
//             currency: "USD",
//             paymentMethod: "Credit Card",
//             paymentStatus: "Completed"
//         }).then(response => {
//             alert("✅ Payment successful!");
//             setBookings(bookings.filter(booking => booking.id !== bookingId));
//         }).catch(error => {
//             console.error("Payment failed:", error);
//             alert("❌ Payment failed. Try again.");
//         });
//     };

//     if (loading) return <div className="text-center mt-5"><h3>⏳ Loading bookings...</h3></div>;

//     // return (
//     //     <div className="container mt-5">
//     //         <h2 className="text-center mb-4">💳 Your Bookings & Payments</h2>
//     //         <div className="row">
//     //             {bookings.length > 0 ? (
//     //                 bookings.map(booking => (
//     //                     <div key={booking.id} className="col-md-4 mb-4">
//     //                         <div className="card shadow-lg border-0">
//     //                             <div className="card-body text-center">
//     //                                 <h5 className="card-title fw-bold">{booking.carId}</h5>
//     //                                 <p className="card-text text-muted">Booking ID: {booking.id}</p>
//     //                                 <p className="fw-semibold text-primary">Price: RS. {booking.totalAmount}</p>

//     //                                 <button className="btn btn-success w-100" onClick={() => handlePayment(booking.id)}>
//     //                                     Pay Now
//     //                                 </button>
//     //                             </div>
//     //                         </div>
//     //                     </div>
//     //                 ))
//     //             ) : (
//     //                 <h5 className="text-center text-muted">No pending payments.</h5>
//     //             )}
//     //         </div>
//     //     </div>
//     // );
//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4 fw-bold text-dark">
//                 💳 Your Bookings & Payments
//             </h2>

//             {bookings.length > 0 ? (
//                 <div className="row g-4">
//                     {bookings.map(booking => (
//                         <div key={booking.id} className="col-lg-4 col-md-6">
//                             <div className="card shadow-lg border-0">
//                                 <div className="card-header text-white text-center fw-bold"
//                                    >
//                                     🚗 Booking ID: {booking.id}
//                                 </div>
                                
//                                 <div className="card-body text-center">
//                                     <h5 className="fw-bold text-primary">{booking.carId}</h5>
//                                     <p className="text-secondary">Total Price: 
//                                         <span className="fw-bold text-success"> RS. {booking.totalAmount}</span>
//                                     </p>
                                    
//                                     <button className="btn btn-success w-100" onClick={() => handlePayment(booking.id)}
//                                     >
//                                         💰 Pay Now
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center mt-5">
//                     <h4 className="text-muted">🚀 No pending payments. Enjoy your ride!</h4>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaymentsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal

const PaymentsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`http://localhost:8080/MegaCity_war_exploded/booking?userId=${userId}`)
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            });
    }, []);

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
    };

    const handlePayment = () => {
        if (!selectedBooking) return;

        axios.post("http://localhost:8080/MegaCity_war_exploded/payment", {
            bookingId: selectedBooking.id,
            userId: userId,
            paymentAmount: selectedBooking.totalAmount,
            currency: "LKR",
            paymentMethod: "credit_card",
            paymentStatus: "completed"
        }).then(response => {
            alert("✅ Payment successful!");
            setBookings(bookings.filter(booking => booking.id !== selectedBooking.id));
            handleCloseModal();
        }).catch(error => {
            console.error("Payment failed:", error);
            alert("❌ Payment failed. Try again.");
        });
    };

    if (loading) return <div className="text-center mt-5"><h3>⏳ Loading bookings...</h3></div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold text-dark">
                💳 Your Bookings & Payments
            </h2>

            <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            
                            <th>Booking ID</th>
                            <th>Car ID</th>
                            <th>Total Price (RS)</th>
                            <th>Payment Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.id}>
                                    
                                    <td>{booking.id}</td>
                                    <td>{booking.carId}</td>
                                    <td className="fw-bold text-success">RS. {booking.totalAmount}</td>
                                    <td>
                                        <button className="btn btn-sm btn-success"
                                            onClick={() => handleOpenModal(booking)}
                                        >
                                            💰 Pay Now
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    🚀 No pending payments. Enjoy your ride!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Modal for Payment Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>💳 Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBooking && (
                        <div>
                            <p><strong>Car ID:</strong> {selectedBooking.carId}</p>
                            <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
                            <p><strong>currency:</strong>LKR</p>
                            <p><strong>Total Price:</strong> RS. {selectedBooking.totalAmount}</p>
                            <p><strong>Payment Method:</strong> Credit Card</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ❌ Cancel
                    </Button>
                    <Button variant="success" onClick={handlePayment}>
                        ✅ Confirm Payment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PaymentsPage;
