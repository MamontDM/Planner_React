import React, {useState} from 'react';
import './inputColorSlider.css';


const GradiendColorInput = () => {
    const [color, setColor] = useState('rgb(135, 255, 0)');
    const [sliderValue, setSliderValue] = useState(50);

    const gradientColors = [
        { r: 255, g: 0, b: 0 },
        { r: 255, g: 255, b: 0 }, 
        { r: 0, g: 255, b: 0 },  
        { r: 0, g: 0, b: 255 } 
    ]

    const calculateColor = (value) => {
        const maxIndex = gradientColors.length -1;

        const section = Math.min(Math.floor((value / 100) * maxIndex), maxIndex - 1);
        
        const percentage = (value / 100) * maxIndex - section;
        
        const start = gradientColors[section];
        
        const end = gradientColors[section + 1];


        const r = Math.round(start.r + (end.r - start.r) * percentage);
        const g = Math.round(start.g + (end.g - start.g) * percentage);
        const b = Math.round(start.b + (end.b - start.b) * percentage);
        

        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);
        const newColor = calculateColor(newValue);
        setColor(newColor); 
    }

    return ( 
        <div className="gradient-section">
            <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                style={{backgroundColor: color,

                }}
            />
        </div>
    )
};

export default GradiendColorInput;