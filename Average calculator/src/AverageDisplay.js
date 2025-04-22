import React from 'react';

const AverageDisplay = ({ data }) => {
  if (!data) return <p>No data yet. Try selecting a number type!</p>;

  return (
    <div className="results">
      <h2>Average: {data.avg}</h2>
      <p><strong>Previous Window:</strong> {JSON.stringify(data.windowPrevState)}</p>
      <p><strong>Current Window:</strong> {JSON.stringify(data.windowCurrState)}</p>
      <p><strong>Numbers Received:</strong> {JSON.stringify(data.numbers)}</p>
    </div>
  );
};

export default AverageDisplay;
