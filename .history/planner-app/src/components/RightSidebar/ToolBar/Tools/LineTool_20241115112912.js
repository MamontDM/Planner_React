import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates, createObject } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';


const LineTool = ({isActive}) => {

    const { canvasRef } = useContext(CanvasContext); 
    const { dispatch } = useObjects();
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    useEffect(() => {
        if (isActive && canvasRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
            contextRef.current.lineWidth = 2;
            contextRef.current.strokeStyle = '#fff234';
            contextRef.current.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.push({x , y});
                contextRef.current.beginPath();
                contextRef.current.moveTo(x , y);
                
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.push({x , y});
                contextRef.current.lineTo(x , y);
                contextRef.current.stroke();
            };

            const handleMouseUp = () => {
                if (isDrawing.current) {
                    isDrawing.current = false;
                    contextRef.current.closePath();
                    const newObject = {
                        type: 'line',
                        points: [...pointRef.current],
                        color: contextRef.current.strokeStyle,
                        linewidth: contextRef.current.lineWidth
                    };
                    dispatch({type: 'ADD_OBJECT', payload: newObject});
                }
            };

            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            canvasRef.current.addEventListener('mousemove', handleMouseMove);
            canvasRef.current.addEventListener('mouseup', handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                canvasRef.current.removeEventListener('mouseup', handleMouseUp);
                contextRef.current.canvas.style.cursor = 'default';
            };
        }
    }, [isActive, canvasRef]);



    return null;
};
export default LineTool;