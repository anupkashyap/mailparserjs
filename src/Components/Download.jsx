import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import HashLoader from "react-spinners/HashLoader";
const Download = (props) => {

    const [isLoading, setLoading] = useState(false);


    const truncateString = (str) => str.length > 32500 ? str.substring(0, 32497) + "..." : str;
    const capitalizeFirstLetter = text => text.length === 0 ? text : (text.charAt(0) === text.charAt(0).toUpperCase() ? text : text.charAt(0).toUpperCase() + text.slice(1));
    const parseEmailBody = (parts) => {
        if (!parts) return "";
        if (parts.filter(x => x.mimeType === 'text/plain').length > 0) {
            return truncateString(atob(parts.filter(x => x.mimeType === 'text/plain')[0].body.data.replace(/-/g, '+').replace(/_/g, '/')));
        }
        if (parts.filter(x => x.mimeType === 'text/html').length > 0) {
            return truncateString(window.convertToPlain(atob(parts.filter(x => x.mimeType === 'text/html')[0].body.data.replace(/-/g, '+').replace(/_/g, '/')).replace(/<[^>]*>/g, '')));
        }
        return "";
    }
    const getCompanyName = (from, subject) => {
        let cleanText = '';
        if (from.toLowerCase().includes('amazon') || subject.toLowerCase().includes('amazon')) {
            return 'Amazon';
        }
        if (from.toLowerCase().includes('microsoft') || subject.toLowerCase().includes('microsoft')) {
            return 'Microsoft';
        }
        if (from.includes('lever') || from.includes('smartrecruiters') || from.includes('autoreply@talent.icims.com') || from.includes('successfactors')) {
            cleanText = from.replace(/<[^>]+>/g, '');
            const quoteRegex = /"([^"]*)"/g;
            cleanText = cleanText.replace(quoteRegex, '$1');
            cleanText = cleanText.replace(' @ icims', '')
            return cleanText;

        }

        if (from.includes('workday')) {
            if (from.includes('<')) {
                const pattern = /<([^>]+)>/;
                // Use match with the pattern to extract the desired text
                var matchResult = from.match(pattern);

                // Return the extracted text or null if no match found
                from = matchResult ? matchResult[1] : null;

            }
            if (from != null) {
                return from.split('@')[0];
            }

        }
        if (from.includes('greenhouse') || from.includes('handshake')) {
            if (subject.includes('Thank you for applying to ')) {
                return subject.replace('Thank you for applying to ', '');
            }
            if (subject.includes('Important information about your application to ')) {
                return subject.replace('Important information about your application to ', '');
            }
        }
        if (from.includes('<')) {
            cleanText = from.replace(/<[^>]+>/g, '');
            const quoteRegex = /"([^"]*)"/g;
            cleanText = cleanText.replace(quoteRegex, '$1');
            if (cleanText !== "")
                return cleanText;
        }
        if (from.includes('no-reply@')) {
            return from.replace('no-reply@', '').replace('.com', '');
        }
        if (from.includes('.tal.net')) {
            return from.replace('.tal.net', '').replace('noreply@', '');
        }
        if (from.includes('@')) {
            return from.split('@')[0];
        }
        return "";
    }
    const formatDate = dateString => (new Date(dateString)).toLocaleDateString('en-US');
    const parseData = (emailResponses, configSettings) => {

        var parsedData = emailResponses.map(emailResponse => ({
            'subject': emailResponse.payload.headers.filter(x => x.name === 'Subject')[0]?.value,
            'from': emailResponse.payload.headers.filter(x => x.name === 'From')[0]?.value,
            'date': formatDate(emailResponse.payload.headers.filter(x => x.name === 'Date')[0]?.value),
            'snippet': emailResponse.snippet,
            'companyName': capitalizeFirstLetter(getCompanyName(emailResponse.payload.headers.filter(x => x.name === 'From')[0]?.value, emailResponse.payload.headers.filter(x => x.name === 'Subject')[0]?.value)),
            'emailBody': parseEmailBody(emailResponse.payload.parts)

        }))

        parsedData = parsedData.map(obj => {
            if (!configSettings.rawEmails) {
                delete obj.emailBody;
            }
            if (!configSettings.parsedCompanyNames) {
                delete obj.companyName;
            }
            return obj;
        });
        window.convertToExcel(parsedData);
        setLoading(false);
    }

    const handleDownload = () => {

        //alert(JSON.stringify(props.configSettings))
        setLoading(true);
        window.getEmails(props.configSettings).then((emailResponses) => {
            parseData(emailResponses, props.configSettings);
        })
    }


    return (
        <div className="Download">
            {isLoading ?
                <div className="Download-spinner">
                    <HashLoader color="#cb5a4d" />
                </div>

                : ''
            }
            <Button variant="contained" endIcon={<DownloadIcon />} onClick={() => handleDownload()}
                disabled={!props.isLoggedIn}>
                Download
            </Button>
        </div>
    );
};

export default Download;