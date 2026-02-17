import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-800 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800/50">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center text-sm border-t dark:border-slate-800 pt-3 mt-auto">
                <div className="flex items-center gap-2">
                    {project.author.profilePic ? (
                        <img src={project.author.profilePic} alt={project.author.name} className="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                    ) : (
                        <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-slate-800">
                            {project.author.name.charAt(0)}
                        </div>
                    )}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{project.author.name}</span>
                </div>

                <div className="flex gap-4">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                            <FaGithub /> Code
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
                            <FaExternalLinkAlt /> Live
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
