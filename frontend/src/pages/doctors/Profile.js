import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorForm from '../../components/DoctorForm';

function Profile() {
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null);
    const params=useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatTime = (time) => {
        if (time && typeof time.toDate === 'function') {
            const dateObject = time.toDate();
            dateObject.setUTCHours(dateObject.getUTCHours() + 5); 
            dateObject.setUTCMinutes(dateObject.getUTCMinutes() + 30);
            const hours = dateObject.getUTCHours().toString().padStart(2, '0');
            const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/update-doctor-profile',
                {
                    ...values,
                    userId: user._id,
                    timings: values.timings.map(formatTime),
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    }
    
    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/doctor/get-doctor-info-by-user-id",
                {
                    userId: params.userId,
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
    useEffect(() => {
            getDoctorData()
    }, [])
    return (
        <Layout>
            <h1 className='page-title'>Doctors Profile</h1>
            {doctor &&<DoctorForm onFinish={onFinish} initialValues={doctor}/>}
        </Layout>
    )
}

export default Profile;