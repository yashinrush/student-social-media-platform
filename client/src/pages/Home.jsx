import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { getPosts, reset } from '../redux/postSlice';
import { motion } from 'framer-motion';
import Landing from './Landing';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading, isError, message } = useSelector((state) => state.posts);

    useEffect(() => {
        if (user) {
            dispatch(getPosts());
        }
        return () => {
            dispatch(reset());
        };
    }, [user, dispatch]);

    if (!user) {
        return <Landing />;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CreatePost />
                </motion.div>

                <div className="space-y-6">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Post post={post} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No posts yet. Be the first to share something!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
