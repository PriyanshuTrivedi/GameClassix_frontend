import React from 'react';
import './Player.css'

const Player = ({ PlayerName, isCurrentPlayer }) => {
    return (
        <div className="playerName_chance">
            <div className='playerName'>{PlayerName}</div>
            <div
                style={{ visibility: isCurrentPlayer ? 'visible' : 'hidden' }}
                className="playerChance"
            ></div>
        </div>
    );
};

export default Player;

