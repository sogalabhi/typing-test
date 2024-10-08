import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TypingTest from './components/TypingTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-4xl text-center my-10">Typing test</h1>
      <TypingTest/>
    </>
  )
}

export default App
