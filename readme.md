# Safe Lock Library | 2023

Safe Lock Library is an Express.js application that provides a secure platform for managing documents. Built with EJS templates and integrated with MongoDB, it offers user authentication, file uploads, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User Registration and Login
- Admin Dashboard
- Document Viewing and Repository
- File Upload Capability
- Responsive Design

## Installation

Follow these steps to get the Safe Lock Library up and running on your local machine:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository

1. Open a terminal window.
2. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/abutler911/safe-lock-library.git
   ```

### Navigate to the Project Directory

```bash
cd safe-lock-library
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory
Add the following environment variables, replacing the values with your actual configurations:

```env
MONGO_DB_URI=your-mongodb-uri
SECRET_KEY=your-secret-key
```

### Start the server

```bash
 npm start
The application should now be running at `http://localhost:3000`. Open this URL in your browser to access the Safe Lock Library.
```
