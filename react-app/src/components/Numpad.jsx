import React from 'react';

const Numpad = ({ value, onChange }) => {
  const keys = ['1','2','3','4','5','6','7','8','9','C','0','⌫'];

  const handlePress = (key) => {
    let val = value.replace(/,/g, '');
    if (key === 'C') {
      val = '0';
    } else if (key === '⌫') {
      val = val.slice(0, -1) || '0';
    } else {
      if (val === '0') val = key;
      else if (val.length < 8) val += key;
    }
    onChange(Number(val).toLocaleString());
  };

  return (
    <div className="numpad">
      {keys.map(k => {
        let cls = 'numpad-btn';
        if (k === '⌫') cls += ' delete';
        if (k === 'C') cls += ' clear';
        return (
          <button key={k} className={cls} onClick={() => handlePress(k)}>
            {k}
          </button>
        );
      })}
    </div>
  );
};

export default Numpad;
