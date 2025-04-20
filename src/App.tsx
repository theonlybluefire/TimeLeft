import {useEffect, useState } from 'react'
import './App.css'

function App() {
  const [timer, setTimer] = useState<string>();
  const [goal, setGoal] = useState<string>("24:00");

  useEffect(() => {
    var local:String = String(localStorage.getItem('goal'));
    if(local != null && local != undefined) {
      setGoal(String(local));
    }
  },[])

  setInterval(() => {
    calculate();
  },1000)

  function calculate() {
    const now:Date = new Date();
    const goalTime:Date = new Date(now);
    const [hours, minutes] = goal.split(":");

    goalTime.setHours(Number(hours), Number(minutes), 0, 0);
    if (goalTime <= now) {
      goalTime.setDate(goalTime.getDate() + 1);
    }

    const diff = goalTime.getTime() - now.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diff / 1000) % 60);

    setTimer(diffHours+":"+diffMinutes+":"+diffSeconds);
  }

  function inputChange(e:React.ChangeEvent<HTMLInputElement>) {
    setGoal(e.target.value);
    localStorage.setItem('goal',goal);
    console
    calculate();
  }

  return (
    <>
      <div style={{alignContent:'center'}}>
        <h1  style={{fontSize:'100px'}} >{timer}</h1>
        <p className='spectral-regular'>Time left till</p>
        <input type="time" value={goal} onChange={inputChange} />
      </div>
    </>
  )
}

export default App
