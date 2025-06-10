import React from 'react';
import Layout from '../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorForm from '../components/DoctorForm';

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();

    const formatTime = (time) => {
        if (time && typeof time.toDate === 'function') {
            const dateObject = time.toDate();
            dateObject.setUTCHours(dateObject.getUTCHours() + 5); // Add 5 hours for the Indian time zone
            dateObject.setUTCMinutes(dateObject.getUTCMinutes() + 30); // Add 30 minutes
            const hours = dateObject.getUTCHours().toString().padStart(2, '0');
            const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-doctor-account',
                {
                    ...values,
                    userId: user._id,
                    timings: values.timings.map(formatTime),
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(values)
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error('Error:', error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout>
            <h1 className='page-title mb-3'>ApplyDoctor</h1>
            <hr className='hr-1' />
            <DoctorForm onFinish={onFinish} />
        </Layout>
    );
}

export default ApplyDoctor;
