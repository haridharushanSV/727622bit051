import React, { useState } from 'react';
import NumberSelector from './NumberSelector';
import AverageDisplay from './AverageDisplay';
import { fetchAverageData } from './api';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (type) => {
    setLoading(true);
    console.log('Fetching for type:', type);

    const result = await fetchAverageData(type);
    console.log('Received result:', result);

    setData(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🧮 Average Calculator</h1>
      <NumberSelector onSelect={handleSelect} />
      {loading ? <p>Loading...</p> : <AverageDisplay data={data} />}
    </div>
  );
}

export default App;
