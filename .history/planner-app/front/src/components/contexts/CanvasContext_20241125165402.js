import React, { createContext, useRef, useEffect ,useState } from 'react';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);
    const drawingCanvasRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const backgroundCanvas = backgroundCanvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;

        if (canvas && backgroundCanvas && drawingCanvas) {
            const deviceScale = window.devicePixelRatio;
            setScale(deviceScale);

            [canvas, backgroundCanvas, drawingCanvas].forEach((canvasElement) => {
                canvasElement.width = 1253 * deviceScale;
                canvasElement.height = 1200 * deviceScale;
                canvasElement.style.width = "1253px";
                canvasElement.style.height = "1200px";

                const ctx = canvasElement.getContext("2d");
                ctx.scale(deviceScale, deviceScale); 
                ctx.imageSmoothingEnabled = false;
            });
            const backgroundCtx = backgroundCanvas.getContext('2d');
            backgroundCtx.fillStyle = "#000000";
            backgroundCtx.fillRect(0, 0, 1253, 1200);
        }
    }, []);

    const getCanvasContext = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = false;
        return ctx;
    };
    const getDrawingCanvasContext = () => {
        const ctx = drawingCanvasRef.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        return ctx;
    };

    const getBackgroundCanvasContext = () => backgroundCanvasRef.current?.getContext('2d');

    const clearDrawingCanvas = () => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        }
    };
    const redrawMainCanvas = () => {
        canvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawObjects(canvasRef.current, objects);
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                backgroundCanvasRef,
                drawingCanvasRef,
                getCanvasContext,
                getBackgroundCanvasContext,
                getDrawingCanvasContext,
                clearDrawingCanvas,
                redrawMainCanvas
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;