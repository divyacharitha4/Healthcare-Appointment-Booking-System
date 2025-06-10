import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Doctor({ doctor }) {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '20rem' }} className="align-items-center mt-3 dc-b">
            <Card.Body 
            // onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            >
                <Card.Title>{doctor.firstName} {doctor.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
                <Card.Text>
                    <b>Experience:</b> {doctor.experience}<br/>
                    <b>Phone Number:</b> {doctor.phoneNumber}<br/>
                    <b>Address:</b> {doctor.address}<br/>
                    <b>Fee Per Visit:</b> {doctor.feePerCunsultation}<br/>
                    <b>Timings:</b> {`${doctor.timings[0]} - ${doctor.timings[1]}`}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/book-appointment/${doctor._id}`)}>Book Appointment</Button>
            </Card.Body>
        </Card>
    )
}

export default Doctor;
