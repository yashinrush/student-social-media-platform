import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaRegComment, FaRegShareSquare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { likePost } from '../redux/postSlice'; // Assuming you implement this action later

function Post({ post }) {
    const { user } = useSelector((state) => state.auth);
    const { author, content, images, likes, comments, createdAt } = post;
    const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
    const [likeCount, setLikeCount] = useState(likes.length);

    // Placeholder for like functionality
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        // dispatch(likePost(post._id));
    };





    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full overflow-hidden mr-3 ring-2 ring-transparent group-hover:ring-blue-100 transition-all cursor-pointer">
                        {author.profilePic ? (
                            <img src={author.profilePic} alt={author.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                                {author.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">{author.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            {author.college && <span>{author.college}</span>}
                            <span>•</span>
                            <span>{new Date(createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mb-4">
                <p className="text-gray-800 dark:text-gray-300 whitespace-pre-line leading-relaxed text-base">{content}</p>
            </div>

            {images && images.length > 0 && (
                <div className="mb-4 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800">
                    {images.map((img, index) => (
                        <img key={index} src={`${import.meta.env.VITE_API_URL}${img}`} alt="Post content" className="w-full object-cover max-h-[500px]" />
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800 text-gray-500 dark:text-gray-400">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span className="font-medium text-sm">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                    <FaRegComment />
                    <span className="font-medium text-sm">{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-green-600 dark:hover:text-green-400 transition-all">
                    <FaRegShareSquare />
                    <span className="font-medium text-sm">Share</span>
                </button>
            </div>
        </div>
    );
}

export default Post;
