import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);


    const renderTeamSet = () =>{
        const fields = [];
        for (let i = 0; i < numberOfShips; i++){
            fields.push(
                <div key={i} className="ship-input">
                    <label>Ship {i + 1}</label> 
                    <input type="text" placeholder="Enter ship name" />
                </div>
            );
        }
        return fields;
    };

    return (
        <div className="planner-wrapper">
            <label> Set up ship type and qty</label>
            <select
                value={numberOfShips}
                onChange={(e) => setNumberOfShips(Number(e.target.value))}
                >
                <option value="0">Select one of Type</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
            </select>
        <div className="pickShipList">
        <h3>Banned Ships</h3>
            {renderTeamSet()}
        </div>
            <div className="banShipList">
                <h3>Banned Ships</h3>
            </div>
        </div>
    )
};

export default PlannerHelper;