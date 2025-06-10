import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import booknow from '../images/booknow.png';

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [dateError, setDateError] = useState(null);
    const [timeError, setTimeError] = useState(null);
    const navigate=useNavigate();
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();

    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/doctor/get-doctor-info-by-id", {
                doctorId: params.doctorId,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctor(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    }

    const bookNow = async () => {
        try {
            if (!date || !time) {
                setDateError(!date ? "Date is required" : null);
                setTimeError(!time ? "Time is required" : null);
                return;
            }

            dispatch(showLoading());
            const response = await axios.post("/api/user/book-appointment", {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                userInfo: user,
                date: date,
                time: time,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/appointments');
            }
        } catch (error) {
            toast.error('Error booking appointment');
            dispatch(hideLoading());
        }
    }

    const checkAvailability = async () => {
        try {
            if (!date || !time) {
                setDateError(!date ? "Date is required" : null);
                setTimeError(!time ? "Time is required" : null);
                return;
            }

            dispatch(showLoading());
            const response = await axios.post("/api/user/check-booking-availability", {
                doctorId: params.doctorId,
                date: date,
                time: time,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error');
            dispatch(hideLoading());
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className='card-title doc-cr mt-3'>
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    <hr className='mt-2 mb-3' />
                    <Row gutter={20} align="middle">
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <img
                            src={booknow}
                            width='100%'
                            ></img>
                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h5 className='doc-card-text'><b>Timings:</b>{doctor.timings[0]}-{doctor.timings[1]}</h5>
                            <p className='doc-card-text'><b>Specialization:</b> {doctor.specialization}</p>
                            <p className='doc-card-text'><b>Experience:</b> {doctor.experience} years</p>
                            <p className='doc-card-text'><b>Address:</b> {doctor.address}</p>
                            <p className='doc-card-text'><b>Fee Per Visit:</b> {doctor.feePerCunsultation}</p>
                            <div className='d-flex flex-column'>
                                <DatePicker
                                    format='DD-MM-YYYY'
                                    onChange={(value) => {
                                        setIsAvailable(false);
                                        setDate(value.format('DD-MM-YYYY'));
                                        setDateError(null);
                                    }}
                                />
                                {dateError && <span className="error">{dateError}</span>}
                                <TimePicker
                                    format="HH:mm"
                                    className='mt-3'
                                    onChange={(value) => {
                                        setIsAvailable(false);
                                        setTime(value.format('HH:mm'));
                                        setTimeError(null);
                                    }}
                                />
                                {timeError && <span className="error">{timeError}</span>}
                                {!isAvailable && (<Button className=' mt-3 bk-full-width-button' onClick={checkAvailability}>Check Availability</Button>)}
                                {isAvailable && (<Button className=' mt-3 bk-full-width-button' onClick={bookNow}>Book Now</Button>)}
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointment;
