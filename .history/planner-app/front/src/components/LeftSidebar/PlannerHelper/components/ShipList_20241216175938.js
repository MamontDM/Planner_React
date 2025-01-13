import React,  { useState } from 'react';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState();
    const [searchResult, setSearchresult] = useState([]);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [error, setError] = useState("");
    
    const handleSearch = async (query) => {
        if (!query) {
            setError("Enter a ship name to search.");
            return;
        }
        try {
            const response = await fetch(`/api//name-search?name=${query}`);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            setError("Failed to fetch ships. Please try again.");
        } finally {
            setLoadingIndex(null);
        }
    };

    return (
        <div className="ship-list">
            <h3>{title}</h3>
            <input
                    type="search"
                    onChange={(e) => setShipNames(e.target.value)}
                    placehodler={'Search by Name'}
             />
            {Array.from({length: numberOfItems},(_, index) => (
                <li key={index}>
                    Ships {index + 1}
                </li>
            ))}
        </div>
    );
};

export default ShipList;