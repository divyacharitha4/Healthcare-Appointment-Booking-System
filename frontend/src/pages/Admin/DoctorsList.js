import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from 'moment';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Error fetching doctors:', error);
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing the status");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format('DD-MM-YYYY  HH:mm');
  };
  return (
    <Layout>
      <h1 className="page-header">Doctors List</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>
                  <p key={index}>
                    {doctor.firstName} {doctor.lastName}
                  </p>
                </td>
                <td>{doctor.phoneNumber}</td>
                <td>{formatDateTime(doctor.createdAt)}</td>
                <td>{doctor.status}</td>
                <td>
                  <div className="d-flex">
                    {doctor.status === "pending" && (
                      <h1 className="btn btn-success m-2" onClick={() => changeDoctorStatus(doctor, "approved")}>
                        Approve
                      </h1>
                    )}
                    {doctor.status === "pending" && (
                      <h1 className="btn btn-danger m-2" onClick={() => changeDoctorStatus(doctor, "rejected")}>
                        Reject
                      </h1>
                    )}
                    {doctor.status === "approved" && (
                      <h1 className="btn btn-danger m-2" onClick={() => changeDoctorStatus(doctor, "blocked")}>
                        Block
                      </h1>
                    )}
                    {doctor.status === "blocked" && (
                      <h1 className="btn btn-success m-2" onClick={() => changeDoctorStatus(doctor, "approved")}>
                        Un Block
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
  );
}

export default DoctorsList;
