
const db = require("../database/database");

// 1. Get all internships with pagination

exports.getAllInternships = (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 2));
    const offset = (page - 1) * limit;

    const { search, company, domain, location } = req.query;

    let conditions = [];
    let values = [];

    if (search) {
        conditions.push(
            "(title LIKE ? OR company LIKE ? OR domain LIKE ? OR location LIKE ?)"
        );

        const searchValue = `%${search}%`;

        values.push(
            searchValue,
            searchValue,
            searchValue,
            searchValue
        );
    }

    if (company) {
        conditions.push("company LIKE ?");
        values.push(`%${company}%`);
    }

    if (domain) {
        conditions.push("domain LIKE ?");
        values.push(`%${domain}%`);
    }

    if (location) {
        conditions.push("location LIKE ?");
        values.push(`%${location}%`);
    }

    const whereClause = conditions.length
        ? "WHERE " + conditions.join(" AND ")
        : "";

    const countSql = `
        SELECT COUNT(*) AS total
        FROM internships
        ${whereClause}
    `;

    db.get(countSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const dataSql = `
            SELECT *
            FROM internships
            ${whereClause}
            LIMIT ? OFFSET ?
        `;

        db.all(
            dataSql,
            [...values, limit, offset],
            (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    page,
                    limit,
                    totalRecords: result.total,
                    totalPages: Math.ceil(result.total / limit),
                    internships: rows
                });
            }
        );
    });
};


// 2. Get internship by ID
exports.getInternshipById = (req, res) => {
    db.get(
        "SELECT * FROM internships WHERE id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ message: "Internship not found" });
            }

            res.json(row);
        }
    );
};

// 3. Create internship

exports.createInternship = (req, res) => {
    const {
        title, company, location, domain,
        stipend, duration, description
    } = req.body;

    if (
        !title?.trim() ||
        !company?.trim() ||
        !location?.trim() ||
        !domain?.trim() ||
        !duration?.trim()
    ) {
        return res.status(400).json({
            error: "All required fields must be provided"
        });
    }

    const stipendValue = stipend === undefined ? 0 : Number(stipend);

    if (!Number.isFinite(stipendValue) || stipendValue < 0) {
        return res.status(400).json({
            error: "Stipend must be a valid non-negative number"
        });
    }

    const sql = `
        INSERT INTO internships
        (title, company, location, domain, stipend, duration, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [
        title.trim(),
        company.trim(),
        location.trim(),
        domain.trim(),
        stipendValue,
        duration.trim(),
        description || ""
    ], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Internship created successfully",
            id: this.lastID
        });
    });
};


// 4. Update internship

exports.updateInternship = (req, res) => {
    const {
        title, company, location, domain,
        stipend, duration, description
    } = req.body;

    if (
        !title?.trim() ||
        !company?.trim() ||
        !location?.trim() ||
        !domain?.trim() ||
        !duration?.trim()
    ) {
        return res.status(400).json({
            error: "All required fields must be provided"
        });
    }

    const stipendValue = stipend === undefined ? 0 : Number(stipend);

    if (!Number.isFinite(stipendValue) || stipendValue < 0) {
        return res.status(400).json({
            error: "Stipend must be a valid non-negative number"
        });
    }

    const sql = `
        UPDATE internships
        SET title = ?, company = ?, location = ?,
            domain = ?, stipend = ?, duration = ?, description = ?
        WHERE id = ?
    `;

    db.run(sql, [
        title.trim(),
        company.trim(),
        location.trim(),
        domain.trim(),
        stipendValue,
        duration.trim(),
        description || "",
        req.params.id
    ], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.json({
            message: "Internship updated successfully"
        });
    });
};


// 5. Delete internship
exports.deleteInternship = (req, res) => {
    db.run(
        "DELETE FROM internships WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Internship not found" });
            }

            res.json({ message: "Internship deleted successfully" });
        }
    );
};
