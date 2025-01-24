import React, {useState, useContext, useCallback} from 'react';
import './toolbar.css';
import ToolbarButton from '../../shared/ToolbarButton.js';
import toolsConfig from './toolsConfig.js';
import { MapContext } from '../../contexts/MapSelectorContext';


const Toolbar = () =>  {
    const [activeToolId, setActiveTool] = useState(null); 
    const {isMapActive} = useContext(MapContext);
    
    const handleToolClick = (id) => {
            setActiveTool((prevId) => (prevId === id ? null : id));
    };

    const handleToolDeactivation = useCallback(() => {
        console.log('razmontaj')
        setActiveTool(null);
    },[]);
    
      return (  
        <div className={`toolbar ${!isMapActive ? 'blocked' : ''}`}>
            <div className="toolbar-activation-button">
                {toolsConfig.map((tool) => (
                    <ToolbarButton
                        key={tool.id}
                        className="toolbar-button"
                        id={tool.id}
                        icon={tool.icon}
                        label={tool.label}
                        isActive={activeToolId === tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        
                    />
                ))}
            </div>
            {toolsConfig.map((tool) => activeToolId === tool.id &&  (
                <tool.component
                        key={tool.id}
                        isActive={true}
                        type={tool.id}
                        onDeactivate={handleToolDeactivation}
            />
            ))}
        </div>
    );
};

export default Toolbar;