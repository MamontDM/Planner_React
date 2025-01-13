import { useState } from 'react'; 
import fetchShipList from './components/ShipList/fetchShipList';

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);
    const [numberOfBans, setNumberOfBans] = useState(0);
console.log(numberOfShips);
    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
            <label> Number of ships </label>
            <select
                value={numberOfShips}
                onChange={(e) => setNumberOfShips(Number(e.target.value))}
                >
                <option value="0">Choose quantity</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
            </select>
            <label> Number of bans </label>
            <select
                value={numberOfBans}
                onChange={(e) => setNumberOfBans(Number(e.target.value))}
                >
                <option value="0">Choose quantity</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            </div>
          {numberOfShips > 0 && ( <fetchShipList 
            title="Pick List"
            numberOfItems={numberOfShips}
            placeholder="Enter ship name" 
            /> 
          )}
           {numberOfBans > 0 && (<fetchShipList 
            title="Ban List"
            numberOfItems={numberOfBans}
            placeholder="Enter ship name" 
            />
           )}            
        </div>
    );
};

export default PlannerHelper;