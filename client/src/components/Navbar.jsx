import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import {
    FaHome, FaProjectDiagram, FaBriefcase, FaUsers,
    FaQuestionCircle, FaTrophy, FaBell, FaUserCircle,
    FaSignOutAlt, FaBars, FaTimes, FaSun, FaMoon
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Projects', path: '/projects', icon: <FaProjectDiagram /> },
        { name: 'Internships', path: '/internships', icon: <FaBriefcase /> },
        { name: 'Communities', path: '/communities', icon: <FaUsers /> },
        { name: 'Doubts', path: '/doubts', icon: <FaQuestionCircle /> },
        { name: 'Leaderboard', path: '/leaderboard', icon: <FaTrophy /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 glass-effect shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white tracking-tighter hover:scale-105 transition-transform group">
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg group-hover:bg-blue-700 transition-colors shadow-md">S</span>tudentHub
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-2 items-center">
                        {user && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105
                                    ${isActive(link.path)
                                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                            >
                                <span className="text-lg">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                        </button>
                        {user ? (
                            <>
                                <Link to="/chat" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100" title="Messages">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </Link>

                                <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100" title="Notifications">
                                    <FaBell size={20} />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-2 focus:outline-none"
                                    >
                                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-100 ring-2 ring-transparent hover:ring-blue-100 transition-all">
                                            {user.profilePic ? (
                                                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {showProfileMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                                            >
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                                    onClick={() => setShowProfileMenu(false)}
                                                >
                                                    <FaUserCircle /> My Profile
                                                </Link>
                                                {user.isAdmin && (
                                                    <Link
                                                        to="/admin"
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                                        onClick={() => setShowProfileMenu(false)}
                                                    >
                                                        <FaUsers /> Admin Dashboard
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={onLogout}
                                                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                                                >
                                                    <FaSignOutAlt /> Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-md transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 p-2 focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <button
                                onClick={toggleTheme}
                                className="w-full text-left flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <FaMoon className="text-lg" /> Dark Mode
                                    </>
                                ) : (
                                    <>
                                        <FaSun className="text-lg" /> Light Mode
                                    </>
                                )}
                            </button>
                            {user ? (
                                <>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium 
                                                ${isActive(link.path)
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="text-lg">{link.icon}</span>
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 my-2 pt-2">
                                        <Link to="/profile" className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                            <FaUserCircle className="text-lg" /> My Profile
                                        </Link>
                                        <Link to="/notifications" className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                                            <FaBell className="text-lg" /> Notifications
                                        </Link>
                                        <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-md">
                                            <FaSignOutAlt className="text-lg" /> Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 mt-4">
                                    <Link to="/login" className="w-full text-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50" onClick={() => setIsOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
