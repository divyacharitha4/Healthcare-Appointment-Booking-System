import React, { useEffect } from 'react';
import Layout from '../components/layout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsseen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/mark-all-notifications-as-seen',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/delete-all-notifications',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };
  const openCity = (cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(cityName).style.display = 'block';
    document.querySelector(`.tablinks[data-city="${cityName}"]`).classList.add('active');
  };
  useEffect(() => {
    openCity('London');
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2>Notifications</h2>
        <div className="tab">
          <button className="tablinks" data-city="London" onClick={() => openCity('London')}>
            Unseen
          </button>
          <button className="tablinks" data-city="Paris" onClick={() => openCity('Paris')}>
            Seen
          </button>
        </div>
        <div id="London" className="tabcontent">
          <div className="d-flex justify-content-end p-3">
            <div>
              <input className="p-2" type="submit" value="Mark all as read" onClick={() => markAllAsseen()} />
            </div>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div className="card p-3 my-2" key={notification.id1} onClick={() => navigate(notification.onClickPath)}>
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </div>
        <div id="Paris" className="tabcontent">
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-end p-3">
              <div>
                <input className="p-2" type="submit" value="Delete all" onClick={() => deleteAll()} />
              </div>
            </div>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className="card p-3 my-2" key={notification.id1} onClick={() => navigate(notification.onClickPath)}>
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Notifications;
