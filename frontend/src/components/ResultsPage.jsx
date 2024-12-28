import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function ResultsPage() {
    const [experiences, setExperiences] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchExperiences = async () => {
            const location = searchParams.get('location');
            const category = searchParams.get('category');
            const response = await axios.get('http://localhost:5000/api/experiences', {
                params: { location, category }
            });
            setExperiences(response.data);
        };

        fetchExperiences();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={exp.image}
                            alt={exp.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {exp.name}
                            </h2>
                            <p className="text-gray-600 mt-2">{exp.description}</p>
                            <Link
                                to={`/details/${exp.id}`}
                                className="text-blue-500 hover:underline mt-4 block"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsPage;
