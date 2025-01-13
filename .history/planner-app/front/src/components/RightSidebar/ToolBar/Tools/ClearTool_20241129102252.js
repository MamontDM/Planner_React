import {useContext } from 'react';
import { useObject } from '../../../../hooks/useObjects';
 

const ClearTool = ({isActive})=> {
    const { dispatch } = useObject();


    useEffect (() =>  {
        if(isActive) {




            dispatch({type: "UNDO"});
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);


    return null;
};

export default ClearTool;