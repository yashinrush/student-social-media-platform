import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/postSlice';
import { FaImage, FaPaperPlane, FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function CreatePost() {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim() && !image) return;

        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        dispatch(createPost(formData));
        setContent('');
        setImage(null);
        setIsFocused(false);
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 mb-6 transition-all ring-1 ring-transparent hover:ring-blue-100 dark:hover:ring-blue-900">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {user?.profilePic ? (
                        <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {user?.name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <form onSubmit={handleSubmit}>
                        <div className={`bg-gray-50 dark:bg-slate-800 rounded-lg p-3 border transition-colors ${isFocused ? 'border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 ring-2 ring-blue-50 dark:ring-blue-900/30' : 'border-gray-200 dark:border-slate-700'}`}>
                            <textarea
                                className="w-full bg-transparent border-none focus:ring-0 resize-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-base"
                                rows={isFocused || content ? "4" : "1"}
                                placeholder="Start a post..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                            ></textarea>

                            {image && (
                                <div className="mt-2 relative inline-block">
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                                        <FaImage /> {image.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="ml-2 text-red-500 text-xs hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {(isFocused || content || image) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center justify-between mt-3"
                                >
                                    <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                                        <FaImage className="text-blue-500 text-lg" />
                                        <span>Add Photo</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={!content.trim() && !image}
                                        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all shadow-sm
                                            ${(!content.trim() && !image)
                                                ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95'
                                            }`}
                                    >
                                        <FaPaperPlane className="text-sm" /> Post
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
