import React from 'react';

import './LandingContent.css';

const LandingContent = () => {
    return (
        <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Code. Connect. Collaborate.</h1>
            <p className="text-gray-600 mb-8">Join our community of developers to share code, solve problems, and learn together.</p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon="bi bi-code-slash"
                    title="Real-time Code Sharing"
                    description="Share and collaborate on code snippets in real-time with other developers."
                />
                <FeatureCard
                    icon="bi bi-people-fill"
                    title="Community Forums"
                    description="Engage in discussions, share knowledge, and learn from other developers."
                />
                <FeatureCard
                    icon="bi bi-diagram-3"
                    title="Skill Categories"
                    description="Find developers and discussions based on specific technologies and skills."
                />
            </div>

            {/* Live Code Editor Section */}
            <div className="bg-white rounded-lg custom-shadow p-6 mb-12">
                <h3 className="text-xl font-semibold mb-4">Live Code Editor</h3>
                <div className="bg-gray-900 p-4 rounded-lg code-editor text-green-400 text-sm">
                    <pre>
                        <code>
                            {// Try our real-time code editor
                                `function greeting(name) {
    return \`Hello, \${name}! Welcome to DevConnect\`;
}

// Share your code with the community
greeting("Developer");`}
                        </code>
                    </pre>
                </div>
            </div>

        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className={`text-[#4A8DB7] mb-4`}>
            <i className={`${icon} text-3xl`}></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default LandingContent;  