import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/ShipListCard';
import { useShipContext } from '../../../../../hooks/useShipContext';

const ShipList =() =>{
  const { ships, isDataLoaded } = useShipContext();
  const [ selectedShips, setSelectedShips] = useState([]);
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);
  const { setCurrentQty } = useShipContext();

  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch all names!");
            }
            const data = await response.json();
            addShipToList(data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

 const addShipToList = (ship) => {
    setSelectedShips((prev) => [...prev, ship]);
};

const getCategoryQty = (shipId) => {
    return ships[shipId]: value;
};

useEffect(() => {
    if (shipId) fetchSelectedShips(shipId);
    const category = getCategoryQty(shipId);
      setCurrentQty((prev) => ({
        ...prev,
        [category]: (prev[category]) + 1,
      }));
}, [shipId]);

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setShipId(item._id)}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard ship={selectedShips} />
          )}
        </div>
    );
};

export default ShipList;