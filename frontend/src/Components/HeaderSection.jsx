import React from 'react';
import "@fontsource/open-sans";

import logo from '../Images/logo.png';
function HeaderSection() {
    return (
        <div className='slide-right' style={{ marginLeft: '100px', height: '70px', alignItems: 'center' }}>
            {/* <span> */}
            {/* <span style={{ display: 'flex' }}> */}
            <img style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '30px', height: '50px', width: '50px' }} src={logo} alt="something went wrong" />
            <span style={{ fontFamily: 'Open Sans', marginLeft: '30px', fontWeight: 'bold' }}>
                AGRI ASSIST
            </span>
        </div>
    )
}
export default HeaderSection;