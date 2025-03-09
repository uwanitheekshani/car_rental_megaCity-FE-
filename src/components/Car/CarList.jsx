// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const CarList = () => {
//     const [cars, setCars] = useState([]);

//     useEffect(() => {
//         // Fetch all cars from the backend
//         axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
//             .then(response => setCars(response.data))
//             .catch(error => console.error("There was an error fetching the cars:", error));
//     }, []);

//     return (
//         <div className="container">
//             <h2>Available Cars</h2>
//             <div className="row">
//                 {cars.map(car => (
//                     <div key={car.id} className="col-md-4">
//                         <div className="card">
//                             <img src="" className="card-img-top" alt={car.name} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{car.name}</h5>
//                                 <p className="card-text">{car.model} - {car.year}</p>
//                                 <Link to={`/car/${car.id}`} className="btn btn-primary">View Details</Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CarList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import '../../Styles/CarList.css'; // For custom styling

// import image5 from '../../assets/images/car-1.jpg';
// import image6 from '../../assets/images/car-2.jpg';
// import image7 from '../../assets/images/car-3.jpg';
// import image8 from '../../assets/images/car-4.jpg';
// import image1 from '../../assets/images/car-5.jpg';
// import image2 from '../../assets/images/car-6.jpg';
// import image3 from '../../assets/images/car-7.jpg';
// import image4 from '../../assets/images/car-8.jpg';

// const CarList = () => {
//     const [cars, setCars] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch all cars from the backend
//         axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage")
//             .then(response => {
//                 setCars(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("There was an error fetching the cars:", error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return (
//             <div className="loading-container">
//                 <div className="loader">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container py-5">
//             <h2 className="text-center mb-4">Available Cars</h2>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {cars.map(car => {
//                     // Assign images dynamically from the /src/images folder
//                     // const imagePath = require(`./images/${car.id}.jpg`); // Assuming the car name matches the image filename
//                     // const imagePath = require(`../../assets/images/${car.id}.jpg`); 
//                     return (
//                         <div key={car.id} className="col">
//                             <div className="card shadow-lg rounded">
//                                 <img 
//                                     // src={imagePath} 
//                                     className="card-img-top car-image" 
//                                     alt={car.name} 
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{car.name}</h5>
//                                     <p className="card-text">{car.model} - {car.year}</p>
//                                     <Link to={`/car/${car.id}`} className="btn btn-primary btn-block">View Details</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default CarList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={() => navigate("/payments")}>
                    💳 View & Pay Bookings
                </button>
            </div>
            <h2 className="text-center mb-4">🚗 Available Cars for Rent</h2>

            <div className="row">
                {cars.map(car => (
                    <div key={car.id} className="col-md-4 mb-4">
                        <div className="card shadow-lg border-0">
                            {/* Display car image */}
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

                                <Link to={`/bookings/${car.id}`} state={{ carImageUrl: car.imageUrl, carName: car.name, carPrice: 5000 }}
                                    className={`btn w-100 fw-bold ${car.status !== "Available" ? "btn-secondary disabled" : "btn-primary"}`}
                                    aria-disabled={car.status !== "Available"}
                                    tabIndex={car.status !== "Available" ? -1 : 0} // Prevent focus on disabled links
                                >
                                    {car.status === "Available" ? "Book Now" : "Unavailable"}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarList;

