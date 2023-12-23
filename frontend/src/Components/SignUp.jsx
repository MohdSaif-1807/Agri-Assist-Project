import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import "@fontsource/open-sans"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import myhomepage1 from '../Images/homePage1.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function SignUp() {
    const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [farmerID, setFarmerID] = useState(0);
    const handleSubmit = async () => {
        const dataMap = {
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            IsFarmer: check,
            FarmerID: farmerID
        };
        axios({
            url: "https://agri-assist-backend.onrender.com/signup",
            method: "POST",
            data: dataMap,
        })
            .then((response) => {
                console.log(response);
                navigate('/login');
            })
            .catch((err) => {
                console.log(dataMap);
                console.log("Error occured");
                toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            });
    };

    const handleCheck = (e) => {
        setCheck(e.target.checked);
        if (e.target.checked === true) {
            setVisible(false);
        }
        else {
            setVisible(true);
        }
    }

    return (<>
        <ThemeProvider theme={defaultTheme} >
            <Grid container component="main" sx={{ backgroundColor: "#CCEDD2", height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?agriculture&wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <Grid item xs={12} sm={8} md={6} style={{ backgroundColor: "#CCEDD2" }} component={Paper} elevation={10} square>
                    <Box
                        sx={{
                            my: 1,
                            mx: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AppRegistrationIcon />
                        </Avatar>
                        <Typography style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }} component="h1" variant="h5">
                            Registration
                        </Typography>
                        <Box component="form" sx={{ mt: 1 }}>
                            <Form style={{ paddingTop: '10px' }}>
                                <Form.Group style={{ display: 'inline-block', paddingBottom: '13px' }}  >
                                    <Form.Label id='frstName' style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>First Name</Form.Label>
                                    <Form.Control required style={{ height: '30px', borderRadius: '30px' }} type='text' id='frstNameTxtBox' value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></Form.Control>
                                </Form.Group>
                                <Form.Group style={{ paddingLeft: '15px', display: 'inline-block' }} >
                                    <Form.Label id='lstName' style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Last Name</Form.Label>
                                    <Form.Control required style={{ height: '30px', borderRadius: '30px' }} type='text' id='lstNameTxtBox' value={lastName} onChange={(e) => { setLastName(e.target.value) }}></Form.Control>
                                </Form.Group>
                                <Form.Group style={{ paddingBottom: '13px' }}>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Phone Number</Form.Label>
                                    <Form.Control style={{ height: '30px', borderRadius: '30px' }} type="phone" id="phnNmbrTxtBox" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}></Form.Control>
                                </Form.Group>
                                <Form.Group style={{ paddingBottom: '13px' }}>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }} >Email</Form.Label>
                                    <Form.Control style={{ height: '30px', borderRadius: '30px' }} value={email} type="email" id="emailIDTxtBox" onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
                                </Form.Group>

                                <Form.Group style={{ paddingBottom: '13px' }}>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Password</Form.Label>
                                    <Form.Control id="pswdTxtBox" value={password} style={{ height: '30px', borderRadius: '30px' }} type='password' onChange={(e) => { setPassword(e.target.value) }}></Form.Control>
                                </Form.Group>

                                <Form.Group style={{ paddingBottom: '13px' }}>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Confirm Password</Form.Label>
                                    <Form.Control id="cnfrmPswdTxtBox" value={confirmPassword} style={{ height: '30px', borderRadius: '30px' }} type='password' onChange={(e) => { setConfirmPassword(e.target.value) }}></Form.Control>
                                </Form.Group>

                                <Form.Group style={{ paddingBottom: '13px' }} disabled={visible}>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Farmer ID</Form.Label>
                                    <Form.Control id="farmerIDTxtBox" value={farmerID} style={{ height: '30px', borderRadius: '30px' }} type='number' disabled={visible} onChange={(e) => { setFarmerID(e.target.value) }} ></Form.Control>
                                </Form.Group>

                                <Form.Group style={{ paddingBottom: '13px' }}>
                                    <Form.Check id="isFarmerChkBox" value={check} onChange={handleCheck} style={{ display: 'inline-block' }}></Form.Check>
                                    <Form.Label style={{ fontSize: '14px', fontFamily: 'Open Sans', fontWeight: 'bold', paddingLeft: '20px', display: 'inline-block' }}>Are you a farmer?</Form.Label>
                                </Form.Group>

                                <Form.Group style={{ paddingLeft: '200px' }}>
                                    <Button variant='primary' onClick={handleSubmit}>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
        <ToastContainer />

    </>

    );
}