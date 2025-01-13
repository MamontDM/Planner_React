import React, { useEffect, useState } from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'

const ShipListCard = ({}) => {
    const { selectedShip } = useShipContext();
    return ( 
        <div>
            {selectedShip.map(({class: className, id, images, name, tier, nation}) => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;