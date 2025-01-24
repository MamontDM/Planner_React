import  { useEffect, useRef, useContext, useState} from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import ToolSettings from '../../ToolSettings/toolSettings';
import { useSettingContext } from '../../../../../hooks/useSettingContext'


const LineTool = ({isActive, type}) => {
    console.log('called Line tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const [currentSetting, setCurrentSetting] = useState();
    const { dispatch } = useObjects();
    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    const settingUpdater = (data) => {
        setCurrentSetting(data); 
    };    


    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && currentSetting) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.lineWidth = currentSetting.lineWidth;
            drawingCtx.strokeStyle = currentSetting.color;


            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = [];
                const { x, y } = getCoordinates(event, drawingCanvas);
                console.log(x , y)
                pointRef.current.push({x , y});
                drawingCtx.beginPath();
                drawingCtx.moveTo(x , y);
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.push({x , y});
                drawingCtx.lineTo( Math.round(x), Math.round(y));
                drawingCtx.stroke();
            };

            const handleMouseUp = () => {
                if (isDrawing.current) {
                    isDrawing.current = false;
                    drawingCtx.closePath();

                    const newObject = {
                        id: Date.now(),
                        type: 'line',
                        points: [...pointRef.current],
                        lineWidth: currentSetting.lineWidth,
                        color: currentSetting.color,
                    };
                    console.log(newObject)
                    dispatch({type: 'ADD_OBJECT', payload: newObject});
                }
                clearDrawingCanvas();
            };

            drawingCanvas.addEventListener('mousedown', handleMouseDown);
            drawingCanvas.addEventListener('mousemove', handleMouseMove);
            drawingCanvas.addEventListener('mouseup', handleMouseUp);

            return () => {
                drawingCanvas.removeEventListener('mousedown', handleMouseDown);
                drawingCanvas.removeEventListener('mousemove', handleMouseMove);
                drawingCanvas.removeEventListener('mouseup', handleMouseUp);
                drawingCanvas.style.cursor = 'default';
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas, currentSetting, dispatch]);

    return (
        <ToolSettings type={type} onSettingChange={settingUpdater} />
    );
};
export default LineTool;