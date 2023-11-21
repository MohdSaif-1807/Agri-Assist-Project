import { React, useContext } from 'react';
import { Typography, Box, Grid, AppBar } from '@mui/material';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import AppContext from '../AppContext';
import NavbarFinal from './NavbarFinal';
function PredictDiseaseResult() {
    const { ans, tempUrl } = useContext(AppContext);
    return (
        <>
            <NavbarFinal />
            <Typography sx={{ paddingTop: "40px", textAlign: "center", fontFamily: "Open Sans", fontWeight: "bold", fontSize: "30px" }}>
                Disease Prediction Result
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
                    <img src={tempUrl} style={{ alignSelf: "center" }} width="300px" height="300px" alt="temp" />
                </Grid>
                <Box
                    md={7}
                    xs={7}
                    sx={{
                        backgroundColor: "#99F3BD",
                        textAlign: 'center'
                    }}
                >
                    <>
                        <Typography sx={{ fontFamily: 'Open Sans' }}><b>Crop:</b>{ans.Crop}</Typography>
                        <br />
                        <Typography sx={{ fontFamily: 'Open Sans' }}><b>Disease:</b>{ans.Disease}</Typography>
                        <br />
                        <Typography sx={{ fontFamily: 'Open Sans' }} >

                            <b style={{ fontFamily: "Open Sans" }}>Cause Of Disease:</b>
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
                                    return (<>{item}<br /></>)
                                })
                            }
                        </Typography>
                        <br></br>
                    </>
                </Box>
            </Grid >
        </>
    )
}
export default PredictDiseaseResult;