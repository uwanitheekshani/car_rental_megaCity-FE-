import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCar, FaUser, FaCalendarCheck, FaMoneyBillWave } from 'react-icons/fa';
import { Button, Modal, Form } from "react-bootstrap";

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("car");
    const [showUserModal, setShowUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(""); // Status filter
    const [selectedModel, setSelectedModel] = useState(""); // Model filter
    const [bookings, setBookings] = useState([]);
    const [paymentFilter, setPaymentFilter] = useState("paid");
    const [payments, setPayments] = useState([]);


    const [car, setCar] = useState({
        name: "",
        model: "",
        plate_number: "",
        year: "",
        status: "Available",
    });

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
        role: "User"
    });

    useEffect(() => {
        fetchCars();
        fetchUsers();
        fetchBookings();
        fetchPayments();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage");
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/booking");
            setBookings(response.data);
            console.log(bookings);
            
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };
// `http://localhost:8080/MegaCity_war_exploded/booking?id=${id}`
    const fetchPayments = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/payment", {
                params: {
                    action: "getAll"  // Add the action parameter
                }
            });
    
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const handleCarChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value, // Update the relevant field in the user object
        }));
    };
    
    

    const addCar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", car.name);
        formData.append("model", car.model);
        formData.append("plate_number", car.plate_number);
        formData.append("year", car.year);
        formData.append("status", car.status);

        try {
            await axios.post("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Car added successfully!");
            setCar({ name: "", model: "", plate_number: "", year: "", status: "Available" });
            setShowModal(false);
            fetchCars();
        } catch (error) {
            console.error("There was an error adding the car:", error);
            alert("Failed to add car!");
        }
    };

   

    const updateCar = async (e) => {
        e.preventDefault();
        console.log(car.id);
    
        // Create query parameters string
        const queryParams = new URLSearchParams({
            carId: car.id,
            name: car.name,
            model: car.model,
            plate_number: car.plate_number,
            year: car.year,
            status: car.status
        }).toString();
    
        try {
            // Send the PUT request with the query parameters in the URL
            await axios.put(`http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage?${queryParams}`);
            
            alert("Car updated successfully!");
            setCar({ name: "", model: "", plate_number: "", year: "", status: "Available" });
            setShowModal(false);
            fetchCars();
        } catch (error) {
            console.error("Error updating car:", error);
            alert("Failed to update car!");
        }
    };
    const addUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/MegaCity_war_exploded/register", user, {
                headers: { "Content-Type": "application/json" }
            });
            alert("User added successfully!");
            setUser({ username: "", password: "", email: "", phone: "", role: "User" });
            setShowUserModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user!");
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        
        // Prepare the user data to send, but exclude the password field if it's not being updated
        const updatedUser = { ...user };
        if (!user.password) {
            // If password is not being updated, remove it from the data to send
            delete updatedUser.password;
        }
    
        try {
            await axios.put(`http://localhost:8080/MegaCity_war_exploded/users/${user.id}`, updatedUser, {
                headers: { "Content-Type": "application/json" }
            });
            alert("User updated successfully!");
            setUser({ username: "", password: "", email: "", phone: "", role: "User" });
            setShowUserModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user!");
        }
    };
    

    const handleDelete = async (id, type) => {
        let url;
    
        if (type === "car") {
            url = `http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage?carId=${id}`;
        } else if (type === "user") {
            url = `http://localhost:8080/MegaCity_war_exploded/users/${id}`;
        } else if (type === "booking") {
            url = `http://localhost:8080/MegaCity_war_exploded/booking?id=${id}`;
        }
    
        try {
            await axios.delete(url);
            alert(`${type} deleted successfully!`);
    
            if (type === "car") fetchCars();
            else if (type === "user") fetchUsers();
            else if (type === "booking") fetchBookings();
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            alert(`Failed to delete ${type}!`);
        }
    };
    
    

    const handleEdit = (data, type) => {
        if (type === "car") {
            setCar(data);
            setShowModal(true);
        } else {
            setUser(data);
            setShowUserModal(true);
        }
    };

    const handleFilterChange = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/users", {
                params: {
                    role: selectedRole || undefined,
                }
            });

            if (Array.isArray(response.data)) {
                setUsers(response.data); // Set users based on the filtered response
            } else {
                console.error("Invalid filtered data:", response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching filtered users:", error);
        }
    };


    const handleCarFilterChange = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/filteringUserCars", {
                params: {
                    status: selectedStatus || undefined,
                    model: selectedModel || undefined
                }
            });

            if (Array.isArray(response.data)) {
                setCars(response.data); // Set users based on the filtered response
            } else {
                console.error("Invalid filtered data:", response.data);
                setCars([]);
            }
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
        }
    };


    // const handleUpdateStatus = async (id, newStatus) => {
    //     try {
    //         const response = await axios.put(`http://localhost:8080/MegaCity_war_exploded/booking?id=${id}`, {
    //             action:"updateStatus",
    //             status: newStatus
                
    //         });
    
    //         if (response.data === "Booking Updated Successfully") {
    //             alert(`Booking ${newStatus} successfully!`);
    
    //             // Update the state immediately
    //             setBookings((prevBookings) => 
    //                 prevBookings.map((booking) => 
    //                     booking.id === id ? { ...booking, status: newStatus } : booking
    //                 )
    //             );
    //         } else {
    //             alert("Failed to update booking!");
    //         }
    //     } catch (error) {
    //         console.error(`Error updating booking to ${newStatus}:`, error);
    //         alert(`Error updating booking to ${newStatus}. Check console for details.`);
    //     }
    // };

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
        <div className="d-flex" id="wrapper">
            <div className="bg-dark text-white p-4" id="sidebar" style={{ width: '250px' }}>
                <h4 className="text-center mb-4">Admin Dashboard</h4>
                <ul className="nav flex-column">
                    {/* <li className="nav-item">
                        <Link to="/admin" className="nav-link text-white">
                            <FaCogs className="me-2" /> Dashboard
                        </Link>
                    </li> */}
                    <li className="nav-item">
                    <Link 
                           // to="/admin/addCar" 
                            className={`nav-link text-white ${activeTab === "car" ? "active" : ""}`}
                            onClick={() => setActiveTab("car")}
                        >
                            <FaCar className="me-2" />
                            Manage Cars
                        </Link>
                    </li>

                    <li className="nav-item">
                           <Link 
                           // to="/admin/addDriver" 
                            className={`nav-link text-white ${activeTab === "user" ? "active" : ""}`}
                            onClick={() => setActiveTab("user")}
                        >
                            <FaUser className="me-2" />
                            Manage Users
                        </Link>
                    </li>

                    <li className="nav-item">
                           <Link 
                           // to="/admin/addDriver" 
                            className={`nav-link text-white ${activeTab === "booking" ? "active" : ""}`}
                            onClick={() => setActiveTab("booking")}
                        >
                            <FaCalendarCheck className="me-2" />
                            Manage Bookings
                        </Link>
                    </li>

                    <li className="nav-item">
                           <Link 
                           // to="/admin/addDriver" 
                            className={`nav-link text-white ${activeTab === "payment" ? "active" : ""}`}
                            onClick={() => setActiveTab("payment")}
                        >
                            <FaMoneyBillWave className="me-2" />
                            View Payments
                        </Link>
                    </li>
                    
                </ul>
            </div>

