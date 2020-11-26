import USCongressionalDistricts from './components/USCongressionalDistricts';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React+D3: US Congressional Districts Map</h1>
      <svg width="100vw" height="100vh">
        <USCongressionalDistricts width={1000} height={700} />
      </svg>
      
    </div>
  );
}

export default App;
