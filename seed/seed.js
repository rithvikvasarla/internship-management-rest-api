
const db = require("../database/database");

const internships = [
    {
        title: "Frontend Developer Intern",
        company: "Google",
        location: "Bangalore",
        domain: "Web Development",
        stipend: 15000,
        duration: "3 Months",
        description: "Work on frontend development projects."
    },
    {
        title: "Python Developer Intern",
        company: "Infosys",
        location: "Hyderabad",
        domain: "Python",
        stipend: 10000,
        duration: "2 Months",
        description: "Develop Python applications."
    },
    {
        title: "Data Analyst Intern",
        company: "Microsoft",
        location: "Remote",
        domain: "Data Science",
        stipend: 20000,
        duration: "6 Months",
        description: "Analyze datasets and prepare reports."
    },
    {
        title: "Java Developer Intern",
        company: "TCS",
        location: "Chennai",
        domain: "Java",
        stipend: 12000,
        duration: "3 Months",
        description: "Build Java-based applications."
    },
    {
        title: "Machine Learning Intern",
        company: "Amazon",
        location: "Remote",
        domain: "Machine Learning",
        stipend: 25000,
        duration: "6 Months",
        description: "Work on machine learning models."
    }
];

const sql = `
    INSERT INTO internships
    (title, company, location, domain, stipend, duration, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

db.serialize(() => {
    internships.forEach((item) => {
        db.run(sql, [
            item.title,
            item.company,
            item.location,
            item.domain,
            item.stipend,
            item.duration,
            item.description
        ]);
    });

    console.log("Sample internship data inserted!");
});

db.close();
