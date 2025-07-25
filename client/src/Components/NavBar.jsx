import { faClipboardList, faBars, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group md:mr-50">
                        <motion.div
                            whileHover={{ rotate: 10 }}
                            className="text-indigo-600 group-hover:text-indigo-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                        </motion.div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            <FontAwesomeIcon
                                icon={menuOpen ? faXmark : faBars} 
                                className="h-6 w-6 transition-transform"
                            />
                        </button>
                    </div>


                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    <span>Solutions</span>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`ml-1 text-xs transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                            onMouseLeave={() => setDropdownOpen(false)}
                                        >
                                            <div className="py-1">
                                                <Link
                                                    to="/task"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Task Management
                                                </Link>
                                                <Link
                                                    to="/project"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Project Management
                                                </Link>
                                                <Link
                                                    to="/time"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    Time Tracking
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        <div className="flex items-center space-x-4 ml-6">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="pt-2 pb-4 space-y-2 px-4 bg-white border-t border-gray-200">
                            <div className="border-b border-gray-200 pb-3">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center justify-between w-full text-gray-700 hover:text-indigo-600 font-medium py-2"
                                >
                                    <span>Solutions</span>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`text-xs transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {dropdownOpen && (
                                    <div className="mt-2 pl-4 space-y-2">
                                        <Link
                                            to="/task"
                                            className="block py-2 text-gray-700 hover:text-indigo-600"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Task Management
                                        </Link>
                                        <Link
                                            to="/project"
                                            className="block py-2 text-gray-700 hover:text-indigo-600"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Project Management
                                        </Link>
                                        <Link
                                            to="/time"
                                            className="block py-2 text-gray-700 hover:text-indigo-600"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Time Tracking
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                to="/about"
                                className="block py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="block py-2 text-gray-700 hover:text-indigo-600 border-b border-gray-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <div className="pt-4 space-y-3">
                                <Link
                                    to="/login"
                                    className="block w-full text-center py-2 px-4 text-indigo-600 font-medium border border-indigo-600 rounded-lg hover:bg-indigo-50"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block w-full text-center py-2 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}