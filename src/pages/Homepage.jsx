import React from 'react'
import { useState, useEffect } from 'react'

import TypingTest from '../components/TypingTest'
import Stats from '../components/Stats'
import { useNavigate } from 'react-router-dom';

export default function Homepage({ user }) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log(token)
        if (!token) {
            navigate("/login");
        }
    }, [])

    const [stats, setStats] = useState([])
    const [showstats, setShowStats] = useState(false);
    return (
        < div className='bg-slate-950 text-white h-[100vh]' >
            <h1 className="text-4xl text-center py-10">Typing test</h1>
            <TypingTest stats={stats} setStats={setStats} showstats={showstats} setShowStats={setShowStats} user={user}/>
            <Stats stats={stats} showstats={showstats} user={user} />
        </div >
    )
}
