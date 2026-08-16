import { useEffect, useState } from "react";
 
function Timer() {
  const [time, setTime] = useState(10);
  const [running, setRunning] = useState(false);
 
  useEffect(() => {
    if (!running) {
      return;
    }
 
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          setRunning(false);
          return 0;
        }
 
        return time - 1;
      });
    }, 1000);
 
    return () => {
      clearInterval(timer);
    };
  }, [running]);
 
  function startTimer() {
    setRunning(true);
  }
 
  function pauseTimer() {
    setRunning(false);
  }
 
  function resetTimer() {
    setRunning(false);
    setTime(10);
  }
 
  return {
    time,
    running,
    startTimer,
    pauseTimer,
    resetTimer
  };
}
 
export default Timer;
 