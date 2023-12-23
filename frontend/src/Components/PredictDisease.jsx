import { React, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import { Typography, Box, Grid, AppBar } from '@mui/material';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import "@fontsource/open-sans";
import NavbarFinal from './NavbarFinal';
import AppContext from '../AppContext';
function PredictDisease() {
    const [imageUrl, setImageUrl] = useState({ image: "" });
    const navigate = useNavigate();

    const [res, setRes] = useState('Upload the image!');
    const [loading, setLoading] = useState(false);
    const { setTempUrl, setAns, tempUrl } = useContext(AppContext);
    const handleImage = (e) => {
        setTempUrl(e.target.files[0]);
        console.log("temp url: ", tempUrl);
        imageUrl.image = e.target.files[0];
        setTempUrl(URL.createObjectURL(e.target.files[0]));
        setImageUrl({ ...imageUrl })
    }
    const handlePredict = () => {
        setLoading(true);
        let data = JSON.stringify({
            img: 'hello world'
        });
        console.log(imageUrl);
        console.log("temp new image: ", tempUrl);
        if (imageUrl['image']) {
            const data = new FormData();
            setRes('Your Result is being Progressed..')
            data.append('file', imageUrl['image']);
            axios.post('https://agriassistflaskbackend.onrender.com/disease-predict', data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response.data);
                    console.log("crop", response.data.Crop);
                    setAns({
                        Crop: response.data.Crop,
                        Disease: response.data.Disease,
                        Cause_of_disease: response.data.Cause,
                        How_to_prevent_OR_cure_the_disease: response.data.Prevent_Cure
                    })
                    setRes();
                    setLoading(false);
                    navigate('/predict-disease-result');

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    return (
        <>
            <NavbarFinal />
            <Grid container
                alignItems="center"
                justifyContent="center"
                md={12} xs={12} sx={{ display: "grid", minHeight: "20vh" }}>
                <Typography sx={{ paddingTop: "40px", fontWeight: 'bold', fontFamily: 'Open Sans', paddingBottom: "40px" }}>
                    Select the image of crop for which you want to predict disease
                </Typography>
                <Form.Group style={{ paddingBottom: "40px" }}>
                    <Form.Control type='file' onChange={
                        handleImage
                    }>
                    </Form.Control>
                </Form.Group>
                <Form.Group style={{ paddingLeft: "150px", alignItems: "center", alignContent: "center" }}>
                    <Button variant='primary' onClick={handlePredict}>Predict</Button>
                </Form.Group>
                {res}
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress sx={{ marginLeft: '30px', marginTop: '70px', m: "7" }} />
                </Fade>
            </Grid >
            {/* <Container style={{ paddingLeft: "400px", paddingTop: "80px" }}>

                <Form>
                    <Row>
                        <Col md={5}>
                            <Form.Group>
                                <Form.Control type='file' onChange={
                                    handleImage
                                }>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                   
                </Form>
                <Row>
                    <Col md={5}>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div
                            style={{
                                backgroundColor: "#99F3BD",
                                width: "500px",
                                height: "300px",
                                border: "1px solid black",
                                overflow: "scroll",
                                textAlign: 'center'
                            }}
                        >
                            {res}
                            <Fade
                                in={loading}
                                style={{
                                    transitionDelay: loading ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress sx={{ marginLeft: '30px', marginTop: '70px', m: "7" }} />
                            </Fade>
                            <div>
                                <Typography sx={{ fontFamily: 'Open Sans' }}><b>Crop:</b>{ans.Crop}</Typography>
                                <br />
                                <Typography sx={{ fontFamily: 'Open Sans' }}><b>Disease:</b>{ans.Disease}</Typography>
                                <br />
                                <Typography sx={{ fontFamily: 'Open Sans' }} >
                                    <b>Cause Of Disease:</b>
                                    <br />
                                    {ans.Cause_of_disease.map((item) => {
                                        return (<>{item}<br /></>)
                                    })}
                                </Typography>
                                <br />
                                <Typography>
                                    <b>Prevention or methods to cure the disease:</b>
                                    <br />
                                    {
                                        ans.How_to_prevent_OR_cure_the_disease.map((item) => {
                                            return (<>{item}</>)
                                        })
                                    }
                                </Typography>
                                <br></br>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container > */}
        </>
    )
}
export default PredictDisease;