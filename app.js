const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS)
app.use(express.static("public"));

// AI-driven job suggestion logic (mock)
function suggestJobs(skills, goals) {
    // Simulate AI by matching skills/goals to predefined job roles
    const jobSuggestions = [
        { title: "Data Scientist", skills: ["Python", "Statistics", "Machine Learning"] },
        { title: "Marketing Manager", skills: ["Marketing", "SEO", "Communication"] },
        { title: "Software Engineer", skills: ["JavaScript", "Node.js", "React"] },
        { title: "Product Manager", skills: ["Leadership", "Planning", "Agile"] },
        { title: "UX Designer", skills: ["Design", "Prototyping", "User Research"] },
    ];

    // Filter jobs that match at least one skill or loosely align with goals
    return jobSuggestions
        .filter((job) =>
            job.skills.some((skill) => skills.toLowerCase().includes(skill.toLowerCase()))
        )
        .map((job) => job.title);
}

// Route to process user input
app.post("/submit", (req, res) => {
    const { skills, goals } = req.body;

    if (!skills || !goals) {
        return res.status(400).json({ error: "Please provide skills and goals." });
    }

    const jobs = suggestJobs(skills, goals);

    res.json({
        message: "Here are some career suggestions based on your input:",
        jobs: jobs.length ? jobs : ["No direct matches found. Explore related fields!"],
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

