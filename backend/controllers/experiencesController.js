const experiences = require('../data/data.json');

const getAllExperiences = (req, res) => {
    const { location, category } = req.query;

    let filteredExperiences = experiences;

    if (location) {
        filteredExperiences = filteredExperiences.filter(exp => 
            exp.location.toLowerCase() === location.toLowerCase()
        );
    }

    if (category) {
        filteredExperiences = filteredExperiences.filter(exp => 
            exp.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json(filteredExperiences);
};

const getExperienceById = (req, res) => {
    const { id } = req.params;
    const experience = experiences.find(exp => exp.id === id);

    if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
    }

    res.json(experience);
};

module.exports = { getAllExperiences, getExperienceById };
