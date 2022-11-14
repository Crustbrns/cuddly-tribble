import logo from './logo.svg';
import './App.css';
import Instructions from './Instructions';
import Weather from './Weather';
import City from './City';

const displayEmojiName = event => alert(event.target.id);
const emojis = [
  {
    emoji: '😀',
    name: "test grinning face"
  },
  {
    emoji: '🎉',
    name: "party popper"
  },
  {
    emoji: '💃',
    name: "woman dancing"
  }
];

const weather = [
  {
    emoji: '☀️',
    temperature: 10.5,
    name: "Sunny"
  },
  {
    emoji: '☁️',
    temperature: 3.5,
    name: "Cloudy"
  },
  {
    emoji: '☀️',
    temperature: 6,
    name: "Sunny"
  },
  {
    emoji: '🌧️',
    temperature: 1.2,
    name: "Rainy"
  },
  {
    emoji: '☁️',
    temperature: 5.1,
    name: "Cloudy"
  }
];

const cities = [
  {
    name: 'Berlin',
    latitude: 52.52,
    longitude: 13.419998
  },
  {
    name: 'Dnipro',
    latitude: 48.28,
    longitude: 35.01
  },
  {
    name: 'Kyjv',
    latitude: 50.31,
    longitude: 31.44
  },
  {
    name: 'Kharkiv',
    latitude: 50.00,
    longitude: 36.10
  },
  {
    name: 'Kherson',
    latitude: 49.83,
    longitude: 24.02
  },
]

function App() {
  const greeting = "greeting";
  const displayAction = false;

  return (
    <div className="container">
      <h1 id={greeting}>Hello, World</h1>
      {displayAction && <p>I am writing JSX</p>}
      <Instructions />
      <ul>
        {
          emojis.map(emoji => (
            <li key={emoji.name}>
              <button
                onClick={displayEmojiName}
              >
                <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
              </button>
            </li>
          ))
        }
      </ul>
      <ul>
        {
          weather.map(weather => (
            <li key={`${weather.temperature}${weather.emoji}`}>
              <Weather emoji={weather.emoji} name={weather.name} temperature={weather.temperature} />
            </li> 
          ))
        }
      </ul>
      <ul>
        {
          cities.map(city => (
            <li key={`${city.name}${city.latitude}`}>
              <City name={city.name} latitude={city.latitude} longitude={city.longitude} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App;
