import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function DoctorHome() {
    const [appointmentData, setAppointmentData] = useState({});
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentResponse = await axios.get('/api/doctor/appointment-statistics', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                if (appointmentResponse.data.success) {
                    setAppointmentData(appointmentResponse.data.data);
                    setAppointments(appointmentResponse.data.data.appointments);
                }
            } catch (error) {
                console.error('Error fetching doctor dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <h1 className='mt-2'>Doctor Dashboard</h1>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Card className='mt-2 dc-b'>
                        <Card.Body>
                            <Card.Title>Appointment Statistics:</Card.Title>
                            <Card.Text className='mt-2'>Total Appointments: {appointmentData.totalAppointments}</Card.Text>
                            <Card.Text>Pending Appointments: {appointmentData.pendingAppointments}</Card.Text>
                            <Card.Text>Accepted Appointments: {appointmentData.acceptedAppointments}</Card.Text>
                            <Card.Text>Rejected Appointments: {appointmentData.rejectedAppointments}</Card.Text>
                            <Card.Text>Appointment Rate: {appointmentData.acceptanceRate}%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DoctorHome;
