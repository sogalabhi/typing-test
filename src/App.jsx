import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/NavBar'
import { useEffect, useState } from 'react'
import Leaderboard from './pages/Leaderboard'
import UserStats from './pages/UserStats'

function App() {

  const [user, setuser] = useState()
  useEffect(() => {
    async function getuser() {

      const token = localStorage.getItem('authToken');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", " application/json");
      myHeaders.append("auth-token", token);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:3000/api/stat/getuser", requestOptions).catch((error) => console.error(error))
      const json = await response.json()
      if (json) {
        setuser(json)
      }
    }
    getuser()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<><Navbar /><Homepage user={user} /></>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="leaderboard" element={<><Navbar /><Leaderboard user={user} /></>} />
        <Route path="userstats" element={<><Navbar /><UserStats user={user} /></>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
