import React, { useEffect, useState } from 'react';
import gbjlogo from '../../assets/logo.png';
import './SplashScreen.css';

const SplashScreen = ({ onAnimationEnd }) => {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        // Ensure onAnimationEnd is a valid function before using it
        if (typeof onAnimationEnd !== 'function') {
            console.error('onAnimationEnd is not a function');
            return;
        }

        const timer1 = setTimeout(() => setAnimationStage(1), 1000); // Start shrinking
        const timer2 = setTimeout(() => setAnimationStage(2), 2000); // Start moving and fading
        const timer3 = setTimeout(() => onAnimationEnd(), 3000); // End animation

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onAnimationEnd]);

    return (
        <div className={`splash-screen stage-${animationStage}`}>
            <img src={gbjlogo} alt="GBJ Buzz Logo" className="splash-logo" />
        </div>
    );
};

export default SplashScreen;
