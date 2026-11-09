
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const dbPath = path.join(__dirname, "..", "internships.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully!");
    }
});

// Create internships table
db.run(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        domain TEXT NOT NULL,
        stipend INTEGER DEFAULT 0,
        duration TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;
