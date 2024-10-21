import React from 'react'

const StatusBtn = ({ children, btnClass, onClick }) => {
    return (
      <button className={btnClass} onClick={onClick}>
        {children}
      </button>
    );
  };
  

export default StatusBtn