import { useContext } from "react";
import { ShipContext } from "../components/contexts/ShipContext";

export const useShipContext = () => {
    const context = useContext(ShipContext);
    console.log('ShipContext in useShipContext:', context.selectedShip);
    if (!context) {
        throw new Error("useShipContext must be used within a ShipProvider");
    }
    return context;
};