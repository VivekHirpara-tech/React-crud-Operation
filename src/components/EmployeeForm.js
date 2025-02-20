import React from "react";
import { Form, Button, Image, Row, Col, Card } from "react-bootstrap";

const EmployeeForm = ({ employee, handleInputChange, handleImageChange, handleSubmit, handleCancel, isEditing }) => {
    return (
        <div className="container mt-4">
            <Card className="shadow-sm border-0 p-4 bg-light">
                <Card.Body>
                    <h3 className="text-center text-primary mb-4">
                        {isEditing ? "Edit Employee" : "Add Employee"}
                    </h3>

                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="name" 
                                        value={employee.name} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter full name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={employee.email} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter email" 
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="phone" 
                                        value={employee.phone} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter phone number" 
                                        maxLength={10} 
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Joining Date</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        name="joiningDate" 
                                        value={employee.joiningDate} 
                                        onChange={handleInputChange} 
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <div className="d-flex">
                                        <Form.Check 
                                            inline 
                                            type="radio" 
                                            label="Male" 
                                            name="gender" 
                                            value="Male" 
                                            checked={employee.gender === "Male"} 
                                            onChange={handleInputChange}
                                        />
                                        <Form.Check 
                                            inline 
                                            type="radio" 
                                            label="Female" 
                                            name="gender" 
                                            value="Female" 
                                            checked={employee.gender === "Female"} 
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        name="qualification" 
                                        value={employee.qualification} 
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Post-Graduate">Post-Graduate</option>
                                        <option value="PhD">PhD</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="address" 
                                value={employee.address} 
                                onChange={handleInputChange} 
                                placeholder="Enter address"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Employee Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            {employee.image && <Image src={employee.image} width="100" height="100" rounded className="mt-2" />}
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" onClick={handleSubmit} className="me-2 px-4">
                                {isEditing ? "Update" : "Add"}
                            </Button>
                            <Button variant="secondary" onClick={handleCancel} className="px-4">Cancel</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EmployeeForm;
