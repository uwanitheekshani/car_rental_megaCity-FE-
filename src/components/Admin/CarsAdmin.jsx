import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const CarsAdmin = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        plate_number: "",
        year: "",
        status: "Available"
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage");
            setCars(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    const handleShowModal = (car = null) => {
        setSelectedCar(car);
        setFormData(car ? car : { name: "", model: "", plate_number: "", year: "", status: "Available" });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCar(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCar) {
                await axios.put("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage", formData);
            } else {
                await axios.post("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage", formData);
            }
            fetchCars();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving car:", error);
        }
    };

    const handleDelete = async (carId) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axios.delete(`http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage?carId=${carId}`);
                fetchCars();
            } catch (error) {
                console.error("Error deleting car:", error);
            }
        }
    };

    if (loading) return <h3>Loading cars...</h3>;

    return (
        <div className="container mt-5">
            <h2>Manage Cars</h2>
            <Button variant="primary" onClick={() => handleShowModal()}>+ Add Car</Button>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Plate Number</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.name}</td>
                            <td>{car.model}</td>
                            <td>{car.plate_number}</td>
                            <td>{car.year}</td>
                            <td>{car.status}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShowModal(car)}>Edit</Button>
                                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(car.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Add/Edit Car */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCar ? "Edit Car" : "Add Car"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plate_number" value={formData.plate_number} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" name="year" value={formData.year} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                                <option>Available</option>
                                <option>Rented</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CarsAdmin;
