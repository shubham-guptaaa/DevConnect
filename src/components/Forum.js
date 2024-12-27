import React, { useState, useRef, useEffect } from 'react';

function Forum() {
    const [posts, setPosts] = useState([
        { id: 1, author: 'John Doe', content: 'Welcome to the forum!' },
        { id: 2, author: 'Jane Smith', content: 'Feel free to ask questions or share your thoughts.' },
    ]);
    const [newPost, setNewPost] = useState('');
    const [error, setError] = useState('');
    const postListRef = useRef(null);

    // Scroll to the bottom when a new post is added
    useEffect(() => {
        if (postListRef.current) {
            postListRef.current.scrollTop = postListRef.current.scrollHeight;
        }
    }, [posts]);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newPost.trim() === '') {
            setError('Post content cannot be empty.');
            return;
        }
        const newPostData = {
            id: posts.length + 1,
            author: 'You', // Replace with authenticated user's name if available
            content: newPost,
        };
        setPosts([...posts, newPostData]);
        setNewPost('');
        setError('');
    };

    const handleInputChange = (e) => {
        setNewPost(e.target.value);
        if (error) setError(''); // Clear error on typing
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Forum</h1>

            {/* Post List */}
            <div
                className="space-y-4 mb-8 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow"
                ref={postListRef}
            >
                {posts.map((post) => (
                    <div key={post.id} className="bg-gray-100 rounded-lg p-4 shadow">
                        <p className="text-gray-800 font-medium">{post.author}</p>
                        <p className="text-gray-600 mt-2">{post.content}</p>
                    </div>
                ))}
            </div>

            {/* New Post Form */}
            <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Post a new message</h2>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        className="w-full border rounded-lg p-4 h-28"
                        placeholder="Write your message here..."
                        value={newPost}
                        onChange={handleInputChange}
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="mt-4 bg-[#4A8DB7] text-white py-2 px-6 rounded-lg hover:bg-[#2C5D77]"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Forum;
