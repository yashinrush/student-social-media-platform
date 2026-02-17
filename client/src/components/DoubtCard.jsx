import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerDoubt } from '../redux/doubtSlice';

function DoubtCard({ doubt }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerText, setAnswerText] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (answerText.trim()) {
            dispatch(answerDoubt({ id: doubt._id, text: answerText }));
            setAnswerText('');
        }
    }



    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm mb-4 border-l-4 border-yellow-500 relative group transition-all duration-300 hover:shadow-md border-y border-r border-gray-100 dark:border-y-slate-800 dark:border-r-slate-800">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{doubt.question}</h3>
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full inline-block mt-1">{doubt.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(doubt.createdAt).toLocaleDateString()}
                    </span>

                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line text-sm leading-relaxed">{doubt.description}</p>

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 border-b dark:border-slate-800 pb-2">
                Asked by: <span className="font-semibold ml-1 text-gray-700 dark:text-gray-300">{doubt.author.name}</span>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Answers ({doubt.answers.length})</h4>
                {doubt.answers.slice(0, 3).map((ans, index) => (
                    <div key={index} className="mb-3 text-sm border-b dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                        <p className="text-gray-700 dark:text-gray-300">{ans.text}</p>
                        <span className="text-xs text-blue-600 dark:text-blue-400">- {ans.user ? ans.user.name : 'Unknown'}</span>
                    </div>
                ))}

                {user && (
                    <form onSubmit={handleAnswerSubmit} className="mt-3 flex gap-2">
                        <input
                            type="text"
                            placeholder="Know the answer? Help out!"
                            className="flex-1 text-sm border dark:border-slate-700 p-2 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-700 transition">Post</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DoubtCard;
