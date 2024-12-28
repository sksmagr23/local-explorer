import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailsPage() {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            const response = await axios.get(`http://localhost:5000/api/experiences/${id}`);
            setExperience(response.data);
        };

        fetchExperience();
    }, [id]);

    if (!experience) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <img
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-64 object-cover rounded"
                />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">
                    {experience.name}
                </h1>
                <p className="text-gray-600 mt-2">{experience.description}</p>
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">Reviews</h2>
                <ul className="list-disc list-inside mt-4 text-gray-600">
                    {experience.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DetailsPage;
