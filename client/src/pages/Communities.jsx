import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunities, createCommunity, joinCommunity, reset } from '../redux/communitySlice';
import { FaPlus, FaUsers, FaTimes } from 'react-icons/fa';

function Communities() {
    const dispatch = useDispatch();
    const { communities, isLoading } = useSelector((state) => state.communities);
    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        topics: ''
    });

    useEffect(() => {
        dispatch(getCommunities());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCommunity(formData));
        setShowModal(false);
        setFormData({
            name: '',
            description: '',
            topics: ''
        });
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleJoin = (id) => {
        dispatch(joinCommunity(id));
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Communities</h1>
                        <p className="text-gray-500 dark:text-gray-400">Join groups that match your interests.</p>
                    </div>
                    {user && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                        >
                            <FaPlus /> Create Community
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading communities...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communities.map((community) => (
                            <div key={community._id} className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{community.name}</h3>
                                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm"><FaUsers /> {community.members.length}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{community.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {community.topics.map((topic, index) => (
                                        <span key={index} className="bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                {user && (
                                    <button
                                        onClick={() => handleJoin(community._id)}
                                        disabled={community.members.find(m => m._id === user._id || m === user._id)}
                                        className={`w-full py-2 rounded-lg font-semibold transition ${community.members.find(m => m._id === user._id || m === user._id)
                                            ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                            }`}
                                    >
                                        {community.members.find(m => m._id === user._id || m === user._id) ? 'Joined' : 'Join Community'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Community Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Create New Community</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input type="text" name="name" placeholder="Community Name" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.name} />
                                <textarea name="description" placeholder="Description" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" onChange={onChange} value={formData.description}></textarea>
                                <input type="text" name="topics" placeholder="Topics (comma separated)" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.topics} />
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">Create</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Communities;
