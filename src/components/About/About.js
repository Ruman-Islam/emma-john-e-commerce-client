import React from 'react';
import { Outlet } from 'react-router-dom';
import './About.css';

const About = () => {
    return (
        <div>
            <h1>This is About Component</h1>
            <div className='foot'>
                <Outlet />
            </div>
        </div>
    );
};

export default About;