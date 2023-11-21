import logo from './logo.svg';
import { useContext, useState } from 'react';
import './App.css';
import VegeList from './Components/VegeList';
import PostItems from './Components/PostItems';
import { Routes, Route } from "react-router-dom";
import MarketPlace from './Components/MarketPlace';
import NavbarFinal from './Components/NavbarFinal';
import Feed from './Components/Feed';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Features from './Components/Features';
import PredictDisease from './Components/PredictDisease';
import CropPredict from './Components/CropPredict';
import CropRelatedIssues from './Components/CropRelatedIssues';
import MyHome from './Components/MyHome';
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';
import { Nav } from 'react-bootstrap';
import EmptyPage from './Components/EmptyPage';
import AppContext from './AppContext';
import PredictDiseaseResult from './Components/PredictDiseaseResult';
import CropPredictResult from './Components/CropPredictResult';
function App() {
  const [tempUrl, setTempUrl] = useState('tp');
  const [cropPredictRes, setCropPredictRes] = useState('');
  const [ans, setAns] = useState({
    Crop: "",
    Disease: "",
    Cause_of_disease: [],
    How_to_prevent_OR_cure_the_disease: []
  })

  return (
    <>
      <AppContext.Provider value={{ tempUrl, setTempUrl, ans, setAns, cropPredictRes, setCropPredictRes }}>
        <Routes>
          <Route path="/navbar" element={<NavbarFinal />} />
          <Route path="/" element={<MyHome />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/marketplace" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/predict-disease" element={<PredictDisease />} />
          <Route path="crop-predict" element={<CropPredict />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/crop-related-issues' element={<CropRelatedIssues />} />
          <Route path='/predict-disease-result' element={<PredictDiseaseResult />} />
          <Route path="/crop-predict-result" element={<CropPredictResult />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}
export default App;
