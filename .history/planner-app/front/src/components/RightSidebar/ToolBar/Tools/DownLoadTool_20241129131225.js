import React, { useContext, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import CanvasContext from '../../../contexts/CanvasContext';

const DownLoadTool = ({onDeactivate, isActive}) => {

    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext } = useContext(CanvasContext);
    const fileName = useRef('planner-app'); 
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);


    useEffect(() => {
        if (isActive) {
            setShouldRender(true);
            setTimeout (() => setIsVisible(true), 10);
        } else {
            setShouldRender(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isActive]);

  

    const handleSetName = (value) => {
        if(value){
            fileName.current = value;
        }
    };

    const handleDownload = () => {
        mergeCanvases();
        if(onDeactivate) onDeactivate();   
    };

    const mergeCanvases = () => {
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef.current, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef.current, 0, 0);
        downloadCanvas(fileName.current, drawingCanvasRef.current);
    }

    const downloadCanvas = (fileName, mergedCanvas) => {
        const link = document.createElement('a');
        link.href = mergedCanvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
    }


    if (!isActive) return null;

    
    return ReactDOM.createPortal(
        <div className={`modal-overlay ${isVisible ? 'show' : ''}`} 
             onClick={onDeactivate}>
            <div className="modal-content"
            onClick={(e) => e.stopPropagation()}
            >
                <label>
                    <h2>Download and Share</h2>
                </label>
                <input
                    type="text"
                    onChange={(e) => handleSetName(e.target.value)}
                    placeholder="Type a file name..."   
                />
                <button 
                    className="saveModal-button-save"
                    onClick={handleDownload}
                >
                    Save
                </button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default DownLoadTool;