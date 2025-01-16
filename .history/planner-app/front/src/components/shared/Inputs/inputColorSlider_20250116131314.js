import React, {useState} from 'react';

const GradiendColorInput = () => {
    const [Color, setColor] = useState('rgb(255, 0, 0)');
    const gradientColors = [
        { r: 255, g: 0, b: 0 },
        { r: 255, g: 255, b: 0 }, 
        { r: 0, g: 255, b: 0 },  
        { r: 0, g: 0, b: 255 } 
    ]

    const calculateColor = (value) => {

        const section = Math.floor((value / 100) * (gradientColors.length -1));
        const percentage = (value / 100) * (gradientColors.length - 1) - section;
        const start = gradientColors[section];
        const end = gradientColors[section + 1];


        const r = Math.round(start.r + (end.r - start.r) * percentage);
        const g = Math.round(start.g + (end.g - start.g) * percentage);
        const b = Math.round(start.b + (end.b - start.b) * percentage);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        const newColor = calculateColor(value);
        setColor(newColor); 
    }

    return ( 
        <div className="gradient-input">
            <input
                type="range"
                min="0"
                max="100"
                value="50"
                onChange={(e) => calculateColor(e.target.value)}
            />

        </div>

    )
};

default export GradiendColorInput;