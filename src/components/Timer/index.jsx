import { useState, useEffect } from "react";

function Timer({timerStarted}) {
     const [time, setTime] = useState(0);
  
    useEffect(() => {
      let intervalId;
      if (timerStarted) {
        intervalId = setInterval(() => setTime(time + 1), 1000);
      }
      return () => clearInterval(intervalId);
    }, [timerStarted, time]);
  
    // Výpočet hodin
    const hours = Math.floor(time / 3600);
  
    // Výpočet minut
    const minutes = Math.floor((time % 3600) / 60);
  
    // Výpočet sekund
    const seconds = Math.floor((time % 60) / 1); 

    return (
        <p>{hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</p>
    )

}

export default Timer