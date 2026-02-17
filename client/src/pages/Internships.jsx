import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInternships, postInternship, reset } from '../redux/internshipSlice';
import InternshipCard from '../components/InternshipCard';
import { FaPlus, FaTimes } from 'react-icons/fa';

function Internships() {
    const dispatch = useDispatch();
    const { internships, isLoading } = useSelector((state) => state.internships);
    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        location: '',
        stipend: '',
        description: '',
        skillsRequired: '',
        applyLink: ''
    });

    useEffect(() => {
        dispatch(getInternships());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postInternship(formData));
        setShowModal(false);
        setFormData({
            company: '',
            role: '',
            location: '',
            stipend: '',
            description: '',
            skillsRequired: '',
            applyLink: ''
        });
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Internships & Referrals</h1>
                        <p className="text-gray-500 dark:text-gray-400">Find your dream internship or refer your juniors.</p>
                    </div>
                    {user && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                        >
                            <FaPlus /> Post Opportunity
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading internships...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {internships.map((internship) => (
                            <InternshipCard key={internship._id} internship={internship} />
                        ))}
                    </div>
                )}

                {/* Post Internship Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh] shadow-2xl border border-gray-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Post Internship / Referral</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="company" placeholder="Company Name" required className="border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.company} />
                                    <input type="text" name="role" placeholder="Role (e.g. SDE Intern)" required className="border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.role} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="location" placeholder="Location" className="border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.location} />
                                    <input type="text" name="stipend" placeholder="Stipend (e.g. 50k/mo)" className="border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.stipend} />
                                </div>
                                <input type="text" name="skillsRequired" placeholder="Skills (comma separated)" required className="w-full border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.skillsRequired} />
                                <textarea name="description" placeholder="Job Description / Details" required className="w-full border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" onChange={onChange} value={formData.description}></textarea>
                                <input type="url" name="applyLink" placeholder="Application / Referral Link" className="w-full border dark:border-slate-700 p-2 mb-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.applyLink} />

                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">Post Opportunity</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Internships;
