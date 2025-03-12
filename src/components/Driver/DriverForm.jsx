import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DriverForm = () => {
    const { id } = useParams();  // Get carId from URL
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    // useEffect(() => {
    //     const fetchBookings = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/MegaCity_war_exploded/booking`, {
    //                 params: { userId }
    //             });
    //             setBookings(response.data);
    //         } catch (error) {
    //             console.error("Error fetching bookings:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchBookings();
    // }, [userId]);

    return (
        <div className="container mt-5">
            {/* Title and Refresh Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold"> My Travel Bookings</h3>
              
            </div>

            {/* Loading Indicator */}
            {/* {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : bookings.length === 0 ? (
                <p className="text-center text-muted">No bookings found.</p>
            ) : ( */}
                <Table striped bordered hover responsive className="text-center">
                    <thead className="table-dark">
                        <tr>
                            {/* <th>#</th> */}

                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Car ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                            <tr >
                                {/* <td>{index + 1}</td> */}
                                {/* <td>{booking.carId}</td>
                                <td>{booking.startDate}</td>
                                <td>{booking.endDate}</td>
                                <td>RS. {booking.totalAmount}</td>
                                <td className={booking.status === "Pending" ? "text-warning fw-bold" : "text-success fw-bold"}>
                                    {booking.status}
                                </td> */}
                            </tr>
                       
                    </tbody>
                </Table>
            {/* )} */}
        </div>
    );
};

export default DriverForm;


