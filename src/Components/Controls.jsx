import React, { useState } from 'react';
// import './../Styles/Controls.css';
import Config from './Config'
import Download from './Download';
const Controls = (props) => {

    const [configSettings, setConfigSettings] = useState({
        months: 3,
        parsedCompanyNames: true,
        rawEmails: false,
        q: '"thank you OR thanks"  "applying OR application OR apply"'
    });
    return (
        <div className='Controls'>
            <Config configSettings={configSettings} setConfigSettings={setConfigSettings} />
            <Download configSettings={configSettings} isLoggedIn={props.isLoggedIn} />
        </div>
    );
};

export default Controls;