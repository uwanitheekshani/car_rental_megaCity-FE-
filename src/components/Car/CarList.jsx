
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
// Import .jpeg images from the assets folder

import image5 from '../../assets/images/car-1.jpg';
import image6 from '../../assets/images/car-2.jpg';
import image7 from '../../assets/images/car-3.jpg';
import image8 from '../../assets/images/car-4.jpg';
import image1 from '../../assets/images/car-5.jpg';
import image2 from '../../assets/images/car-6.jpg';
import image3 from '../../assets/images/car-7.jpg';
import image4 from '../../assets/images/car-8.jpg';


const CarList = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    // const [filteredCars, setFilteredCars] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(""); // Status filter
    const [selectedModel, setSelectedModel] = useState(""); // Model filter

    const token = localStorage.getItem("token");
   // const token = localStorage.getItem("token");
    let userRole = null;
    let userId = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role; // Extract role
            userId = decodedToken.userId; // Extract user ID (if exists)
            console.log("User Role:", userRole, "User ID:", userId);
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }
    

    useEffect(() => {
        // Fetch all cars from the backend
        axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
            .then(response => {
                const carsWithValidImages = response.data.map((car, index) => ({
                    ...car,
                    imageUrl: car.imageUrl || imagePool[index % imagePool.length]  // Fallback to imported images
                }));
                setCars(carsWithValidImages);
            })
            .catch(error => console.error("There was an error fetching the cars:", error));
    }, []);

    // Fallback images imported from assets
    const imagePool = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];


     // Fetch filtered cars when button is clicked
     const handleFilterChange = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/filteringUserCars", {
                params: {
                    status: selectedStatus || undefined,
                    model: selectedModel || undefined
                }
            });

            if (Array.isArray(response.data)) {
                const carsWithValidImages = response.data.map((car, index) => ({
                    ...car,
                    imageUrl: car.imageUrl || imagePool[index % imagePool.length]
                }));
                setCars(carsWithValidImages);
            } else {
                console.error("Invalid filtered data:", response.data);
                setCars([]);
            }
        } catch (error) {
            console.error("Error fetching filtered cars:", error);
        }
    };

    return (
        <div className="container mt-5">
            
            {/* <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={() => navigate("/payments")}>
                    💳 View & Pay Bookings
                </button>
            </div> */}
            {token && userId && userRole === "customer" && (
             <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-outline-primary" onClick={() => navigate("/my-bookings")}>
                📅 View My Bookings
            </button>
            <button className="btn btn-success" onClick={() => navigate("/payments")}>
                💳 View & Pay Bookings
            </button>
        </div>
        )}
            <h2 className="text-center mb-4">🚗 Available Cars for Rent</h2>


               {/* Filter Controls */}
               <div className="row mb-3">
                <div className="col-md-4">
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

                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filter by Model..." 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    />
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
                            setSelectedStatus("");
                            setSelectedModel("");
                            handleFilterChange();
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>


            <div className="row">
                {cars.map(car => (
                    <div key={car.id} className="col-md-4 mb-4">
                        <div className="card shadow-lg border-0">
                            <img
                                src={car.imageUrl}
                                className="card-img-top"
                                alt={car.name}
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{car.name}</h5>
                                <p className="card-text text-muted">{car.model} - {car.year}</p>
                                <p className={`fw-semibold ${car.status === "Available" ? "text-success" : "text-danger"}`}>
                                    {car.status}
                                </p>

                                {token && userId && userRole === "customer" && (
                                <Link to={`/bookings/${car.id}`} state={{ carImageUrl: car.imageUrl, carName: car.name, carPrice: 5000 }}
                                    className={`btn w-100 fw-bold ${car.status !== "Available" ? "btn-secondary disabled" : "btn-primary"}`}
                                    aria-disabled={car.status !== "Available"}
                                    tabIndex={car.status !== "Available" ? -1 : 0} // Prevent focus on disabled links
                                >
                                    {car.status === "Available" ? "Book Now" : "Unavailable"}
                                </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarList;

