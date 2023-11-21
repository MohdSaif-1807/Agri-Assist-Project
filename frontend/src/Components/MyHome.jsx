import React from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import Typography from '@mui/material/Typography';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CssBaseline from '@mui/material/CssBaseline';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Row, Col } from 'react-bootstrap';
import "@fontsource/open-sans";
import "@fontsource/roboto";
import "@fontsource/libre-baskerville/400-italic.css";
import NavbarFinal from './NavbarFinal';
import Paper from '@mui/material/Paper';
import myhome2 from '../Images/myhome2.jpg';
import profile from '../Images/profile.jpg';
import HeaderSection from './HeaderSection';
function MyHome() {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/sign-up');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <>
            <NavbarFinal />
            <ThemeProvider theme={defaultTheme} >
                <Grid container component="main" sx={{ backgroundColor: "#D2F6C5", height: '80vh' }}>
                    <CssBaseline />

                    <Grid item xs={12} sm={8} md={6} sx={{ backgroundColor: "#D2F6C5" }} component={Paper} elevation={10} square>
                        <Box
                            sx={{
                                my: 1,
                                mx: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "45px", marginTop: "20px" }}>
                                Empowering Farmers
                            </Typography>
                            <Typography sx={{ fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "45px", marginTop: "50px" }}>
                                Through Innovation
                            </Typography>
                            <span style={{ position: 'absolute', marginTop: "380px", marginRight: '250px' }}>
                                <Button variant='contained' color='success' onClick={handleSignUp} sx={{
                                    ":hover": {
                                        bgcolor: "#AF5",
                                        color: "black"
                                    }, textAlign: 'center', width: "120px", height: '50px', borderRadius: '10px',
                                    fontFamily: 'Open Sans', fontWeight: 'bold'
                                }}>
                                    SignUp<HowToRegIcon style={{ marginLeft: '20px' }} /> </Button>
                            </span>
                            <span style={{ position: 'absolute', marginLeft: "150px", marginTop: "380px", display: 'flex' }}>
                                <Button variant='contained' color='success' onClick={handleLogin} sx={{
                                    ":hover": {
                                        bgcolor: "#AF5",
                                        color: "black"
                                    }, textAlign: 'center', width: "120px", height: '50px', borderRadius: '10px', fontFamily: 'Open Sans', fontWeight: 'bold'
                                }}
                                >Login<LoginIcon style={{ marginLeft: '20px' }} /> </Button>
                            </span>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?agriculture&wallpapers)'
                        }}
                    />
                </Grid>
            </ThemeProvider >

        </>
    )
}
export default MyHome;