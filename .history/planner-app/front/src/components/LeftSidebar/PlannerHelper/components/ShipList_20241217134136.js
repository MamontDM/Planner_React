import React,  { useState } from 'react';
import DropdownSearch from '../../../shared/DropDownSearch';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState('');
    const [searchResult, setSearchresult] = useState([]);
    
    const handleSearch = async (query) => {
        console.log(query)
        if (!query) {
            console.log('ops query is missing');
            return;
        }
        try {
            const response = await fetch(`/api/name-search?name=${query}`);
            if (!response.ok) {
                console.log('hel fail')
              }

       const result = await response.json();

       setSearchresult(result); 
      } catch (error) {
        console.error("Something went wrong", error.message);
      }
    };
    const onSelectedShip = (item) => {
        console.log(item);
    }

    return (
        <div className="ship-list">
            <h3>{title}</h3>
          <DropdownSearch 
                        dataSource={searchResult}
                        onSelect={(item) => onSelectedShip(item)}
                        placeholder = {`Add ship to list...`}
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