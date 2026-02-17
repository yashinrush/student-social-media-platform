import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoubts, askDoubt, reset } from '../redux/doubtSlice';
import DoubtCard from '../components/DoubtCard';
import { FaQuestionCircle } from 'react-icons/fa';

function Doubts() {
    const dispatch = useDispatch();
    const { doubts, isLoading } = useSelector((state) => state.doubts);
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        question: '',
        subject: '',
        description: ''
    });

    useEffect(() => {
        dispatch(getDoubts());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(askDoubt(formData));
        setFormData({
            question: '',
            subject: '',
            description: ''
        });
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Side: Ask Doubt Form */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-md sticky top-6 border border-transparent dark:border-slate-800">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100"><FaQuestionCircle className="text-yellow-500" /> Ask a Doubt</h2>
                        {user ? (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                    <select name="subject" className="w-full border dark:border-slate-700 p-2 rounded-lg mt-1 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" onChange={onChange} value={formData.subject} required>
                                        <option value="">Select Subject</option>
                                        <option value="DSA">Data Structures & Algo</option>
                                        <option value="Web Dev">Web Development</option>
                                        <option value="DBMS">DBMS</option>
                                        <option value="OS">Operating Systems</option>
                                        <option value="AI/ML">AI / Machine Learning</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question</label>
                                    <input type="text" name="question" placeholder="e.g. implementation of QuickSort" className="w-full border dark:border-slate-700 p-2 rounded-lg mt-1 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500" onChange={onChange} value={formData.question} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea name="description" placeholder="Provide more details..." className="w-full border dark:border-slate-700 p-2 rounded-lg mt-1 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500" rows="3" onChange={onChange} value={formData.description}></textarea>
                                </div>
                                <button type="submit" className="w-full bg-yellow-500 text-white font-bold py-2 rounded-lg hover:bg-yellow-600 transition shadow-md">Post Doubt</button>
                            </form>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Please login to ask doubts.</p>
                        )}
                    </div>
                </div>

                {/* Right Side: Doubts List */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recent Doubts</h2>
                    {isLoading ? <p className="dark:text-gray-300">Loading...</p> : (
                        doubts.length > 0 ? (
                            doubts.map((doubt) => <DoubtCard key={doubt._id} doubt={doubt} />)
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No doubts found.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Doubts;
