import React, { useState } from 'react';

function Communities() {
    const initialCommunities = [
        { id: 1, name: 'Frontend Developers', description: 'A community for frontend enthusiasts.' },
        { id: 2, name: 'Backend Developers', description: 'Discuss server-side programming and architecture.' },
        { id: 3, name: 'Full Stack Developers', description: 'For developers skilled in both frontend and backend.' },
        { id: 4, name: 'UI/UX Designers', description: 'Share and learn design principles and tools.' },
    ];

    const [communities, setCommunities] = useState(initialCommunities);
    const [joinedCommunities, setJoinedCommunities] = useState([]);

    const handleJoin = (id) => {
        if (!joinedCommunities.includes(id)) {
            setJoinedCommunities([...joinedCommunities, id]);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Communities</h1>
            <div className="space-y-4">
                {communities.map((community) => (
                    <div key={community.id} className="bg-gray-100 rounded-lg p-4 shadow">
                        <h2 className="text-xl font-semibold">{community.name}</h2>
                        <p className="text-gray-700 mb-4">{community.description}</p>
                        {joinedCommunities.includes(community.id) ? (
                            <button
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                                disabled
                            >
                                Joined
                            </button>
                        ) : (
                            <button
                                onClick={() => handleJoin(community.id)}
                                className="bg-[#4A8DB7] text-white py-2 px-4 rounded-lg hover:bg-[#2C5D77]"
                            >
                                Join
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Communities;
