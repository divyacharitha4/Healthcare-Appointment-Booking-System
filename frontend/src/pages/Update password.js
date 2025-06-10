import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import Layout from '../components/layout';
import { Navigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap'; 

function UpdatePassword() {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const onUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match. Please confirm your new password.");
      return;
    }

    const updateValues = {
      currentPassword,
      newPassword,
    };

    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/update-password', updateValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        toast("Password updated successfully. Please log in again with the new password");
        localStorage.clear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <div className='update-password-page mt-5'>
        <Card style={{ width: '20rem'  }} className='dc-b'>
          <Card.Body>
            <Card.Title>Update Password</Card.Title>
              <Form onSubmit={onUpdatePassword}>
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label className='mt-2'>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label className='mt-2'>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmNewPassword">
                  <Form.Label className='mt-2'>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className=' mt-3 ' variant="primary" type="submit">
                  Update Password
                </Button>
              </Form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

export default UpdatePassword;
