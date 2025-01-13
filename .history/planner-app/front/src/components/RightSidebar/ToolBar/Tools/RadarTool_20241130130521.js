import { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';


const RadarTool = ({isActive, commonSettings, onChangeCommonSettings}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const radius = useRef(250);
    const points = useRef([]);
    const lineWidth = commonSettings.lineWidth;
    const strokeStyle = commonSettings.color;

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.lineWidth = lineWidth.current;
            drawingCtx.strokeStyle = strokeStyle.current;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                const {x , y} = getCoordinates(event, drawingCanvas);
                points.current.push({x , y});
                drawCircle(drawingCtx, x, y, radius.current, lineWidth, strokeStyle);
                
                const newObject = {
                    id: Date.now(),
                    type: "radar",
                    points: [...points.current],
                    radius: radius.current,
                    color: strokeStyle,
                    lineWidth: lineWidth,
                };
                dispatch({ type: "ADD_OBJECT", payload: newObject });
                points.current = [];
                clearDrawingCanvas();
            };
            
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            return () => {
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            }
        }
    }, [isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
    ]);

    const drawCircle = (context, x, y, radius, lineWidth, strokeStyle) => {
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();
    };
    return null;
};


export default RadarTool;