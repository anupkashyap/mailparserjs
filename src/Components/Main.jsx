import React, { useState } from 'react';
import './../Styles/Main.css';
import GoogleLogin from './GoogleLogin';
import Controls from './Controls';
const Main = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <div className='Main'>
            <GoogleLogin setLoggedIn={setLoggedIn} />
            <Controls isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default Main;