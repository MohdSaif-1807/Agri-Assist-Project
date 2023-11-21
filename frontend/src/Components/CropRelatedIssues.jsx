import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarFinal from "./NavbarFinal";
import cropDiseasePrediction from '../Images/cropDiseasePrediction.png';
import cropPrediction from '../Images/cropPrediction.png';
import "@fontsource/open-sans";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
function CropRelatedIssues() {
    const navigate = useNavigate();
    function handleCropDisease() {
        navigate('/predict-disease');
    }
    const handleCropPredict = () => {
        navigate('/crop-predict');
    }
    return (
        <>
            <NavbarFinal />
            <Container style={{ paddingTop: "40px", paddingLeft: "40px" }}>
                <Row>
                    <Col style={{ paddingBottom: "40px" }}>
                        <Card style={{ width: '18rem', backgroundColor: "#99F3BD", borderColor: 'black' }}>
                            <Card.Img src={cropDiseasePrediction} />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>Plant Disease Prediction</Card.Title>
                                <Card.Text style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                    The AI Model has been built which has been created in order to predict crop disease with the steps to be cured.
                                </Card.Text>
                                <Button style={{ fontFamily: 'Open Sans', fontWeight: 'bold', backgroundColor: "#32FF6A", borderColor: 'black', color: 'black' }} onClick={handleCropDisease}>Predict Crop Disease</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem', backgroundColor: "#99F3BD", borderColor: 'black' }}>
                            <Card.Img src={cropPrediction} />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>Crop Prediction</Card.Title>
                                <Card.Text style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>
                                    The AI Model has been built which has been created in order to predict crop that can be grown based on the soil and region factors.
                                </Card.Text>
                                <Button onClick={handleCropPredict} style={{ fontFamily: 'Open Sans', fontWeight: 'bold', backgroundColor: "#32FF6A", borderColor: 'black', color: 'black', "&:hover": { backgroundColor: 'green' } }}>Predict Crop</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default CropRelatedIssues;