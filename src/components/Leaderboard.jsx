import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [leaderboardData, setleaderboardData] = useState([])
    async function getuser() {

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const response = await fetch("http://localhost:3000/api/stat/leaderboard", requestOptions).catch((error) => console.error(error))
        const json = await response.json()
        if (json) {
            setleaderboardData(json)
        }
    }
    getuser()
    return (
        <div className="mx-auto p-6 bg-slate-950 text-white min-h-[100vh]">
            <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full  shadow-md rounded">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">Rank</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Mode</th>
                            <th className="py-2 px-4">WPM</th>
                            <th className="py-2 px-4">Accuracy</th>
                            <th className="py-2 px-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboardData
                                .map(
                                    (entry, index) => (
                                        <tr key={entry._id} className="text-center border-b hover:bg-gray-100">
                                            <td className="py-2 px-4">{index + 1}</td>
                                            <td className="py-2 px-4">{entry.email}</td>
                                            <td className="py-2 px-4">{entry.stats.mode}</td>
                                            <td className="py-2 px-4">{entry.stats.wpm}</td>
                                            <td className="py-2 px-4">{entry.stats.accuracy || "N/A"}</td>
                                            <td className="py-2 px-4">{new Date(entry.date).toLocaleString()}</td>
                                        </tr>
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
