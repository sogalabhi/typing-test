import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="bg-slate-950 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-lg font-bold">Typing test</div>

                {/* Hamburger Menu for mobile */}
                <div className="lg:hidden">
                    <button onClick={toggleNavbar} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Links */}
                <div className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="lg:flex lg:space-x-4">
                        <li>
                            <Link to="/" className="text-white block px-2 py-1 hover:bg-gray-700 rounded">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/leaderboard" className="text-white block px-2 py-1 hover:bg-gray-700 rounded">
                                Leaderboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/userstats" className="text-white block px-2 py-1 hover:bg-gray-700 rounded">
                                User stats
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={() => { localStorage.removeItem('authToken'); }} className="text-white block px-2 py-1 hover:bg-gray-700 rounded">
                                Signout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}