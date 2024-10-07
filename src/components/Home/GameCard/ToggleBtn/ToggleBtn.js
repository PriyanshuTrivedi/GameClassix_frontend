// import React, { useContext, useEffect, useState } from 'react';
// import { contextData } from '../../../../AllStates';
// import './ToggleBtn.css';

// const ToggleBtn = ({game}) => {
//     const context=useContext(contextData);
//     const {isMultiplayer,setIsMultiplayer}=context;
//     useEffect(()=>{
//         const temp={...isMultiplayer};
//         Object.keys(temp).forEach(key => {
//             if (key !== game && isMultiplayer[key] === true) {
//                 ToggleBtn(key);
//             }
//         });
//     },[isMultiplayer]);
//     const [isMultiplayerMode, setIsMultiplayerMode] = useState(false);
//     const toggleMultiplayerMode=()=>{
//         const temp={...isMultiplayer};
//         temp[game]=!isMultiplayerMode;
//         setIsMultiplayer(temp);
//         setIsMultiplayerMode((mode)=>!mode);
//     }
//     return (
//         <div className={`toggleBtn ${isMultiplayerMode ? 'toggleRight' : 'toggleLeft'}`} onClick={() => toggleMultiplayerMode()}>
//             <div className="innerToggler"></div>
//         </div>
//     );
// }

// export default ToggleBtn;


import React, { useContext, useEffect, useState } from 'react';
import { contextData } from '../../../../AllStates';
import './ToggleBtn.css';

const ToggleBtn = ({ game }) => {
    const context = useContext(contextData);
    const { isMultiplayer, setIsMultiplayer } = context;

    // Initialize local state based on context
    const [isMultiplayerMode, setIsMultiplayerMode] = useState(isMultiplayer[game] || false);

    // Update local state if context changes
    useEffect(() => {
        setIsMultiplayerMode(isMultiplayer[game] || false);
    }, [isMultiplayer, game]);

    // Toggle multiplayer mode
    const toggleMultiplayerMode = () => {
        const updatedState = { ...isMultiplayer, [game]: !isMultiplayerMode };

        // Disable multiplayer mode for other games
        Object.keys(updatedState).forEach(key => {
            if (key !== game) {
                updatedState[key] = false;
            }
        });

        setIsMultiplayer(updatedState);
        setIsMultiplayerMode(!isMultiplayerMode);
    };

    return (
        <div
            className={`toggleBtn ${isMultiplayerMode ? 'toggleRight' : 'toggleLeft'}`}
            onClick={toggleMultiplayerMode}
        >
            <div className="innerToggler"></div>
        </div>
    );
};

export default ToggleBtn;
