# Ethereum Tracker

## Overview

Ethereum Tracker is a web application designed to track Ethereum transactions and prices. The application includes both a frontend and a backend. The backend handles API requests and data processing, while the frontend provides an intuitive interface for users to interact with the data.

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Setup](#setup)
- [Contributing](#contributing)

## Frontend

The frontend of the Ethereum Tracker is built with Vite and React. It provides a user-friendly interface for displaying Ethereum transactions and prices.

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a fast development environment.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser and go to `http://localhost:5173` to view the application.**

### Build

To create a production build of the frontend:

```bash
npm run build
```

The production build will be available in the `dist` directory.

## Backend

The backend of the Ethereum Tracker is built with Node.js and Express. It handles API requests, connects to MongoDB, and manages rate limiting and request counting.

### Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing transaction and price data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **cors**: Middleware for enabling CORS.
- **express-rate-limit**: Middleware for rate limiting.

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file and add your MongoDB URI:**

   ```env
   MONGO_URI=<your-mongodb-uri>
   PORT=3000
   ```

5. **Start the backend server:**

   ```bash
   npm start
   ```

### API Endpoints

- **GET /api/transactions/:address**: Fetch transactions for a given Ethereum address.
- **GET /api/eth-price**: Fetch and store the current Ethereum price.
- **GET /api/user-expenses/:address**: Get user expenses based on transactions.

### Testing

You can test the backend using tools like Postman or cURL.

## Contributing

If you'd like to contribute to the Ethereum Tracker project, please follow these steps:

1. **Fork the repository.**
2. **Create a new branch for your feature or bug fix:**

   ```bash
   git checkout -b my-feature
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -am 'Add new feature'
   ```

4. **Push your branch to your forked repository:**

   ```bash
   git push origin my-feature
   ```

5. **Create a pull request to the main repository.**


