import React from 'react';
import Avatar from '@mui/material/Avatar';
const LoggedInUser = (props) => {
    return (
        <div className="LoggedInUser">
            <Avatar sx={{ width: 100, height: 100, margin:'2%' }}></Avatar>
            Logged in as {props.userName}
        </div>
    );
};

export default LoggedInUser;