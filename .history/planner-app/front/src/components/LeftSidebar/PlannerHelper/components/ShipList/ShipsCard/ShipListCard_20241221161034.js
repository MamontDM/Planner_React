import React, { useEffect, useState } from 'react';

const ShipListCard = ({ship}) => {
    const name = ship.name;
    console.log(name);
    return ( 
        <div className="shpi-list-item">
            {name} {tier}
        </div>
    )
};


export default ShipListCard;