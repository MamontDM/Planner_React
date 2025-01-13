import React, { useEffect, useState } from 'react';

const ShipListCard = ({ selectedShip }) => {

    const {name, tier, nation, class: shipClass} = selectedShip;

    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;