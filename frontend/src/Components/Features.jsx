import { React, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Typography } from '@mui/material';
import "@fontsource/libre-baskerville/400-italic.css";
import "@fontsource/open-sans";
import profile from '../Images/profile.jpg';
import cropRelatedIssues from '../Images/cropRelatedIssues.jpg';
import cropMarketing from '../Images/cropMarketing.jpg';
import NavbarFinal from './NavbarFinal';
const defaultTheme = createTheme();
function Features() {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [])
    const handleNoLogin = () => {
        navigate('/login');
    }
    return (
        <>
            <NavbarFinal />
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100%' }}>
                    <CssBaseline />
                    <Typography style={{ marginLeft: "120px", position: 'absolute', fontFamily: "Libre Baskerville", fontWeight: "bold", fontSize: "50px" }}>
                        Feature Section
                    </Typography>
                    <Grid item xs={12} md={12} sx={{ overflow: 'visible' }}>
                        {
                            token ?
                                user === 'farmer' ?
                                    // <Grid item xs={12} md={12}>
                                    <Container style={{ paddingLeft: "40px", paddingTop: "150px", alignItems: "center", alignContent: "center" }}>
                                        <Row>
                                            <Col >
                                                <Box style={{ display: "grid", position: "relative", width: "300px", height: "300px", backgroundColor: '#99F3BD' }}>
                                                    <img src={cropRelatedIssues} style={{ marginTop: "40px", marginLeft: "60px", display: "grid", position: "relative", overflow: 'visible' }} width="180px" height="180px" alt="prfile.jpg" />
                                                    <a href="/crop-related-issues" style={{ marginLeft: '60px', textDecoration: 'none', fontFamily: 'Open Sans', fontWeight: 'bold', color: 'black' }}>Crop Related Issues</a>
                                                </Box>
                                            </Col>
                                            <Col>
                                                <Box style={{ display: "grid", position: "relative", width: "300px", height: "300px", backgroundColor: '#99F3BD' }}>
                                                    <img src={cropMarketing} style={{ marginTop: "40px", marginLeft: "60px", display: "grid", position: "relative", overflow: 'visible' }} width="180px" height="180px" alt="prfile.jpg" />
                                                    <a href="/marketplace" style={{ marginLeft: '80px', textDecoration: 'none', fontFamily: 'Open Sans', fontWeight: 'bold', color: 'black' }}>Yeild Marketing</a>
                                                </Box>
                                            </Col>
                                        </Row>
                                    </Container >
                                    // </Grid>
                                    :
                                    <Container style={{ paddingLeft: "40px", paddingTop: "150px" }}>
                                        <Row>
                                            <Col>
                                                <Box style={{ display: "grid", position: "relative", width: "300px", height: "300px", backgroundColor: '#99F3BD', overflow: 'visible' }}>
                                                    <img src={cropMarketing} style={{ marginTop: "40px", marginLeft: "60px", display: "grid", position: "relative", overflow: 'visible' }} width="180px" height="180px" alt="prfile.jpg" />
                                                    <a href="/marketplace" style={{ marginLeft: '80px', textDecoration: 'none', fontFamily: 'Open Sans', fontWeight: 'bold', color: 'black' }}>Yeild Marketing</a>
                                                </Box>
                                            </Col>
                                        </Row>
                                    </Container>
                                : navigate('/login')
                        }
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}
export default Features;
