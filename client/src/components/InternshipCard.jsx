import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

function InternshipCard({ internship }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{internship.role}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">{internship.company}</p>
                </div>
                {internship.stipend && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800">
                        {internship.stipend}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {internship.location || 'Remote'}</span>
                <span className="flex items-center gap-1"><FaBriefcase /> {new Date(internship.createdAt).toLocaleDateString()}</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">{internship.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {internship.skillsRequired.map((skill, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-slate-700">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="border-t dark:border-slate-800 pt-3 flex justify-between items-center mt-auto">
                <div className="flex items-center gap-2 text-sm">
                    {internship.poster.profilePic ? (
                        <img src={internship.poster.profilePic} alt={internship.poster.name} className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                    ) : (
                        <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-slate-800">
                            {internship.poster.name.charAt(0)}
                        </div>
                    )}
                    <span className="text-gray-500 dark:text-gray-400">Posted by {internship.poster.name}</span>
                </div>
                {internship.applyLink && (
                    <a href={internship.applyLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-1 shadow-md hover:shadow-lg">
                        Apply <FaExternalLinkAlt size={12} />
                    </a>
                )}
            </div>
        </div>
    );
}

export default InternshipCard;
