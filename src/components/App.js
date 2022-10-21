import React, {Component, useState, useEffect} from "react";
import '../styles/App.css';

const App = () => {
  const [workDuration,setWorkDuration] = useState(25)
  const [breakDuration,setBreakDuration] = useState(5)
  const [worksecond,setWorkSecond] = useState(1500)
  const [breaksecond,setBreakSecond] = useState(300)
  const [type,setType] = useState('work')
  const [resetFlag,setResetFlag] = useState(true)
  const [timerOn,setTimerOn] = useState(false)
 
  const displayTime = (second)=>{
    let m = parseInt(second/60).toString()
    let s = parseInt(second%60).toString()
    if(m.length === 1)
      m = '0' + m
    if(s.length === 1)
      s = '0' + s
    return m + ":" + s;
  }
  const setDuration = (e) => {
    e.preventDefault();
    setResetFlag(false)
    setType('work')
    setWorkSecond(workDuration*60)
    setBreakSecond(breakDuration*60)
  }
  const handleStart = (e) => {
    setTimerOn(true)
    setResetFlag(false)
  }
  const handleStop = (e) => {
    setTimerOn(false)
  }
  const handleReset = (e) => {
    setTimerOn(false)
    setResetFlag(true)
    setType('work')
    setWorkDuration(25)
    setBreakDuration(5)
    setBreakSecond(5*60)
    setWorkSecond(25*60)
  }
  useEffect(()=>{
    if(timerOn && type === 'work'){
      if(worksecond > 0){
        const timerId = setTimeout(()=>{
          setWorkSecond(worksecond-1)
        },1000)
        return ()=> clearTimeout(timerId)
      }
      if(worksecond === 0){
        alert("work duration is over")
        setType('break')
        setWorkSecond(workDuration*60)
      }
    }
    if(timerOn && type === 'break'){
      if(breaksecond > 0){
        const timerId = setTimeout(()=>{
          setBreakSecond(breaksecond-1)
        },1000)
        return ()=> clearTimeout(timerId)
      }
      if(breaksecond === 0){
        alert("break duration is over")
        setType('work')
        setBreakSecond(breakDuration*60)
      }
    }
  },[timerOn,type,worksecond,breaksecond])
  return (
    <div className="App">
      <div className="clock">
        <h1 className="timer">{type === 'work' ? displayTime(worksecond):displayTime(breaksecond)}</h1>
        <h3>{type === 'work' ? 'Work-Time' : 'Break-Time'}</h3>
      </div>
      <div className="control">
        <button data-testid='start-btn' onClick={handleStart} disabled={timerOn} >start</button>
        <button data-testid='stop-btn' disabled={!timerOn} onClick={handleStop}>stop</button>
        <button data-testid='reset-btn' disabled={resetFlag} onClick={handleReset} >reset</button>
      </div>
      <br />
      <div className="parameters">
        <form onSubmit={setDuration}>
          <input data-testid='work-duration'  type="number" placeholder="work duration" required value={workDuration} onChange={(e)=>setWorkDuration(e.target.value)} disabled={timerOn}  />
          <input data-testid='break-duration' type="number" placeholder="break duration" required value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)} disabled={timerOn}/>
          <button data-testid='set-btn' type="submit" disabled={timerOn}>set</button>
        </form>
      </div>
    </div>  
  )
}


export default App;
