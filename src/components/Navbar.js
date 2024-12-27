import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLoginClick, onSignupClick, onLogoutClick }) => {
    return (
        <nav className="bg-[#4A8DB7] text-white shadow-lg">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                    <i className="bi bi-code-square text-2xl"></i>
                    <Link to="/" className="hover:text-gray-200"><span className="text-xl font-bold">DevConnect</span></Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <Link to="/communities" className="hover:text-gray-200">Communities</Link>
                    <Link to="/codeShare" className="hover:text-gray-200">Code Share</Link>
                    <Link to="/forum" className="hover:text-gray-200">Forum</Link>
                    <Link to="/dashboard" className="hover:text-gray-200">Live Chat</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <button 
                            onClick={onLogoutClick} 
                            className="px-4 py-2 rounded-lg bg-[#2C5D77] text-white hover:bg-[#234B61]"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={onLoginClick} 
                                className="px-4 py-2 rounded-lg bg-white text-[#4A8DB7] hover:bg-gray-100"
                            >
                                Login
                            </button>
                            <button 
                                onClick={onSignupClick} 
                                className="px-4 py-2 rounded-lg bg-[#2C5D77] text-white hover:bg-[#234B61]"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
