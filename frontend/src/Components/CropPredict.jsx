import axios from 'axios';
import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import NavbarFinal from './NavbarFinal';
import { Typography, Grid } from '@mui/material';
import AppContext from '../AppContext';
function CropPredict() {
    const navigate = useNavigate();
    const { setCropPredictRes } = useContext(AppContext);
    const [nitrogen, setNitrogen] = useState();
    const [phosphorous, setPhosphorous] = useState();
    const [loading, setLoading] = useState(false);
    const [pottasium, setPottasium] = useState();
    const [ph, setPh] = useState();
    const [rainfall, setRainfall] = useState();
    const [state, setState] = useState();
    const [res, setRes] = useState('Enter the input values');
    const [city, setCity] = useState();
    const [data, setData] = useState({
        nitrogen: '',
        phosphorous: '',
        pottasium: '',
        ph: '',
        rainfall: '',
        city: '',
        state: ''
    });
    function handleSubmit() {
        setRes('your Result is being Processed..');
        setLoading(true);
        data.nitrogen = nitrogen;
        data.phosphorous = phosphorous;
        data.pottasium = pottasium;
        data.ph = ph;
        data.rainfall = rainfall;
        data.state = state;
        data.city = city;
        setData({ ...data });
        axios.post('https://agriassistflaskbackend.onrender.com/crop-predict', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data);
                setCropPredictRes(response.data);
                // setRes(response.data);
                setRes('');
                setLoading(false);
                navigate('/crop-predict-result');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <NavbarFinal />
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                md={12} sx={{ paddingTop: "20px", display: "grid", minHeight: "50vh" }}>
                <Form>
                    <Container>
                        <Row style={{ paddingTop: "20px" }}>
                            <Typography style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                Enter values for the suggestion for the crop
                            </Typography>
                        </Row>
                        <Typography sx={{ textAlign: "center", fontStyle: "Open Sans", fontWeight: "bold", paddingBottom: "40px" }}>{res}</Typography>
                        <Fade
                            in={loading}
                            style={{
                                transitionDelay: loading ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress />
                        </Fade>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px", paddingTop: "40px" }}>
                            ,   {/* <Row > */}

                            {/* </Row> */}
                            <Row>
                                <Col ><Form.Label>Nitrogen Value</Form.Label></Col>
                                <Col ><Form.Control type='number' value={nitrogen} onChange={(e) => { setNitrogen(e.target.value) }}></Form.Control></Col>
                            </Row>
                        </Form.Group>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col >
                                    <Form.Label>Phosphorous Value</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='number' value={phosphorous} onChange={(e) => { setPhosphorous(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group >
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Form.Label>Pottasium Value</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='number' value={pottasium} onChange={(e) => { setPottasium(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Form.Label>pH Value</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='number' value={ph} onChange={(e) => { setPh(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Form.Label>Rainfall Value</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='number' value={rainfall} onChange={(e) => { setRainfall(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Form.Label>State</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='text' value={state} onChange={(e) => { setState(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group style={{ alignContent: 'center', alignItems: 'center', paddingBottom: "20px" }}>
                            <Row>
                                <Col>
                                    <Form.Label>City</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type='text' value={city} onChange={(e) => { setCity(e.target.value) }}></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row></Row>

                        <Row> <Button variant='primary' onClick={handleSubmit}>Predict</Button></Row>



                        {/* <Row style={{ paddingTop: "20px" }}>
                        <div
                            style={{
                                backgroundColor: "#99F3BD",
                                width: "900px",
                                height: "300px",
                                border: "1px solid black",
                                overflow: "scroll",
                                fontFamily: 'Open Sans',
                                fontWeight: 'bold',
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
                                <CircularProgress sx={{ marginTop: '70px', m: "7" }} />
                            </Fade>
                        </div>
                    </Row> */}

                    </Container>
                </Form >
            </Grid>
        </>

    )
}
export default CropPredict;