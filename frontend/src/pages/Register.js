import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isApplyDoctor: false,
  });

  const onFinish = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (formData.userType === 'doctor') {
      dataToSend.isApplyDoctor = formData.isApplyDoctor;
    }
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/register', dataToSend);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast('Redirecting to login page');
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: value,
    }));
    if (e.target.name === 'userType' && value === 'doctor') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isApplyDoctor: true,
      }));
    }
  };
  
  return (
    <div className='lr-page'>
      <div className='lr-wrapper'>
        <h2 className='lr-h2'>Registration</h2>
        <form
          id='form1'
          className='lr-form'
          onSubmit={onFinish}
          method='post'
        >
          <div>
            <h5 className='lr-h5'>Name</h5>
          </div>
          <div className='lr-input-box'>
            <input
              type='text'
              placeholder='Enter your name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h5 className='lr-h5'>Email</h5>
          </div>
          <div className='lr-input-box'>
            <input
              type='text'
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h5 className='lr-h5'>Password</h5>
          </div>
          <div className='lr-input-box'>
            <input
              type='password'
              placeholder='Create password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <h5 className='lr-h5'>Re-enter Password</h5>
          </div>
          <div className='lr-input-box'>
            <input
              type='password'
              placeholder='Re-enter password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <h5 className='lr-h5'>User Type</h5>
          </div>
          <div>
            <select
              name='userType'
              value={formData.userType}
              onChange={handleChange}
              className='lr-select'
              required
            >
              <option value='user'>User</option>
              <option value='doctor'>Doctor</option>
            </select>
          </div>

          <div className='lr-input-box button'>
            <input type='submit' value='Register Now' />
          </div>
          <div className='text'>
            <h3 className='lr-h3'>
              Already have an account? <a href='/login'>Login now</a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
