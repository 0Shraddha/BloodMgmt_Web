import React, { useState } from 'react';
import '../../Styles/Input.scss';

const Input = ({ label, textarea, select, options = [], type, ...props }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [bloodInput, setBloodInput ] = useState(false);

  const handleBtnClick = (value) => {
    setSelectedValue(value);
    setBloodInput(true);
    console.log("clicked!")
  };

  let bloodInputContainer;
    if(bloodInput){
        bloodInputContainer = <div className="row d-flex p-3 mt-3 bg-light"> 
                                <div className="col-6">
                                <Input label={`Units ( For ${selectedValue})`} type="number" id="units" name={`blood-unit-${selectedValue}`} placeholder={`Enter the units for ${selectedValue} `} />
                                </div>
                                <div className="col-6 text-center text-muted">
                                  <p>[ <strong>1 Units</strong> euquivalent to <strong>4/5 l </strong>]</p>
                                </div>
                                 </div>;
    }else{
        bloodInputContainer = "";
    }

  return (
    <div>
      <div>
        <label className="form-label">{label}</label>
        {textarea ? (
          <textarea className='textarea form-control' {...props} />
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
            <div>{bloodInputContainer}</div>
          </div>
        ) : (
          <input className="input form-control" type={type} {...props} />
        )}
      </div>
    </div>
  );
};

export default Input;
