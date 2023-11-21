import React, { useContext } from 'react';
import NavbarFinal from './NavbarFinal';
import { Typography, Grid } from '@mui/material';
import AppContext from '../AppContext';
import mango from '../CropPredictImages/mango.jpg';
import apple from '../CropPredictImages/apple.jpg';
import banana from '../CropPredictImages/banana.jpg';
import blackgram from '../CropPredictImages/blackgram.jpg';
import chickpea from '../CropPredictImages/chickpea.jpg';
import coconut from '../CropPredictImages/coconut.jpg';
import coffee from '../CropPredictImages/coffee.jpg';
import cotton from '../CropPredictImages/cotton.jpg';
import grapes from '../CropPredictImages/grapes.jpg';
import jute from '../CropPredictImages/jute.jpg';
import kidneybeans from '../CropPredictImages/kidneybeans.jpg';
import lentil from '../CropPredictImages/lentil.jpg';
import maize from '../CropPredictImages/maize.jpg';
import mothbean from '../CropPredictImages/mothbean.jpg';
import mungbean from '../CropPredictImages/mungbean.jpg';
import muskmelon from '../CropPredictImages/muskmelon.jpg';
import orange from '../CropPredictImages/orange.jpg';
import papaya from '../CropPredictImages/papaya.jpg';
import pigeonpeas from '../CropPredictImages/pigeonpeas.jpg';
import pomegranate from '../CropPredictImages/pomegranate.jpg';
import rice from '../CropPredictImages/rice.jpg';
import watermelon from '../CropPredictImages/watermelon.jpg';
function CropPredictResult() {
    const { cropPredictRes } = useContext(AppContext);
    return (
        <>
            <NavbarFinal />
            <Typography sx={{ paddingTop: "40px", textAlign: "center", fontFamily: "Open Sans", fontWeight: "bold", fontSize: "30px" }}>
                Crop Prediction Result
            </Typography>
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                md={12} xs={12} sx={{ paddingTop: "40px", display: "grid", minHeight: "20vh" }}>
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justifyContent="center"
                    md={12} xs={12} sx={{ display: "grid", minHeight: "20vh", paddingBottom: "40px" }}
                >
                    {
                        cropPredictRes === 'watermelon' ? <img src={watermelon} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                            cropPredictRes === 'rice' ? <img src={rice} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                cropPredictRes === 'pomegranate' ? <img src={pomegranate} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                    cropPredictRes === 'pigeonpeas' ? <img src={pigeonpeas} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                        cropPredictRes === 'papaya' ? <img src={papaya} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                            cropPredictRes === 'orange' ? <img src={orange} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                cropPredictRes === 'muskmelon' ? <img src={muskmelon} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                    cropPredictRes === 'mungbean' ? <img src={mungbean} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                        cropPredictRes === 'mothbeans' ? <img src={mothbean} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                            cropPredictRes === 'maize' ? <img src={maize} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                cropPredictRes === 'lentil' ? <img src={lentil} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                    cropPredictRes === 'jute' ? <img src={jute} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                        cropPredictRes === 'grapes' ? <img src={grapes} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                            cropPredictRes === 'cotton' ? <img src={cotton} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                cropPredictRes === 'coffee' ? <img src={coffee} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                    cropPredictRes === 'coconut' ? <img src={coconut} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                        cropPredictRes === 'chickpea' ? <img src={chickpea} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                            cropPredictRes === 'banana' ? <img src={banana} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                                cropPredictRes === 'apple' ? <img src={apple} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                                    cropPredictRes === 'mango' ? <img src={mango} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> :
                                                                                                        cropPredictRes === 'kidneybeans' ? <img src={kidneybeans} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" /> : ""

                    }

                    <Typography sx={{ fontFamily: "Open Sans", fontWeight: "bold", fontSize: "30px" }}>{cropPredictRes}</Typography>

                </Grid>
            </Grid>

        </>
    )
}
export default CropPredictResult;