import React from 'react';

const Weather = function (props) {

    return (
        <div className="instructions">
            <p>{props.emoji}</p>
            <p>{props.temperature}°C</p>
            <p>{props.name}</p>
        </div>
    )
}

export default Weather;