import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onFinish = async (e) => {
    e.preventDefault();
    const values = {
      email,
      password,
    };
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/login', values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page");
        localStorage.setItem("token", response.data.data);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='lr-page'>
      <div className="lr-wrapper">
        <h2 className='lr-h2'>Login</h2>
        <form id="form1" className='lr-from' onSubmit={onFinish} >
          <div>
            <h5 className='lr-h5'>Email</h5>
          </div>
          <div className="lr-input-box">
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <h5 className='lr-h5'>Password</h5>
          </div>
          <div className="lr-input-box">
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="lr-input-box button">
            <input type="submit" value="Login" />
          </div>
          <div className="text">
            <h3 className='lr-h3'>
              Don't have an account? <a className='lr-a' href="/Register">Register now</a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
