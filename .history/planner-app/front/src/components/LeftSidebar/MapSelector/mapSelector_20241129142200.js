import React, { useContext } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import maps from '../../../assets/maps.json';
import CanvasContext from '../../contexts/CanvasContext';




function MapSelector(){

    const { backgroundCanvasRef, getBackgrounCanvasContext } = useContext(CanvasContext);
    
    const handleSelect = item => {
        console.log(`Выбран элемент с iD : ${item.id}`);
    };





    return (
        <div>
            <h2>Map Selector</h2>
            <DropdownWithSearch 
                dataSource = {maps.maps}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
        </div>
    );
}

export default MapSelector;