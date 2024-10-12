import React, { useEffect } from 'react';

const UserStats = ({ user }) => {
    return (
        <div className="mx-auto p-6 bg-slate-950 text-white min-h-[100vh]">
            <h1 className="text-3xl font-bold text-center mb-6">UserStats</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full shadow-md rounded">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">Sl no</th>
                            <th className="py-2 px-4">Mode</th>
                            <th className="py-2 px-4">WPM</th>
                            <th className="py-2 px-4">Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.statsHistory.map(
                            (entry, index) =>
                                <tr key={entry._id} className="text-center border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{entry.mode}</td>
                                    <td className="py-2 px-4">{entry.wpm}</td>
                                    <td className="py-2 px-4">{entry.accuracy || "N/A"}</td>
                                </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserStats;
