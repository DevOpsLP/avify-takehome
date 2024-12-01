import React from 'react';

function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    const { fuel, perc } = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p style={{fontWeight: 'bold'}}>{fuel}</p>
        <hr />
        <p>{`${perc}% of energy in the UK comes directly from ${fuel}.`}</p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
