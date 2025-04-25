import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [timer, setTimer] = useState<string>();
  const goal = useRef<string>("24:00");

  useEffect(() => {
    var local: String = String(localStorage.getItem('goal'));
    if (local != null && local != undefined) {
      goal.current = String(local);

    }
  }, [])

  setInterval(() => {
    calculate();
  }, 1000)

  function calculate() {
    const now: Date = new Date();
    const goalTime: Date = new Date(now);
    const [hours, minutes] = goal.current.split(":");

    goalTime.setHours(Number(hours), Number(minutes), 0, 0);
    if (goalTime <= now) {
      goalTime.setDate(goalTime.getDate() + 1);
    }

    const diff = goalTime.getTime() - now.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diff / 1000) % 60);

    setTimer(diffHours + ":" + diffMinutes + ":" + diffSeconds);
  }

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    goal.current = e.target.value;
    localStorage.setItem('goal', goal.current);
    console
    calculate();
  }

  return (
    <>
      <div
        className='blur'
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',      // Vertikale Zentrierung
          justifyContent: 'center'   // Horizontale Zentrierung
        }}
      >
        <div>
          <h1 style={{ fontSize: '10vw' }}>{timer}</h1>
          <p className='spectral-regular'>Time left till</p>
          <input type="time" value={goal.current} onChange={inputChange} />
        </div>
      </div>

    </>
  )
}

export default App
