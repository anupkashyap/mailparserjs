import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
const Config = (props) => {


    const handleRadioChange = (event) => {
        props.setConfigSettings({ ...props.configSettings, months: parseInt(event.target.value) });
    }

    const handleCompanyNameToggle = (event) => {
        props.setConfigSettings({ ...props.configSettings, parsedCompanyNames: event.target.checked });
    }

    const handleRawEmailToggle = (event) => {
        props.setConfigSettings({ ...props.configSettings, rawEmails: event.target.checked });
    }

    const handleQueryChange = (event) => {
        props.setConfigSettings({ ...props.configSettings, q: event.target.value });
    }
    return (
        <div className='Config'>
            <TextField id="outlined-basic" variant="outlined" label="Custom query"
                defaultValue={'"thank you OR thanks"  "applying OR application OR apply"'}
                onChange={handleQueryChange} />
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={3}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value={1} control={<Radio />} label="1 month" />
                    <FormControlLabel value={3} control={<Radio />} label="3 months" />
                    <FormControlLabel value={6} control={<Radio />} label="6 months" />
                    <FormControlLabel value={12} control={<Radio />} label="12 months" />
                </RadioGroup>
            </FormControl>
            <div className="Controls-checkboxes">

                <div className="Controls-checkboxes">
                    <FormControlLabel control={<Checkbox defaultChecked onChange={handleCompanyNameToggle} />} label="Parsed Company Names" />
                    <FormControlLabel control={<Checkbox onChange={handleRawEmailToggle} />} label="Raw Email" />
                </div>
            </div>

        </div>
    );
};

export default Config;