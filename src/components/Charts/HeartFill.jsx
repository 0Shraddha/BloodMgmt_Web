import React from "react";

const HeartFill = ({ percentage, bloodType }) => {
  // Calculate the dynamic height for the fill
  const fillHeight = 100 - percentage; // Reverse because 0% starts at the top

  return (
    <svg viewBox="0 0 100 100" width="55" height="55">
      <defs>
        <linearGradient id="bloodFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C3283B" /> {/* Red for blood */}
        </linearGradient>
        <clipPath id="heartClip">
          <path d="M50 90 L10 50 A20 20 0 1 1 50 10 A20 20 0 1 1 90 50 Z"></path>
        </clipPath>
      </defs>
      {/* Background Heart Outline */}
      <path
        d="M50 90 L10 50 A20 20 0 1 1 50 10 A20 20 0 1 1 90 50 Z"
        stroke="#fff" // Border color
        strokeWidth="2"
        fill="none"
      />
      {/* Dynamic Fill */}
      <rect
        x="0"
        y={`${fillHeight}%`}
        width="100"
        height="100"
        fill="url(#bloodFill)"
        clipPath="url(#heartClip)"
      >
        <animate
          attributeName="y"
          from="100%"
          to={`${fillHeight}%`}
          dur="1s"
          fill="freeze"
        />
      </rect>
      {/* Heart Outline */}
      <path
        d="M50 90 L10 50 A20 20 0 1 1 50 10 A20 20 0 1 1 90 50 Z"
        stroke="#c6c9d0" // Border color
        strokeWidth="2"
        fill="none"
      />
      {/* Percentage Text */}
      <text
        x="50%"
        y="35%"
        textAnchor="middle"
        fill="#c6c9d0" // Percentage text color
        fontSize="24"
        fontFamily="Arial"
        dy=".3em"
      >
        {percentage}%
      </text>
      {/* Blood Type Text */}
      <text
        x="50%"
        y="65%" // Position the blood type text lower
        textAnchor="middle"
        fill="#333" // Color for blood type text
        fontSize="20"
        fontFamily="Arial"
        dy=".3em"
      >
        {bloodType} {/* Display blood type */}
      </text>
    </svg>
  );
};

export default HeartFill;
