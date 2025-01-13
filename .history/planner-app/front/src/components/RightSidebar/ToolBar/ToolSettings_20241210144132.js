import React  from 'react';
import IconToolSettings from './Tools/IconTool/IconToolSettings';
import TextTool from './Tools/TextTool/TextTool';
import TextToolSettings from './Tools/TextTool/TextToolSettings';

const ToolSettings = ({  
    activeToolId,
    commonSettings,
    onChangeCommonSettings,
    toolSettings,
    onChangeToolSettings, }) =>{

    if (!activeToolId ) return null;
    const showCommonSettings = activeToolId !== 'battleship';

const renderSpecificSettings = () => {
    switch (activeToolId) {
        case 'battleship':
            return <IconToolSettings onChangeToolSettings={onChangeToolSettings}/>
            break;
        case 'text':
            console.log('render specific')
            return <TextToolSettings onChangeToolSettings={onChangeToolSettings}/>
            break;
        default:

            return <p>No specific settings available for this tool.</p>;
    }
};



    return (
        <div className="tool-settings">
            {showCommonSettings && (
            <div className="common-settings">
                <label>
                    Line width:
                    <input
                        type="number"
                        value={commonSettings.lineWidth}
                        onChange={(e) => onChangeCommonSettings({ lineWidth: e.target.value })}
                    />
                </label>
                <label>
                    Color:
                    <input
                        type="color"
                        value={commonSettings.color}
                        onChange={(e) => onChangeCommonSettings({ color: e.target.value })}
                    />
                </label>
            </div>
        )}
            <div className="specific-settings">
                { renderSpecificSettings() }
            </div>
    </div>
    );
};
export default ToolSettings;