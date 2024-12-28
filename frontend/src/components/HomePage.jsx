import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/results?location=${location}&category=${category}`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <h1 className="text-4xl font-bold text-white mb-6">Local Experience Explorer</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Outdoor">Outdoor</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default HomePage;
