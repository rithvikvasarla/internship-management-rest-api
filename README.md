
# Internship Management REST API

## Project Description
A RESTful API built using Node.js, Express.js, and SQLite to manage internship records. It supports creating, viewing, updating, deleting, searching, and filtering internships.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Features
- Create a new internship
- View all internships
- View internship by ID
- Update internship details
- Delete internships
- Input validation
- Search internships
- Filter by company, domain, and location
- Pagination
- Persistent database storage

## Installation and Setup

1. Clone the repository.
2. Install dependencies:

   npm install

3. Insert sample data:

   npm run seed

4. Start the server:

   npm start

5. Open in browser:

   http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/internships | Get all internships |
| GET | /api/internships/:id | Get internship by ID |
| POST | /api/internships | Create internship |
| PUT | /api/internships/:id | Update internship |
| DELETE | /api/internships/:id | Delete internship |

## Search and Filtering Examples

- /api/internships?search=Developer
- /api/internships?company=Google
- /api/internships?domain=Python
- /api/internships?location=Bangalore
- /api/internships?page=1&limit=2

## Validation
The API checks required fields and ensures stipend values are valid non-negative numbers.

## Testing
All API endpoints were tested using Postman.

## Author
Internship REST API Project
