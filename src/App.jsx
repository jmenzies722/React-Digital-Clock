import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState('24hr');

  const toggleFormat = () => {
    setFormat(format === '24hr' ? '12hr' : '24hr');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    const hours24 = time.getHours();
    let period = '';
    let hours = hours24;
    if (format === '12hr') {
      if (hours24 < 12) {
        period = 'AM';
        hours = hours24 === 0 ? 12 : hours24;
      } else {
        period = 'PM';
        hours = hours24 === 12 ? 12 : hours24 - 12;
      }
    }
    return `${hours.toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="container">
      <h1>Digital Clock</h1>
      <h2>{formatTime(time)}</h2>
      <h3>{time.toDateString()}</h3>
      <h4>{Intl.DateTimeFormat().resolvedOptions().timeZone}</h4>
      <button onClick={toggleFormat}>Switch to {format === '24hr' ? '12' : '24'} hour format</button>
    </div>
  );
};

export default App;
