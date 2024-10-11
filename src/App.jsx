import { useState } from 'react'
import './App.css'
import TypingTest from './components/TypingTest'
import Stats from './components/Stats'

function App() {
  const [stats, setStats] = useState([])
  const [showstats, setShowStats] = useState(false);

  return (
    <div className='bg-slate-950 text-white h-[100vh]'>
      <h1 className="text-4xl text-center py-10">Typing test</h1>
      <TypingTest stats={stats} setStats={setStats} showstats={showstats} setShowStats={setShowStats} />
      <Stats stats={stats} showstats={showstats} />
    </div>
  )
}

export default App
