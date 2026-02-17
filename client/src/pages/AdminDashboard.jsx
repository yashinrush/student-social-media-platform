import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats, reset } from '../redux/adminSlice';
import { FaUser, FaStickyNote, FaUsers } from 'react-icons/fa';

function AdminDashboard() {
    const dispatch = useDispatch();
    const { stats, isLoading } = useSelector((state) => state.admin);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getStats());
        }
    }, [dispatch, user]);

    if (!user || !user.isAdmin) {
        return <div className="text-center mt-10 text-red-600">Access Denied. Admins only.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b dark:border-slate-800 pb-4">Admin Dashboard</h1>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading stats...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Stat Card 1 */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{stats.users}</h3>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-blue-600 dark:text-blue-400">
                                <FaUser size={24} />
                            </div>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Posts</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{stats.posts}</h3>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl text-green-600 dark:text-green-400">
                                <FaStickyNote size={24} />
                            </div>
                        </div>

                        {/* Stat Card 3 */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Communities</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">{stats.communities}</h3>
                            </div>
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl text-purple-600 dark:text-purple-400">
                                <FaUsers size={24} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Add more admin features like User Management Table here if needed */}
            </div>
        </div>
    );
}

export default AdminDashboard;
