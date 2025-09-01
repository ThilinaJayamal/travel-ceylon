import React from "react";

function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "40px 0",
   

    
  };

  const barStyle = {
    width: "600%", 
    height: "10px",
    backgroundColor: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const fillStyle = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: "#ffffff", 
    transition: "width 0.3s ease-in-out",
  };

  const labelStyle = {
    fontSize: "14px",
    marginTop: "5px",
    color: "#fff",
    textAlign: "center",
  };

  return (
    <div style={wrapperStyle}>
      <div style={barStyle}>
        <div style={fillStyle}></div>
      </div>
      <p style={labelStyle}>Step {currentStep} of {totalSteps}</p>
    </div>
  );
}

export default ProgressBar;
