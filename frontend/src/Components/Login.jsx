import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "@fontsource/open-sans";
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import myhome3 from '../Images/myhome3.jpg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();
function Login() {
    const [imageUrl, setImageUrl] = useState('https://source.unsplash.com/random?agriculture&wallpapers');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [check, setCheck] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const handleCheck = (e) => {
        setCheck(e.target.checked);
    }
    const handleClick = async () => {
        const dataMap = {
            Email: email,
            Password: password,
            IsFarmer: check
        };
        axios({
            url: "https://agri-assist-backend.onrender.com/login",
            method: "POST",
            data: dataMap,
        })
            .then((response) => {
                console.log(response);
                if (response.data.user) {
                    localStorage.setItem("token", response.data.jwt_token);
                    localStorage.setItem("user", response.data.user);
                    localStorage.setItem("_id", response.data._id);
                    console.log("hello from frontend");
                    navigate('/features');
                } else {
                    console.log("error");
                    //  setinfo(response.data);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                console.log("Error occured");
                toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            });
    };

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 650) {
                setMobileView(true);
            }
            else {
                setMobileView(false);
            }
            console.log(window.innerWidth);

            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResize);
        const id = setInterval(async () => {
            await axios.get('https://source.unsplash.com/random?agriculture&wallpapers')
                .then(async (response) => {
                    const url = await response.request.responseURL;
                    console.log(windowWidth);
                    console.log(url);
                    setImageUrl(url);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 20000);
        return () => {
            clearInterval(id);
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [window.innerWidth]);
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100%' }}>
                    <CssBaseline />
                    <Grid
                        // xs={false}
                        xs={12}
                        md={12}
                        sx={{
                            height: "100vh",
                            backgroundSize: "cover",
                            backgroundPosition: "top center",
                            backgroundImage: `url(${imageUrl})`,
                            transition: 'all 3s linear',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]
                        }}
                    >
                        <Grid
                            // sm={2}
                            xs={12}
                            md={12}
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ minHeight: '100vh' }}
                        >
                            <Box
                                container
                                alignItems="center"
                                justifyContent="center"
                                // sm={2}
                                xs={7}
                                md={7}

                                sx={{
                                    // width: mobileView ? windowWidth : 500,
                                    // width: windowWidth,
                                    backgroundColor: 'rgba(50,50,50,0.5)',
                                    borderRadius: '25px'
                                }}
                            >
                                <h3 style={{ color: 'white', fontFamily: 'Open Sans', fontWeight: 'bold', paddingTop: '20px', paddingLeft: '130px', paddingBottom: '30px' }}>Login</h3>
                                <Form >
                                    <Form.Group style={{ display: 'flex' }}>
                                        <Form.Label style={{ fontFamily: 'Open Sans', fontWeight: 'bold', color: 'white', paddingLeft: '10px', display: 'inline-block', paddingRight: '52px' }} >Email</Form.Label>
                                        <Form.Control style={{ borderRadius: '30px', display: 'inline-block', width: '70%' }} value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group style={{ paddingTop: '20px', display: 'flex' }}>
                                        <Form.Label style={{ fontFamily: 'Open Sans', fontWeight: 'bold', color: 'white', paddingLeft: '10px', display: 'inline-block', paddingRight: '20px' }} >Password</Form.Label>
                                        <Form.Control style={{ borderRadius: '30px', display: 'inline-block', width: '70%' }} value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group style={{ paddingLeft: '20px', paddingTop: '20px' }}>
                                        <Form.Check id="isFarmerChkBox" value={check} onChange={handleCheck} style={{ display: 'inline-block' }}></Form.Check>
                                        <Form.Label style={{ fontSize: '14px', color: 'white', fontFamily: 'Open Sans', fontWeight: 'bold', paddingLeft: '20px', display: 'inline-block' }}>Are you a farmer?</Form.Label>
                                    </Form.Group>
                                    <Form.Group style={{ paddingLeft: '130px', paddingTop: '10px' }}>
                                        <Button variant='light' style={{ fontFamily: 'Open Sans', FontWeight: 'bold' }} onClick={handleClick}>Submit</Button>
                                    </Form.Group>
                                </Form>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            </ThemeProvider >
            <ToastContainer />
        </>

    )
}
export default Login;