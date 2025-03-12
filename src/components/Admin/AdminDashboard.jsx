// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// // import CarsAdmin from "./CarsAdmin";
// // import CarsAdmin from "./CarsAdmin";

// const AdminDashboard = () => {
//     const [activeSection, setActiveSection] = useState("cars");

//     return (
//         <Router>
//             <div className="d-flex">
//                 {/* Sidebar */}
//                 <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
//                     <h2 className="text-center">Admin Panel</h2>
//                     <ul className="nav flex-column">
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link text-white ${activeSection === "cars" ? "active" : ""}`}
//                                 to="/admin-dashboard/cars"
//                                 onClick={() => setActiveSection("cars")}
//                             >
//                                 🚗 Cars
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link text-white ${activeSection === "users" ? "active" : ""}`}
//                                 to="/users"
//                                 onClick={() => setActiveSection("users")}
//                             >
//                                 👥 Users
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link text-white ${activeSection === "payments" ? "active" : ""}`}
//                                 to="/payments"
//                                 onClick={() => setActiveSection("payments")}
//                             >
//                                 💳 Payments
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link 
//                                 className={`nav-link text-white ${activeSection === "orders" ? "active" : ""}`}
//                                 to="/orders"
//                                 onClick={() => setActiveSection("orders")}
//                             >
//                                 📦 Orders
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Main Content */}
//                 {/* <div className="flex-grow-1 p-4" style={{ width: "100%" }}>
//                     <Routes>
//                         <Route path="/admincars" element={<CarsAdmin/>} />
//                         <Route path="/users" element={<h2>Users Management Coming Soon...</h2>} />
//                         <Route path="/payments" element={<h2>Payments Management Coming Soon...</h2>} />
//                         <Route path="/orders" element={<h2>Orders Management Coming Soon...</h2>} />
//                     </Routes>
//                 </div> */}
//             </div>
//         </Router>
//     );
// };

// export default AdminDashboard;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <ul>
//           <li><Link to="/admin-dashboard/cars">Cars</Link></li>
//           <li><Link to="/admin/users">Users</Link></li>
//           <li><Link to="/admin/payments">Payments</Link></li>
//           <li><Link to="/admin/orders">Orders</Link></li>
//         </ul>
//       </div>
//       <div className="content">
//         <h2>Admin Dashboard</h2>
//         <div>
//           <h3>Car Management</h3>
//           <Link to="/admin/cars">Manage Cars</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



// import React, { useState } from 'react';
// import { Link, Route, Routes } from 'react-router-dom';
// import CarsAdmin from './CarsAdmin';

// // import 

// // import CarSection from './CarSection'; // Assuming you have the CarSection component

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
//         <ul>
//           <li><Link to="/admin-dashboard/cars">Cars</Link></li>
//           <li><Link to="/admin/users">Users</Link></li>
//           <li><Link to="/admin/payments">Payments</Link></li>
//           <li><Link to="/admin/orders">Orders</Link></li>
//         </ul>
//       </div>
//       <div className="content">
//         <button className="sidebar-toggle" onClick={toggleSidebar}>
//           {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
//         </button>
//         <h2>Admin Dashboard</h2>
//         <Routes>
//           <Route path="/cars" element={<CarsAdmin/>} />
//           {/* Other routes for users, payments, orders */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, {useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FaCar, FaUser, FaCogs } from 'react-icons/fa';
// import { Button, Modal, Form } from "react-bootstrap";

// const AdminDashboard = () => {
//     const [cars, setCars] = useState([]);


//     const [car, setCar] = useState({
//         name: "",
//         model: "",
//         plate_number: "",
//         year: "",
//         status: "Available",
//     });

//     const [driver, setDriver] = useState({
//         name: "",
//         licenseNumber: "",
//         status: "",
//     });

//     const [activeTab, setActiveTab] = useState("car");

//     const handleCarChange = (e) => {
//         const { name, value } = e.target;
//         setCar({ ...car, [name]: value });
//     };

//     const handleDriverChange = (e) => {
//         const { name, value } = e.target;
//         setDriver({ ...driver, [name]: value });
//     };

//     useEffect(() => {
//         // Fetch all cars when the component is mounted
//         fetchCars();
//       }, []);
    
//       const fetchCars = async () => {
//         try {
//           const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage");
//           setCars(response.data);
//         } catch (error) {
//           console.error("Error fetching cars:", error);
//         }
//       };

//     const addCar = async (e) => {

//         e.preventDefault();
        

//         const formData = new FormData();
//         formData.append("name", car.name);
//         formData.append("model", car.model);
//         formData.append("plate_number", car.plate_number);
//         formData.append("year", car.year);
//         formData.append("status", car.status);
    
//         // If there's an image file
//         // if (selectedImage) {
//         //     formData.append("image", selectedImage);
//         // }
    
//         try {
//             const response = await axios.post("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
    
//             alert("Car added successfully!");
//             setCar({
//                 name: "",
//                 model: "",
//                 plate_number: "",
//                 year: "",
//                 status: "",
//             });
//             // setSelectedImage(null);  // Clear the selected image
//         } catch (error) {
//             console.error("There was an error adding the car:", error);
//             alert("Failed to add car!");
//         }

//     };

    

//     const addDriver = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 "http://localhost:8080/admin/addDriver",
//                 driver
//             );
//             alert("Driver added successfully!");
//             setDriver({
//                 name: "",
//                 licenseNumber: "",
//                 status: "",
//             });
//         } catch (error) {
//             console.error("There was an error adding the driver:", error);
//         }
//     };

//     return (
//         <div className="d-flex" id="wrapper">
//             {/* Left Sidebar */}
//             <div className="bg-dark text-white p-4" id="sidebar" style={{ width: '250px' }}>
//                 <h4 className="text-center mb-4">Admin Dashboard</h4>
//                 <ul className="nav flex-column">
//                     <li className="nav-item">
//                         <Link to="/admin" className="nav-link text-white">
//                             <FaCogs className="me-2" />
//                             Dashboard
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link 
//                            // to="/admin/addCar" 
//                             className={`nav-link text-white ${activeTab === "car" ? "active" : ""}`}
//                             onClick={() => setActiveTab("car")}
//                         >
//                             <FaCar className="me-2" />
//                             Add Car
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link 
//                            // to="/admin/addDriver" 
//                             className={`nav-link text-white ${activeTab === "driver" ? "active" : ""}`}
//                             onClick={() => setActiveTab("driver")}
//                         >
//                             <FaUser className="me-2" />
//                             Add Driver
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/admin/viewCars" className="nav-link text-white">
//                             View Cars
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/admin/viewDrivers" className="nav-link text-white">
//                             View Drivers
//                         </Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Page Content */}
//             <div id="page-content-wrapper" className="container-fluid p-4">
//                 <h2 className="text-center mb-4">Admin Dashboard</h2>


// {activeTab === "car" && (
//   <div className="container mt-4">
//  <Button variant="primary" onClick={() => handleShowModal()}>+ Add Car</Button>
//     <div className="card shadow-sm mb-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
//       <div className="card-header bg-primary text-white">
//         <h5>Add New Car</h5>
//       </div>
//       <div className="card-body">
//         <form onSubmit={addCar}>
//           <div className="mb-3">
//             <label className="form-label">Car Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={car.name}
//               onChange={handleCarChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Model</label>
//             <input
//               type="text"
//               className="form-control"
//               name="model"
//               value={car.model}
//               onChange={handleCarChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Plate Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="plate_number"
//               value={car.plate_number}
//               onChange={handleCarChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Year</label>
//             <input
//               type="number"
//               className="form-control"
//               name="year"
//               value={car.year}
//               onChange={handleCarChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Status</label>
//             <select
//               className="form-select"
//               name="status"
//               value={car.status}
//               onChange={handleCarChange}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="Available">Available</option>
//               <option value="Unavailable">Unavailable</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-success w-100">
//             Add Car
//           </button>
//         </form>
//       </div>
//     </div>
//     {/* </div> */}
//     {/* Table to Display Cars */}
//     {/* <div className="col-6"> */}
//     <div className="card shadow-sm mt-4">
//       <div className="card-header bg-info text-white">
//         <h5>Cars List</h5>
//       </div>
//       <div className="card-body">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               {/* <th>ID</th> */}
//               <th>Name</th>
//               <th>Model</th>
//               <th>Plate Number</th>
//               <th>Year</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.length > 0 ? (
//               cars.map((cardet, index) => (
//                 <tr key={index}>
//                   {/* <td>{index + 1}</td> */}
//                   <td>{cardet.name}</td>
//                   <td>{cardet.model}</td>
//                   <td>{cardet.plate_number}</td>
//                   <td>{cardet.year}</td>
//                   <td>{cardet.status}</td>
//                   <td>
//                     <button className="btn btn-warning btn-sm" onClick={() => handleEdit(cardet)}>Edit</button>
//                     <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(cardet.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">No cars added yet.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     {/* </div> */}
//     {/* </div> */}
//   </div>
// )}


//                 {activeTab === "driver" && (
//                     <div className="card shadow-sm mb-4">
//                         <div className="card-header bg-primary text-white">
//                             <h5>Add New Driver</h5>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={addDriver}>
//                                 <div className="mb-3">
//                                     <label className="form-label">Driver Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="name"
//                                         value={driver.name}
//                                         onChange={handleDriverChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">License Number</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="licenseNumber"
//                                         value={driver.licenseNumber}
//                                         onChange={handleDriverChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Status</label>
//                                     <select
//                                         className="form-select"
//                                         name="status"
//                                         value={driver.status}
//                                         onChange={handleDriverChange}
//                                         required
//                                     >
//                                         <option value="">Select Status</option>
//                                         <option value="Active">Active</option>
//                                         <option value="Inactive">Inactive</option>
//                                     </select>
//                                 </div>
//                                 <button type="submit" className="btn btn-success w-100">
//                                     Add Driver
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCar, FaUser, FaCogs } from 'react-icons/fa';
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
        const url = type === "car" ? `http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage?carId=${id}` : `http://localhost:8080/MegaCity_war_exploded/users/${id}`;
        try {
            await axios.delete(url);
            alert(`${type} deleted successfully!`);
            if (type === "car") fetchCars();
            else fetchUsers();
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

                    
                </ul>
            </div>
            {/* {activeTab === "car" && (
            <div id="page-content-wrapper" className="container-fluid p-4">
                <h2 className="text-center mb-4">Admin Dashboard</h2>
                <div className="card shadow-sm mt-4">
                    <div className="card-header bg-info text-white">
                        <h5>Cars List</h5>
                    </div>
                    <div className="row mb-5">
                    <div className="col-md-2 mt-3 ml-3">
                    <Button variant="primary" style={{ width: "150px"}} onClick={() => setShowModal(true)}>
                     + Add Car
                    </Button>
                </div>
                <div className="col-md-3 mt-3">
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
                <div className="col-md-3 mt-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filter by Model..." 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    />
                </div>
                <div className="col-md-2 mt-3">
                    <button className="btn btn-primary w-100" onClick={handleCarFilterChange}>
                        Apply Filters
                    </button>
                </div>
                <div className="col-md-2 mt-3">
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
                    <div className="card-body">
                        
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
                </div>
            </div>
            )} */}



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



