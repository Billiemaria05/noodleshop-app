import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const Numpad = ({ value, onChange }) => {
  const keys = ['1','2','3','4','5','6','7','8','9','C','0','BACK'];

  const handlePress = (key) => {
    let val = value.replace(/,/g, '');
    if (key === 'C') {
      val = '0';
    } else if (key === 'BACK') {
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
        let content = k;

        if (k === 'BACK') {
          cls += ' delete';
          content = <Delete size={28} strokeWidth={2.4} />;
        } else if (k === 'C') {
          cls += ' clear';
          content = 'C';
        }

        return (
          <button
            key={k}
            type="button"
            className={cls}
            onClick={() => handlePress(k)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default Numpad;
