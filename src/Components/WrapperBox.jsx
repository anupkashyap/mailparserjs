import React from 'react';
import Header from './Header';
import './../Styles/WrapperBox.css';
import Main from './Main';

const WrapperBox = () => {
    return (
        <div className='wrapper_box'>
            <Header />
            <Main />
        </div>
    );
};

export default WrapperBox;