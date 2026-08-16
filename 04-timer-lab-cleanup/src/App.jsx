import { useEffect } from "react";
import Timer from "./Timer";
 
function App() {
  const {
    time,
    running,
    startTimer,
    pauseTimer,
    resetTimer
  } = Timer();
 
  useEffect(() => {
    document.title = `Time: ${time}`;
  }, [time]);
 
  return (
    <div className="container">
      <h1>Timer</h1>
 
      <h2>{time}</h2>
 
      <button onClick={startTimer} disabled={running || time === 0}>
        Start
      </button>
 
      <button onClick={pauseTimer} disabled={!running}>
        Pause
      </button>
 
      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}
 
export default App;