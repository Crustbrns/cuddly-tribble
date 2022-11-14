import React from 'react';

const City = function (props) {
    const [forecast, setForecast] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&hourly=temperature_2m,relativehumidity_2m,surface_pressure`)
            .then(res => res.json()).then(data => { setForecast(data) });
        console.log(forecast);
    }, [forecast]);

    return (
        <div className="instructions">
            <p>⭐ {props.name}</p>
            {!forecast ? 'loading..' : <>
                <p>⏰ {new Date().toLocaleString()}</p>
                <p>💥 {forecast.hourly.surface_pressure[new Date().getHours()]} мм</p>
                <p>🌡️ {forecast.hourly.temperature_2m[new Date().getHours()]}°C</p>
                <p>⛅️ {forecast.hourly.relativehumidity_2m[new Date().getHours()]}%</p>
            </>
            }
        </div>
    )
}

export default City;