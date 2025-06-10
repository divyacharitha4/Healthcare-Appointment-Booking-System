// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import Doctor from '../components/Doctor';
import AdminHome from './AdminHome'; // Import the AdminHome component
import DoctorHome from './DoctorHome'; // Import the DoctorHome component
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useEffect, useState } from 'react';

function Home() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/user/get-all-approved-doctors', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            getData();
        } else {
            const filteredDoctors = doctors.filter((doctor) =>
                (
                    doctor.firstName &&
                    doctor.firstName.toLowerCase().includes(term)
                ) ||
                (
                    doctor.lastName &&
                    doctor.lastName.toLowerCase().includes(term)
                ) ||
                (
                    doctor.specialization &&
                    doctor.specialization.toLowerCase().includes(term)
                ) ||
                (
                    doctor.address &&
                    doctor.address.toLowerCase().includes(term)
                )
            );
            setDoctors(filteredDoctors);
        }
    };

    const { user } = useSelector((state) => state.user);

    return (
        <Layout>
            {user?.isAdmin && <AdminHome />} 
            {(user?.isDoctor || user?.isApplyDoctor) && <DoctorHome doctors={doctors} />}
            {!user?.isAdmin && !user?.isDoctor && !user?.isApplyDoctor && (
                <div className='hm-body'>
                <div className="hm-container hm-by">
                    <div className="hm-banner ">
                        <h1>View Doctors, Book an Appointment</h1>
                        <p>Find the best doctors.</p>
                        <div className="hm-search-bar">
                            <input
                                type="text"
                                placeholder="Search By Doctors, Specialization & Location"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>
                    </div>
                </div>
                <div className="container mt-2">
                        <div className="row">
                            {doctors.map((doctor) => (
                                <div className="col-md-4 " key={doctor._id}>
                                    <Doctor doctor={doctor} />
                                </div>
                            ))}
                        </div>
                </div>
                </div>
            )}
        </Layout>
    );
}

export default Home;
