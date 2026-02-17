import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, addProject, reset } from '../redux/projectSlice';
import ProjectCard from '../components/ProjectCard';
import { FaPlus, FaTimes } from 'react-icons/fa';

function Projects() {
    const dispatch = useDispatch();
    const { projects, isLoading } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        githubLink: '',
        liveLink: '',
        techStack: ''
    });

    useEffect(() => {
        dispatch(getProjects());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProject(formData));
        setShowModal(false);
        setFormData({
            title: '',
            description: '',
            githubLink: '',
            liveLink: '',
            techStack: ''
        });
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Project Showcase</h1>
                        <p className="text-gray-500 dark:text-gray-400">Discover and share amazing projects built by students.</p>
                    </div>
                    {user && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                        >
                            <FaPlus /> Add Project
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="text-center dark:text-gray-300">Loading projects...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                )}

                {/* Add Project Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Add New Project</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input type="text" name="title" placeholder="Project Title" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.title} />
                                <textarea name="description" placeholder="Project Description" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" onChange={onChange} value={formData.description}></textarea>
                                <input type="text" name="techStack" placeholder="Tech Stack (comma separated)" required className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.techStack} />
                                <input type="url" name="githubLink" placeholder="GitHub Repository URL" className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.githubLink} />
                                <input type="url" name="liveLink" placeholder="Live Demo URL" className="w-full border dark:border-slate-700 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={onChange} value={formData.liveLink} />
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">Submit Project</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;
