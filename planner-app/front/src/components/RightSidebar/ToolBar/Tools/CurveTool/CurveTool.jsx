import  { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { curveEndDrawArrow , drawSmoothCurve} from '../../../../../utils/canvasHelpers';
import Toolsetting from '../../ToolSettings/toolSettings'

const CurveTool = ({ isActive, type }) => {
    console.log('called Curve tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const [currentSetting, setCurrentSetting] = useState();
    const isDrawing = useRef(false);
    const points = useRef([]);
    const temporaryPoints = useRef([]);

    const settingUpdater = (data) => {
        setCurrentSetting(data); 
    }; 

    useEffect(() => {
        console.log('useEffect called twice')
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && currentSetting) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.lineWidth = currentSetting.lineWidth;
            drawingCtx.strokeStyle = currentSetting.color;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const pointStep = (x, y) => {
                if (points.current.length === 0) return true;
                const lastPoint = points.current[points.current.length - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
                return distance >= 25;
            };

            const handleMouseDown = (event) => {
                const { x, y } = getCoordinates(event, drawingCanvas);
                points.current.push({ x, y });
                isDrawing.current = true;
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                if (pointStep(x, y)) {
                    points.current.push({ x, y });
                }
                temporaryPoints.current.push({ x, y });
                clearDrawingCanvas();
                drawSmoothCurve(temporaryPoints.current, points.current, currentSetting.lineWidth, currentSetting.color, drawingCtx);
            };

            const handleMouseUp = () => {
                isDrawing.current = false;
                temporaryPoints.current = [];

                if (points.current.length > 1) {
                    const headLength = 10;
                    const lastIndex = points.current.length - 1;
                    const fromX = points.current[lastIndex - 1].x;
                    const fromY = points.current[lastIndex - 1].y;
                    const toX = points.current[lastIndex].x;
                    const toY = points.current[lastIndex].y;
                    const angle = Math.atan2(toY - fromY, toX - fromX);

                    curveEndDrawArrow(drawingCtx, fromX, fromY, toX, toY, angle, headLength, currentSetting.lineWidth, currentSetting.color);
                    const newObject = {
                        id: Date.now(),
                        type: "curve",
                        temporaryPoints: [...temporaryPoints.current],
                        points: [...points.current],
                        color: currentSetting.color,
                        lineWidth: currentSetting.lineWidth,
                        arrow: {
                            fromX,
                            fromY,
                            toX,
                            toY,
                            angle,
                            headLength,
                        },
                    };
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
                    points.current = [];
                }
                clearDrawingCanvas();
                redrawMainCanvas();
            };

            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
        currentSetting
    ]);

    return (
        <Toolsetting type={type} onSettingChange={settingUpdater} />
    );
};

export default CurveTool;
