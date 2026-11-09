
const express = require("express");
const cors = require("cors");

// Import database connection
const db = require("./database/database");

// Import internship routes
const internshipRoutes = require("./routes/internshipRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Internship Management REST API"
    });
});

// Internship API routes
app.use("/api/internships", internshipRoutes);

// Server port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
