import React, { useState, useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { IconContext } from "react-icons/lib/esm";
import "./timer.css"

const Timer = () => {
  // state to store time
  const [time, setTime] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // state to check Timer running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(
        () =>
          setTime((prevTime) => {
            if (prevTime == 0) {
              return 0;
            } else {
              return time - 1;
            }
          }),
        1000
      );
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 3600);

  // Minutes calculation
  const minutes = Math.floor((time % 3600) / 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
    setInputValue("");
  };

  // Method to reset timer back 0
  const reset = () => {
    setTime(0);
    setInputValue("");
  };

  const handleChange = (e) => {
    setTime(e.target.value * 60);
    setInputValue(e.target.value);
  };

  return (
    <div className="Timer-container">
        <h3 className="heading">Enter Time</h3>
      <input
        placeholder="Enter Minutes"
        onChange={handleChange}
        value={inputValue}
        className="input-field"
      />
      <p className="Timer-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="Timer-buttons">
        <button className="Timer-button" onClick={startAndStop}>
          {isRunning ? 
          <IconContext.Provider value={{ color: "#05abcd" }}>
            <FaCircleStop className="Control-button"  />
            </IconContext.Provider> : 
            <IconContext.Provider value={{ color: "#05abcd" }}>
                <FaCirclePlay className="Control-button"/>
                </IconContext.Provider>}
        </button>
        <button className="Timer-button2" onClick={reset}>
        <IconContext.Provider value={{ color: "#05abcd" }}>
          <GrPowerReset className="Control-button"/>
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default Timer;
