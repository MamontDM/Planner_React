import React, { createContext, useRef, useEffect } from 'react';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);
    const drawingCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const backgroundCanvas = backgroundCanvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;

        if (canvas && backgroundCanvas && drawingCanvas) {
            const scale = window.devicePixelRatio;

            canvas.width = 1253 * scale;
            canvas.height = 1200 * scale;

            backgroundCanvas.width = 1253 * scale;
            backgroundCanvas.height = 1200 * scale;
            const backgroundCtx = backgroundCanvas.getContext('2d');
            backgroundCtx.fillStyle = '#f0f0f0';
            backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

            drawingCanvas.width = 1253 * scale;
            drawingCanvas.height = 1200 * scale;
            const drawingCtx = drawingCanvas.getContext('2d');
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        }
    }, []);

    const getCanvasContext = () => canvasRef.current?.getContext('2d');
    const getBackgroundCanvasContext = () => backgroundCanvasRef.current?.getContext('2d');
    const getVirtualCanvasContext = () => virtualCanvasRef.current?.getContext('2d');
    const clearDrawingCanvas = () => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        }
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                backgroundCanvasRef,
                virtualCanvasRef,
                getCanvasContext,
                getBackgroundCanvasContext,
                getVirtualCanvasContext,
                clearVirtualCanvas,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;