import React, { useState } from 'react';
import './Input.scss';

const Input = ({ label, textarea, select, options = [], type, ...props }) => {
  const [selectedValue, setSelectedValue] = useState('A+');

  const handleBtnClick = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <p>
        <label className="form-label">{label}</label>
        {textarea ? (
          <textarea {...props} />
        ) : select ? (
          <div>
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleBtnClick(option.value)}
                className={`btn-sm button ${selectedValue === option.value ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
            {/* Hidden input to capture selected value */}
            <input  type="hidden" name={props.name} value={selectedValue} readOnly />
          </div>
        ) : (
          <input className="input form-control" type={type} {...props} />
        )}
      </p>
    </div>
  );
};

export default Input;
