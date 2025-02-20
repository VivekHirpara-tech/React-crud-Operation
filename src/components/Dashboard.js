import { useState, useEffect } from "react";
import { Button, Table, Image, Card, Modal } from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [employee, setEmployee] = useState({
        name: "", address: "", email: "", phone: "", joiningDate: "", gender: "", qualification: "", image: ""
    });

    // Modal State for Viewing Employee Details
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Modal State for Viewing Image
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(savedEmployees);
    }, []);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!employee.name || employee.phone.length !== 10) {
            alert("Please fill all fields correctly.");
            return;
        }

        if (editIndex !== null) {
            const updatedEmployees = [...employees];
            updatedEmployees[editIndex] = employee;
            setEmployees(updatedEmployees);
        } else {
            setEmployees([...employees, employee]);
        }
        handleCancel();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEmployee(employees[index]);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setEmployees(employees.filter((_, i) => i !== index));
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditIndex(null);
        setEmployee({ name: "", address: "", email: "", phone: "", joiningDate: "", gender: "", qualification: "", image: "" });
    };

    // Open Modal and Set Employee Data
    const handleView = (index) => {
        setSelectedEmployee(employees[index]);
        setShowModal(true);
    };

    // Open Image Modal
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setImageModal(true);
    };

    return (
        <div className="container px-0 mt-5">
            <Card className="shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Employee Management</h2>

                {!showForm ? (
                    <>
                        <div className="text-center mb-3">
                            <Button onClick={() => setShowForm(true)} variant="success" size="lg">
                                + Add Employee
                            </Button>
                        </div>

                        <Table striped bordered hover responsive className="table-light">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Joining Date</th>
                                    <th>Gender</th>
                                    <th>Qualification</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {employees.map((emp, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {emp.image ? (
                                                <Image
                                                    src={emp.image}
                                                    width="50"
                                                    height="50"
                                                    rounded
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleImageClick(emp.image)}
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td>{emp.name}</td>
                                        <td>{emp.address}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.joiningDate}</td>
                                        <td>{emp.gender}</td>
                                        <td>{emp.qualification}</td>
                                        <td>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleView(index)}>
                                                👁️ View
                                            </Button>
                                            <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(index)}>
                                                ✏️ Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                                                ❌ Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <EmployeeForm
                        employee={employee}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                        isEditing={editIndex !== null}
                    />
                )}
            </Card>

            {/* Employee Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEmployee && (
                        <Card className="shadow-sm p-3 border-0">
                            <div className="text-center mb-3">
                                <Image
                                    src={selectedEmployee.image || "https://via.placeholder.com/150"}
                                    width="120"
                                    height="120"
                                    roundedCircle
                                    className="border border-secondary"
                                />
                                <h4 className="mt-3 text-primary">{selectedEmployee.name}</h4>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>📍 Address:</strong> {selectedEmployee.address}</p>
                                    <p><strong>📧 Email:</strong> {selectedEmployee.email}</p>
                                    <p><strong>📞 Phone:</strong> {selectedEmployee.phone}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>📅 Joining Date:</strong> {selectedEmployee.joiningDate}</p>
                                    <p><strong>⚧ Gender:</strong> {selectedEmployee.gender}</p>
                                    <p><strong>🎓 Qualification:</strong> {selectedEmployee.qualification}</p>
                                </div>
                            </div>
                        </Card>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Image Modal */}
            <Modal show={imageModal} onHide={() => setImageModal(false)} centered>
                <Modal.Body className="text-center">
                    {selectedImage && <Image src={selectedImage} fluid />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setImageModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
