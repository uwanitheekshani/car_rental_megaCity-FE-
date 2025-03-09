import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/MegaCity_war_exploded/userBookings") // Change endpoint as needed
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            });
    }, []);

    const handlePayment = (bookingId) => {
        axios.post("http://localhost:8080/MegaCity_war_exploded/payment", {
            bookingId,
            paymentAmount: 5000, // Example amount, adjust as needed
            currency: "USD",
            paymentMethod: "Credit Card",
            paymentStatus: "Completed"
        }).then(response => {
            alert("Payment successful!");
            setBookings(bookings.filter(booking => booking.id !== bookingId)); // Remove paid bookings
        }).catch(error => {
            console.error("Payment failed:", error);
            alert("Payment failed. Try again.");
        });
    };

    if (loading) return <div className="text-center mt-5"><h3>Loading bookings...</h3></div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">💳 Your Bookings & Payments</h2>
            <div className="row">
                {bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div key={booking.id} className="col-md-4 mb-4">
                            <div className="card shadow-lg border-0">
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{booking.carName}</h5>
                                    <p className="card-text text-muted">Booking ID: {booking.id}</p>
                                    <p className="fw-semibold text-primary">Price: ${booking.paymentAmount}</p>

                                    <button className="btn btn-success w-100" onClick={() => handlePayment(booking.id)}>
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h5 className="text-center text-muted">No pending payments.</h5>
                )}
            </div>
        </div>
    );
};

export default PaymentsPage;
