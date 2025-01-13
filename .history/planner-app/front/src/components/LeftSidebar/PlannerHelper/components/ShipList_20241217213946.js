import React,  { useState, useEffect } from 'react';
import DropdownSearch from '../../../shared/DropDownSearch';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [ships, setShips] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedShips, setSelectedShips] = useState([]);


useEffect(() => {
  const fetchAllShipsName = async () => {
    try {
      const response = await fetch('api/name-allships');
      if(!response.ok){
        throw new Error("Failed to fetch all names!");
      }
      const data = await response.json();
      setShips(data);
      console.log(data);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching ships: ', error.message);
    }
  };
  if(!isDataLoaded) fetchAllShipsName();
}, [isDataLoaded]);

useEffect(() => {
  const fetchSelectedShips = async = (id) =>{
    try {
      const response = await fetch(`api/id-search`)
    } catch (error) {
      
    }
  } 
},[selectedShips]);

    return (
        <div className="ship-list">
            <h3>{title}</h3>
          <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setSelectedShips(item._id)}
                        placeholder = {'Add ship to list...'}
                      />
          <ul>
              {Array.from({length: numberOfItems},(_, index) => (
                  <li key={index}>
                      Ships {index + 1}
                  </li>
              ))}
          </ul>
        </div>
    );
};

export default ShipList;