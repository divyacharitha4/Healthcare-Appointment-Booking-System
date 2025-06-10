import React from 'react'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';
import moment from 'moment';

function DoctorForm({ onFinish, initialValues }) {
    
    const customFormat = 'HH:mm';

    return (
        <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={{
                ...initialValues,
                timings: initialValues?.timings.map((time) =>
                    time ? moment(time, customFormat) : null
                ),
            }}
        >
            <h1 className='card-title mt-3'>Personal Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='First Name' name='firstName' rules={[{ required: true }]}>
                        <Input placeholder='First Name' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Last Name' name='lastName' rules={[{ required: true }]}>
                        <Input placeholder='Last Name' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: true }]}>
                        <Input placeholder='Phone Number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Website' name='website' rules={[{ required: true }]}>
                        <Input placeholder='Website' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Address' name='address' rules={[{ required: true }]}>
                        <Input placeholder='Address' />
                    </Form.Item>
                </Col>
            </Row>
            <hr className='hr-1' />
            <h1 className='card-title mt-3'>Professional Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='specialization' name='specialization' rules={[{ required: true }]}>
                        <Input placeholder='Specialization' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Experience' name='experience' rules={[{ required: true }]}>
                        <Input placeholder='Experience' type='number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Fee Per Cunsultation' name='feePerCunsultation' rules={[{ required: true }]}>
                        <Input placeholder='Fee Per Cunsulcation' type='number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Timings' name='timings' rules={[{ required: true }]}>
                        <TimePicker.RangePicker format={customFormat}/>
                    </Form.Item>
                </Col>
            </Row>

            <div className='d-flex justify-content-center'>
                <Button className='primary-button' htmlType='submit'>Submit</Button>
            </div>
        </Form>
    )
}

export default DoctorForm