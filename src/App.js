import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingContent from './components/LandingContent';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';
import Forum from './components/Forum';
import Login from './components/Login';
import Signup from './components/Signup';
import Communities from './components/Communities';
import CodeShare from './components/CodeShare';
import './index.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    useEffect(() => {
        // Check if there is a valid JWT token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleSignupClick = () => {
        setShowSignupModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsAuthenticated(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const closeSignupModal = () => {
        setShowSignupModal(false);
    };

    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/" replace />; // Redirect to home if not authenticated
    };

    return (
        <Router>
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    onLoginClick={handleLoginClick}
                    onSignupClick={handleSignupClick}
                    onLogoutClick={handleLogout}
                />
                <Routes>
                    {/* Always display LandingContent on `/` */}
                    <Route path="/" element={<LandingContent />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute element={<Dashboard />} />}
                    />
                    <Route
                        path="/chat"
                        element={<ProtectedRoute element={<ChatRoom />} />}
                    />
                    <Route
                        path="/forum"
                        element={<ProtectedRoute element={<Forum />} />}
                    />
                    <Route
                        path="/communities"
                        element={<ProtectedRoute element={<Communities />} />}
                    />
                    <Route
                        path="/codeShare"
                        element={<ProtectedRoute element={<CodeShare />} />}
                    />
                </Routes>

                {/* Modals */}
                {showLoginModal && (
                    <Login
                        closeModal={closeLoginModal}
                        setIsAuthenticated={setIsAuthenticated}
                    />
                )}
                {showSignupModal && (
                    <Signup
                        closeModal={closeSignupModal}
                        setIsAuthenticated={setIsAuthenticated}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;
