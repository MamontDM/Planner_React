import React, { useEffect } from 'react';

const ShipListCard =({data, numberOfItems}) => {
    
    const [numberOfItems, setNumberOfItems] = useState([]);
    const [shipData, setShipData] = useState();


    useEffect(() => {
        console.log("data is coming", data);
        console.log("number of Items is ", numberOfItems);
    },[data, numberOfItems]);

    return null;
};


export default ShipListCard;