import React, { useState } from 'react';

function Signup({ closeModal, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setIsAuthenticated(true);
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        <span className="text-xl">X</span>
                    </button>

                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#4A8DB7] text-white py-2 rounded-lg hover:bg-[#2C5D77]"
                        >
                            Sign Up
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Signup;
