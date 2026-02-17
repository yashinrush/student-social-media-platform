import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import { FaGraduationCap, FaBriefcase, FaUserEdit } from 'react-icons/fa';

function Profile() {
    const { id } = useParams(); // Get user ID from URL
    const { user: currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = id || (currentUser ? currentUser._id : null);
                if (!userId) return;

                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setProfile(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [id, currentUser]);

    if (isLoading) return <div className="text-center mt-10">Loading Profile...</div>;
    if (!profile) return <div className="text-center mt-10">User not found</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 bg-blue-600"></div> {/* Cover Image Placeholder */}
                    <div className="px-6 pb-6 relative">
                        <div className="flex justify-between items-end -mt-12 mb-4">
                            <div className="w-24 h-24 bg-white dark:bg-slate-900 p-1 rounded-full">
                                {profile.profilePic ? (
                                    <img src={profile.profilePic} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-300 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-400">
                                        {profile.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {currentUser && currentUser._id === profile._id && (
                                <button className="flex items-center gap-2 bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-slate-700 text-sm font-semibold text-gray-800 dark:text-gray-200 transaction-colors">
                                    <FaUserEdit /> Edit Profile
                                </button>
                            )}
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{profile.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{profile.bio || 'No bio available'}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {profile.college && <span className="flex items-center gap-1"><FaGraduationCap /> {profile.college}</span>}
                            {profile.branch && <span className="flex items-center gap-1"><FaBriefcase /> {profile.branch}</span>}
                            {profile.year && <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs">{profile.year}</span>}
                        </div>

                        {profile.skills && profile.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* User's Posts */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Activity</h2>
                    {profile.posts && profile.posts.length > 0 ? (
                        profile.posts.map(post => (
                            <Post key={post._id} post={{ ...post, author: profile }} /> // Pass minimal author info
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
