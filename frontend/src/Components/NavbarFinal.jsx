import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "@fontsource/open-sans";
import axios from 'axios';
import HeaderSection from './HeaderSection';
function NavbarFinal() {
    const token = window.localStorage.getItem("token");
    const [featureColor, changeFeatureColor] = useState('none');
    const [homeColor, changeHomeColor] = useState('none');
    const [aboutColor, changeAboutColor] = useState('none');
    const [contactColor, changeContactColor] = useState('none');
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === '/features') {
            changeFeatureColor('aqua');
            changeAboutColor('none');
            changeHomeColor('none');
            changeContactColor('none');
        }
        else if (location.pathname === '/') {
            changeFeatureColor('none');
            changeAboutColor('none');
            changeHomeColor('aqua');
            changeContactColor('none');
        }
        else if (location.pathname === '/aboutus') {
            changeFeatureColor('none');
            changeAboutColor('aqua');
            changeHomeColor('none');
            changeContactColor('none');
        }
        else if (location.pathname === '/contactus') {
            changeFeatureColor('none');
            changeAboutColor('none');
            changeHomeColor('none');
            changeContactColor('aqua');
        }
    }, [])
    const handleSignout = () => {
        localStorage.clear();
        axios.post('https://agri-assist-backend.onrender.com/signout')
            .then(() => {
                console.log("Successfully Log Out");
            })
            .catch((err) => {
                console.log("something went wronG!!" + err);
            })
    }

    return (
        <>
            <HeaderSection />
            <nav className="navbar navbar-expand-sm navbar-dark bg-light">
                <div className="container-fluid" style={{ textAlign: "center" }}>
                    <a className="navbar-brand" style={{ textAlign: "center", marginLeft: '50px', color: 'black' }} href="/">Agri-Assist</a>
                    <button style={{ backgroundColor: 'black' }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div style={{ alignContent: 'center', alignItems: 'center' }} className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" style={{ backgroundColor: homeColor }}>
                                <a className="nav-link" style={{ textAlign: "center", color: 'black' }} href="/">Home</a>
                            </li>

                            <li className="nav-item" style={{ backgroundColor: featureColor }}>
                                <a className="nav-link" style={{ color: 'black' }} href="/features">Features</a>
                            </li>
                            <li className="nav-item" style={{ backgroundColor: aboutColor }}>
                                <a className="nav-link" style={{ color: 'black' }} href="/aboutus">About Us</a>
                            </li>
                            <li className="nav-item" style={{ backgroundColor: contactColor }}>
                                <a className="nav-link" style={{ color: 'black' }} href="/contactus">Contact Us</a>
                            </li>
                            {token ?
                                <li className="nav-item">
                                    <a className="nav-link" style={{ color: 'black' }} onClick={handleSignout} href="/">Sign-out</a>
                                </li>
                                : ""
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavbarFinal;