{activeTab === "car" && (
                <div id="page-content-wrapper" className="container-fluid p-4">
                    <h2 className="text-center mb-4">Manage Cars</h2>
                    <div className="row mb-3">
                   <div className="col-md-2">
                    {/* <Button variant="primary" onClick={() => setShowUserModal(true)}>+ Add User</Button> */}
                    <Button variant="primary"  onClick={() => setShowModal(true)}>
                     + Add Car
                    </Button>
                    </div>
                    <div className="col-md-3">
                <select 
                        className="form-select" 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filter by Model..." 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={handleCarFilterChange}>
                        Apply Filters
                    </button>
                </div>
                <div className="col-md-2">
                    <button 
                        className="btn btn-secondary w-100" 
                        onClick={() => {
                            setSelectedStatus("");
                            setSelectedModel("");
                            handleCarFilterChange();
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
                </div>
                <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Model</th>
                                    <th>Plate Number</th>
                                    <th>Year</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.length > 0 ? cars.map((cardet, index) => (
                                    <tr key={index}>
                                        <td>{cardet.name}</td>
                                        <td>{cardet.model}</td>
                                        <td>{cardet.plate_number}</td>
                                        <td>{cardet.year}</td>
                                        <td>{cardet.status}</td>
                                        {/* <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(cardet)}>Edit</button>
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(cardet.id)}>Delete</button>
                                        </td> */}
                                          <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(cardet, "car")}>Edit</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(cardet.id, "car")}>Delete</button>
                                    </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No cars added yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
            )}



{activeTab === "user" && (
                <div id="page-content-wrapper" className="container-fluid p-4">
                    <h2 className="text-center mb-4">Manage Users</h2>
                    <div className="row mb-3">
                   <div className="col-md-4">
                    <Button variant="primary" onClick={() => setShowUserModal(true)}>+ Add User</Button>
                    </div>
                    <div className="col-md-4">
                    <select 
                        className="form-select" 
                        value={selectedRole} 
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="customer">customer</option>
                        <option value="driver">driver</option>
                        {/* <option value="Unavailable">Unavailable</option> */}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={handleFilterChange}>
                        Apply Filters
                    </button>
                </div>
                <div className="col-md-2">
                    <button 
                        className="btn btn-secondary w-100" 
                        onClick={() => {
                            setSelectedRole("");
                            handleFilterChange();
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
                </div>
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user, "user")}>Edit</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(user.id, "user")}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center">No users added yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

{activeTab === "booking" && (
                <div id="page-content-wrapper" className="container-fluid p-4">
                    <h2 className="text-center mb-4">Manage Bookings</h2>
                    {/* <div className="row mb-3">
                 
                    <div className="col-md-4">
                    <select 
                        className="form-select" 
                        value={selectedRole} 
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="customer">customer</option>
                        <option value="driver">driver</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={handleFilterChange}>
                        Apply Filters
                    </button>
                </div>
                <div className="col-md-2">
                    <button 
                        className="btn btn-secondary w-100" 
                        onClick={() => {
                            setSelectedRole("");
                            handleFilterChange();
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
                </div> */}
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>User ID</th>
                                <th>Car ID</th>
                                <th>Driver ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th style={{ width: "220px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.userId}</td>
                                    <td>{booking.carId}</td>
                                    <td>{booking.driverId}</td>
                                    <td>{booking.startDate}</td>
                                    <td>{booking.endDate}</td>
                                    <td>{booking.totalAmount}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                    {booking.status === "pending" && (
                            <>
                                <button 
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                                >
                                    Confirm
                                </button>
                                <button 
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(booking.id, "booking")}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center">No bookings added yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}


{activeTab === "payment" && (
    <div id="page-content-wrapper" className="container-fluid p-4">
        <h2 className="text-center mb-4">View Payments</h2>
        {/* <div className="row mb-3">
            <div className="col-md-6">
               
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name="paymentFilter" 
                            value="pending" 
                            checked={paymentFilter === "pending"} 
                            onChange={() => setPaymentFilter("pending")} 
                        />
                        Pending Payments
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name="paymentFilter" 
                            value="paid" 
                            checked={paymentFilter === "paid"} 
                            onChange={() => setPaymentFilter("paid")} 
                        />
                        Paid Payments
                    </label>
                </div>
            </div>
        </div> */}

<div className="row mb-3">
    <div className="col-md-6 d-flex justify-content-start align-items-center">
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="radio"
                name="paymentFilter"
                value="pending"
                checked={paymentFilter === "pending"}
                onChange={() => setPaymentFilter("pending")}
                id="pendingRadio"
            />
            <label className="form-check-label" htmlFor="pendingRadio">
                Pending Payments
            </label>
        </div>

        <div className="form-check form-check-inline ms-4">
            <input
                className="form-check-input"
                type="radio"
                name="paymentFilter"
                value="paid"
                checked={paymentFilter === "paid"}
                onChange={() => setPaymentFilter("paid")}
                id="paidRadio"
            />
            <label className="form-check-label" htmlFor="paidRadio">
                Paid Payments
            </label>
        </div>
    </div>
</div>

        

        {paymentFilter === "pending" && (
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>User ID</th>
                        <th>Car ID</th>
                        <th>Driver ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {bookings.length > 0 ? bookings
                .filter(booking => booking.status === "pending")  // Filter bookings with status "pending"
                .map((booking) => (
                <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.userId}</td>
                        <td>{booking.carId}</td>
                        <td>{booking.driverId}</td>
                        <td>{booking.startDate}</td>
                        <td>{booking.endDate}</td>
                        <td>{booking.totalAmount}</td>
                        <td>{booking.status}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="text-center">No pending payments found.</td></tr>
                    )}
                </tbody>
            </table>
        )}

        {paymentFilter === "paid" && (
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Booking ID</th>
                        <th>User ID</th>
                        <th>Payment Amount</th>
                        <th>Currency</th>
                        <th>Payment Method</th>
                        <th>Payment Date</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                {payments.length > 0 ? payments.map((payment) => (
                <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.bookingId}</td>
                            <td>{payment.userId}</td>
                            <td>{payment.paymentAmount}</td>
                            <td>{payment.currency}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{payment.paymentDate}</td>
                            <td>{payment.paymentStatus}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="text-center">No paid payments found.</td></tr>
                    )}
                </tbody>
            </table>
        )}
    </div>
)}



           <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{car.id ? "Update Car" : "Add New Car"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={car.id ? updateCar : addCar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Car Name</Form.Label>
                            <Form.Control type="text" name="name" value={car.name} onChange={handleCarChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" value={car.model} onChange={handleCarChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plate_number" value={car.plate_number} onChange={handleCarChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" name="year" value={car.year} onChange={handleCarChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={car.status} onChange={handleCarChange} required>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">{car.id ? "Update Car" : "Add Car"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.id ? "Update User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={user.id ? updateUser : addUser}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={user.username} onChange={handleUserChange} required />
                        </Form.Group>
                        {!user.id && (
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleUserChange}
                                    required
                                />
                            </Form.Group>
            )}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={user.email} onChange={handleUserChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={user.phone} onChange={handleUserChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={user.role}
                                onChange={handleUserChange}
                                required
                            >
                                <option value="customer">customer</option>
                                <option value="driver">driver</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">{user.id ? "Update User" : "Add User"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
           
        </div>
    );
};

export default AdminDashboard;



