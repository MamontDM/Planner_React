import React, { useContext, useState } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import CanvasContext from '../../contexts/CanvasContext';
import { Archipelago, Atlantic, BigRace, Estuary, FaroeIsland, Greece, Haven, Hotspot, IslandofIce, 
    LandofFire, Loop, MountainRange, Neighbors, NewDawn, North, NorthernWaters, Ring, Riposte, SeaofFortune,
    Shards, Shatter, SleepingGiant, TearsofDragon, Trap, Trident, WarriorPath, ZoneCrashAlpha} from '../../../assets/exportMaps';

function MapSelector(){

    const [mapList, setmaplist] = useState([]);

    const mapsName = {
    'Archipelago'     : Archipelago,
    'Atlantic'        : Atlantic,
    'Big Race'        : BigRace,
    'Estuary'         : Estuary,
    'Faroe Island'    : FaroeIsland,
    'Greece'          : Greece,
    'Haven'           : Haven,
    'Hotspot'         : Hotspot,
    'Island of Ice'   : IslandofIce,
    'Land of Fire'    : LandofFire,
    'Loop'            : Loop,
    'MountainRange'   : MountainRange,
    'Neighbors'       : Neighbors,
    'New Dawn'        : NewDawn,
    'North'           : North,
    'Northern Waters' : NorthernWaters,
    'Ring'            : Ring,
    'Riposte'         : Riposte,
    'Sea of Fortune'  : SeaofFortune,
    'Shards'          : Shards,
    'Shatte'          : Shatter,
    'Sleeping Giant'  : SleepingGiant,
    'Tears of Dragon' : TearsofDragon,
    'Trap'            : Trap,
    'Triden'          : Trident,
    'Warrior Path'    : WarriorPath,
    'Zone Crash Alpha': ZoneCrashAlpha
    };
        useEffect(() => {
            setmaplist(item.name);
            renderMapList(item.name);
        },[])


    const { backgroundCanvasRef, clearBackground } = useContext(CanvasContext);
    const mapListArray = Object.entries(mapsName).map(([name, value]) => ({
        name,
        value,
    }));


    const handleSelect = (item) => {
        const backCanvas = backgroundCanvasRef.current;
        const selectedImage = item.value;
        if (selectedImage) {
            backCanvas.style.backgroundImage = `url(${selectedImage})`;
            backCanvas.style.backgroundSize = 'cover';
            backCanvas.style.backgroundRepeat = 'no-repeat';
        } else {
            console.error(`Изображение для карты "${item}" не найдено.`);
        }
    };
    const handleClearMap = () =>{
        clearBackground();
    }

    return (
        <div>
            <h2>Map Selector</h2>
            <DropdownWithSearch 
                dataSource = {mapListArray}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
                <button 
                    className="clearMap-button"
                    onClick={handleClearMap}
                >Clear map</button>
            <div className="mapselector-list">
            </div>
        </div>
    );
}

export default MapSelector;