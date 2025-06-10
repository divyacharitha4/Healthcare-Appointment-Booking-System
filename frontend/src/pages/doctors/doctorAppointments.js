import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/doctor/get-appointments-by-doctor-id", {
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

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/doctor/change-appointment-status",
                { appointmentId:record._id,status:status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            toast.error("Error changing the status");
            dispatch(hideLoading());
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
                            <th>Patient</th>
                            <th>Mail</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                        {appointment.userInfo.name}
                                    </p>
                                </td>
                                <td>{appointment.userInfo.email}</td>
                                <td>{appointment.date} at {appointment.time}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <div className="d-flex">
                                        {appointment.status === "pending" && (
                                            <h1 className="btn btn-success m-2" onClick={() => changeAppointmentStatus(appointment, "approved")}>
                                                Approve
                                            </h1>
                                        )}
                                        {appointment.status === "pending" && (
                                            <h1 className="btn btn-danger m-2" onClick={() => changeAppointmentStatus(appointment, "rejected")}>
                                                Reject
                                            </h1>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default DoctorAppointments