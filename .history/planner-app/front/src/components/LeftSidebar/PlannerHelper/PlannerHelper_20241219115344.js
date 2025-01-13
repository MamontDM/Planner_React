import { useState } from 'react'; 
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../assets/exportIcon';

const PlannerHelper = () =>{
    const [config, setConfig] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const [limitation, setLimitation] = useState([]);
    
    const shipTypes =  [
        {id: 1, label: 'SuperShips',  icon: IconSuper_ship, title: 'SB'},
        {id: 2, label: 'Destroyers' , icon: IconDestroyer, title: 'DD'},
        {id: 3, label: 'Cruisers',    icon: IconCruiser, title: 'BC' }, 
        {id: 4, label: 'Battleships', icon: IconBattleship, title: 'BB' },
        {id: 5, label: 'Submarines',  icon: IconSubmarine, title: 'SM'},
        {id: 6, label: 'Aircraft Carriers',    icon: IconAircraft_carrier, title: 'CV'},
    ];

    const handleInputChange = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const hadnleIsComplete = () => { 
        setIsComplete(true);
    };

    const addLimitation = () => {
        console.log('called');
        if(limitation.length === 0 || limitation.every((lim) => lim.value.trim() !== '')){
            console.log('called 2');
            setLimitation([...limitation, {id: Date.now(), value: ''}]);
        }else{
            alert('Заполните все существующие ограничения перед добавлением нового.');
        }
    };

    const handleLimitationChange = (id, value) => {
        setLimitation((prev) => 
        prev.map((lim) => (lim.id === id ? {...lim, value} : lim))
     );
    };

    return ( 
        <div className="planner-wrapper">
            <div className="planner-sidebar">
                {!isComplete ? (
                    <>
                    <h3>Configure limitation</h3>
                    {shipTypes.map((type) => (
                            <div key={type.id} className="config-shipType-box">
                                    <img className="config-icon" src={type.icon} alt={type.label} />
                                    <h3>{type.title}</h3>
                                    <input
                                        className="config-input"
                                        type="number"
                                        value={config[type.label]}
                                        placeholder={'Qty . . .'}
                                        onChange={(e) => handleInputChange(type.label, e.target.value)}
                                    />
                            </div>
                    ))}
                <h3>Special ship types limitation</h3>
                <button onClick={addLimitation}>Add condition</button>
                    {limitation.length > 0 ? (
                    limitation.map=((limitation) => (
                        <div key={limitation.id} className="limitation-box">
                            <input
                                type="text"
                                value={limitation.value}
                                placeholder="Enter new limitation..."
                                onChange={(e) => handleLimitationChange(limitation.id, e.target.value)}
                            
                            />
                        </div>
                    ))
                ): null}
                <button onClick={hadnleIsComplete}>Complete</button>
                     </>
                ) : ( 
                    <div className="config-summary">
                        <h3>Configuration Summary</h3>
                        {Object.entries(config).map(([key, value]) => (
                            <div key={key}>
                                <p>
                                    <strong>{key}:</strong> {value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )



};

export default PlannerHelper;