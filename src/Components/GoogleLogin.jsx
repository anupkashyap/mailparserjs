import React, { useState } from 'react';

import GoogleButton from 'react-google-button'
import LoggedInUser from './LoggedInUser';

const GoogleLogin = (props) => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [loggedInAs, setUser] = useState('');

    const handleClick = () => {
        window.handleAuthClick().then(res => {
            if (res) {
                setUserLoggedIn(true);
                props.setLoggedIn(true);
                setUser(res.result.emailAddress)

            }
        });
    }

    return (
        <div className="GoogleLogin">
            {!isUserLoggedIn ?
                <GoogleButton
                    onClick={() => { handleClick() }}

                /> : <LoggedInUser userName={loggedInAs} />}

        </div>
    );
};

export default GoogleLogin;