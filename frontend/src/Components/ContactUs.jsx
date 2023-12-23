import { React, useState } from 'react';
import axios from 'axios';
import NavbarFinal from './NavbarFinal';
import "@fontsource/open-sans";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Box, Grid, Typography, Item } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [issue, setIssue] = useState('');
    const handleSubmit = () => {
        const dataMap = {
            Name: name,
            Email: email,
            Phone: phone,
            Subject: subject,
            Issue: issue
        }
        axios({
            url: "https://agri-assist-backend.onrender.com/sendEmail",
            method: "POST",
            data: dataMap,
        })
            .then((res) => {
                setName('');
                setEmail('');
                setPhone('');
                setSubject('');
                setIssue('');
                console.log(res);
                toast.success(res.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    }


    return (
        <>
            <NavbarFinal />
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                sx={{ paddingTop: "20px", display: "grid" }}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "Open Sans", fontSize: "30px", textAlign: "center" }}>Contact Us</Typography>
                <Box item
                    spacing={0}
                    alignItems="center"
                    justifyContent="center"
                    md={12}
                    sx={{ backgroundColor: "#99F3BD", paddingTop: "20px", display: "grid", minHeight: "70vh" }}>
                    <Row>
                        <Col>
                            <Form.Label style={{ fontStyle: "Open Sans", fontWeight: "bold" }}>Name</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={name} type="text" placeholder='Enter Name' onChange={(e) => { setName(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{ fontStyle: "Open Sans", fontWeight: "bold" }}>Email</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={email} type="email" placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{ fontStyle: "Open Sans", fontWeight: "bold" }}>Phone Number</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={phone} type="number" placeholder='Enter Phone Number' onChange={(e) => { setPhone(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{ fontStyle: "Open Sans", fontWeight: "bold" }}>Subject</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={subject} type="text" placeholder='Subject' onChange={(e) => { setSubject(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label style={{ fontStyle: "Open Sans", fontWeight: "bold" }}>Issues</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={issue} as="textarea" rows={5} placeholder='Describe your issue in brief...' onChange={(e) => { setIssue(e.target.value) }} />
                        </Col>
                    </Row>
                    <Row >
                        <Col >
                            <Button onClick={handleSubmit} style={{ marginLeft: "150px" }}>Submit</Button>
                        </Col>
                    </Row>
                </Box>
                {/* </Grid> */}
            </Grid >
            <ToastContainer />

        </>
    )
}
export default ContactUs;