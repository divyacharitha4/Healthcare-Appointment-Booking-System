import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";


function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/user/get-appointments-by-user-id", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        getAppointmentsData();
    }, []);
    return (
        <Layout>
            <h1 className="page-header">Appointments</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Appointment Id</th>
                            <th>Doctor</th>
                            <th>Phone Number</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>
                                    {appointment._id}
                                </td>
                                <td>
                                    <p key={index}>
                                        {appointment.doctorInfo.firstName} {appointment.doctorInfo.lastName}
                                    </p>
                                </td>
                                <td>{appointment.doctorInfo.phoneNumber}</td>
                                <td>{appointment.date} at {appointment.time}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Appointments