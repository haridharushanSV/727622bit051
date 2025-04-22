import React from 'react';

const NumberSelector = ({ onSelect }) => {
  const types = ['p', 'f', 'e', 'r'];

  return (
    <div className="selector">
      {types.map(type => (
        <button key={type} onClick={() => onSelect(type)}>
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default NumberSelector;
