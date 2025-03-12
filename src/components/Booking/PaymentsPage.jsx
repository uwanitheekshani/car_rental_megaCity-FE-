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
                            <th>Booking Status</th>
                            <th>Payment Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.id}>
                                    
                                    <td>{booking.id}</td>
                                    <td>{booking.carId}</td>
                                    <td className="fw-bold text-success">RS. {booking.totalAmount}</td>
                                    <td>{booking.status}</td>
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
                        )} */}
                         {bookings.filter(booking => booking.status === "confirmed").length > 0 ? (
                            bookings.filter(booking => booking.status === "confirmed").map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.carId}</td>
                                    <td className="fw-bold text-success">RS. {booking.totalAmount}</td>
                                    <td>{booking.status}</td>
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
                                <td colSpan="5" className="text-center text-muted">
                                    🚀 No confirmed bookings pending payment.
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
