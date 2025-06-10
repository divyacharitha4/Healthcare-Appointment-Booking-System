import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AdminHome() {
    const [userData, setUserData] = useState({});
    const [doctorData, setDoctorData] = useState({});
    const [appointmentData, setAppointmentData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('/api/admin/user-statistics', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                const doctorResponse = await axios.get('/api/admin/doctor-statistics', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                const appointmentResponse = await axios.get('/api/user/appointment-statistics', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                if (userResponse.data.success && doctorResponse.data.success && appointmentResponse.data.success) {
                    setUserData(userResponse.data.data);
                    setDoctorData(doctorResponse.data.data);
                    setAppointmentData(appointmentResponse.data.data);
                }
            } catch (error) {
                console.error('Error fetching admin dashboard data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <Container>
            <h1 className='mt-4'>Admin Dashboard</h1>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Card className='mt-4 dc-b'>
                        <Card.Body>
                            <Card.Title>User Statistics:</Card.Title>
                            <Card.Text className='mt-1'>Total Users: {userData.totalUsers}</Card.Text>
                            <Card.Title>Acceptance Rate:</Card.Title>
                            <Card.Text className='mt-1'>Doctor Acceptance Rate: {doctorData.acceptanceRate}%</Card.Text>
                            <Card.Text>Appointment Acceptance Rate: {appointmentData.acceptanceRate}%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Doctor Statistics */}
                <Col sm={12} md={6} lg={4}>
                    <Card className='mt-4 dc-b'>
                        <Card.Body>
                            <Card.Title>Doctor Statistics:</Card.Title>
                            <Card.Text className='mt-1'>Total Doctors: {doctorData.totalDoctors}</Card.Text>
                            <Card.Text>Accepted Doctors: {doctorData.acceptedDoctors}</Card.Text>
                            <Card.Text>Pending Doctors: {doctorData.pendingDoctors}</Card.Text>
                            <Card.Text>Rejected Doctors: {doctorData.rejectedDoctors}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Appointment Statistics */}
                <Col sm={12} md={6} lg={4}>
                    <Card className='mt-4 dc-b'>
                        <Card.Body>
                            <Card.Title>Appointment Statistics:</Card.Title>
                            <Card.Text className='mt-1'>Total Appointments: {appointmentData.totalAppointments}</Card.Text>
                            <Card.Text>Accepted Appointmets: {appointmentData.acceptedAppointments}</Card.Text>
                            <Card.Text>Pending Appointments: {appointmentData.pendingAppointments}</Card.Text>
                            <Card.Text>Rejected Appointments: {appointmentData.rejectedAppointments}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminHome;
