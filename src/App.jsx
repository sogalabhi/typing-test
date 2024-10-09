import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TypingTest from './components/TypingTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-950 text-white h-[100vh]'>
      <h1 className="text-4xl text-center py-10">Typing test</h1>
      <TypingTest/>
    </div>
  )
}

export default App
