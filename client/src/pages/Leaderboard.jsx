import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboard } from '../redux/leaderboardSlice';
import { FaTrophy, FaMedal } from 'react-icons/fa';

function Leaderboard() {
    const dispatch = useDispatch();
    const { leaderboard, isLoading } = useSelector((state) => state.leaderboard);

    useEffect(() => {
        dispatch(getLeaderboard());
    }, [dispatch]);

    const getRankIcon = (index) => {
        switch (index) {
            case 0: return <FaTrophy className="text-yellow-500 text-2xl" />;
            case 1: return <FaMedal className="text-gray-400 text-2xl" />;
            case 2: return <FaMedal className="text-orange-500 text-2xl" />;
            default: return <span className="text-xl font-bold text-gray-400">#{index + 1}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                        <FaTrophy className="text-yellow-500" /> Leaderboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Top contributors and active students</p>
                </div>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading rankings...</div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-800">
                        {leaderboard.map((user, index) => (
                            <div key={user._id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 text-center mr-4">
                                    {getRankIcon(index)}
                                </div>

                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 dark:bg-slate-800">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-gray-500 dark:text-gray-400">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{user.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.college} {user.branch && `• ${user.branch}`}</p>
                                </div>

                                <div className="font-bold text-blue-600 dark:text-blue-400">
                                    {user.points} pts
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Leaderboard;
