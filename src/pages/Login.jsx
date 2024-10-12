import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in both fields');
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);
        const body = {
            name,
            email,
            password
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(body);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const response = await fetch("http://localhost:3000/api/auth/login", requestOptions).catch((error) => console.error(error));
        const json = await response.json()
        console.log(json)
        if (json.token) {
            localStorage.setItem('authToken', json.token);
            console.log(json.token)
            navigate("/");
        }
        else {
            seterror(json.error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <p>{error}</p>
                    <div className="flex flex-col items-center justify-between">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-indigo-600"
                        >
                            Log In
                        </button>
                        <Link to="/register"
                            className=" font-bold py-2 px-4 rounded"
                        >
                            Create an account
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
}