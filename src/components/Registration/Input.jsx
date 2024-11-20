import React, { useState } from 'react';
import '../../Styles/Input.scss';
import { toast, ToastContainer } from 'react-toastify';

const Input = ({ label, textarea, select, options = [], type, error, onClearError, ...props }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [bloodInput, setBloodInput] = useState(false);

  const handleBtnClick = (value) => {
    setSelectedValue(value);
    setBloodInput(true);
  };

  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
      toast.warn("Must be a number");
    }
  };

  return (
    <div>
      <div>
        <label className="form-label">{label}</label>
        {textarea ? (
          <textarea
            className='textarea form-control'
            {...props}
            onFocus={onClearError} // Clear error on focus
          />
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
            <input type="hidden" name={props.name} value={selectedValue} readOnly />
          </div>
        ) : (
          <input
            className="input form-control"
            type={type}
            onKeyDown={type === "number" ? handleKeyDown : undefined}
            {...props}
            onFocus={onClearError} // Clear error on focus
          />
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
