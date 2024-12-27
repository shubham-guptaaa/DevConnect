import React, { useState } from 'react';

const CodeShare = () => {
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [sharedCodes, setSharedCodes] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    
    // Handle code submission
    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (code.trim() === '' || description.trim() === '') {
            setError('Both code and description are required');
            return;
        }
        
        const newCode = {
            id: sharedCodes.length + 1,
            code,
            description,
            comments: [],
        };
        setSharedCodes([...sharedCodes, newCode]);
        setCode('');
        setDescription('');
        setError('');
    };

    // Handle comment submission
    const handleCommentSubmit = (codeId, e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            return;
        }
        
        const updatedCodes = sharedCodes.map((code) => {
            if (code.id === codeId) {
                return { ...code, comments: [...code.comments, comment] };
            }
            return code;
        });

        setSharedCodes(updatedCodes);
        setComment('');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Code Share</h1>

            {/* Code Submission Form */}
            <div className="bg-white rounded-lg p-6 shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Share Your Code</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleCodeSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Code</label>
                        <textarea
                            className="w-full p-4 border rounded-lg"
                            rows="6"
                            placeholder="Paste your code here..."
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description/Issue</label>
                        <textarea
                            className="w-full p-4 border rounded-lg"
                            rows="3"
                            placeholder="Describe the issue or the purpose of the code"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#4A8DB7] text-white py-2 px-6 rounded-lg hover:bg-[#2C5D77]"
                    >
                        Share Code
                    </button>
                </form>
            </div>

            {/* Display Shared Codes */}
            <div className="space-y-8">
                {sharedCodes.map((sharedCode) => (
                    <div key={sharedCode.id} className="bg-gray-100 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Code #{sharedCode.id}</h3>
                        <p className="text-gray-600 mt-2">{sharedCode.description}</p>
                        <pre className="mt-4 bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                            {sharedCode.code}
                        </pre>

                        {/* Comment Section */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold">Contributions</h4>
                            <form onSubmit={(e) => handleCommentSubmit(sharedCode.id, e)}>
                                <textarea
                                    className="w-full p-4 border rounded-lg mt-2"
                                    rows="3"
                                    placeholder="Suggest a fix or provide feedback"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="mt-2 bg-[#4A8DB7] text-white py-1 px-4 rounded-lg hover:bg-[#2C5D77]"
                                >
                                    Submit Comment
                                </button>
                            </form>

                            {/* Display Comments */}
                            <div className="mt-4">
                                {sharedCode.comments.length > 0 ? (
                                    sharedCode.comments.map((comment, index) => (
                                        <div key={index} className="bg-gray-200 p-4 mt-2 rounded-lg">
                                            <p>{comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No contributions yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodeShare;
