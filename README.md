# InsightIQ

InsightIQ is a full-stack web application built with React (frontend) and Node.js/Express (backend) for document management, quizzes, and real-time chat powered by AI APIs such as Google's Gemini. It leverages MongoDB for data storage and JWT for secure authentication.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Description

InsightIQ is designed to provide users with an intelligent document management system combined with quiz and chat functionalities. It integrates modern AI services to enhance user interaction and data insights.

### Features

- User authentication and authorization via JWT
- Document upload and management
- Interactive quizzes for knowledge checks
- AI-powered chat integration using Google Gemini API
- Responsive and user-friendly UI built with React and React Bootstrap
- Real-time analytics and charts with react-chartjs-2 and react-countup

## Installation

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (v8+)
- MongoDB instance or Atlas cluster
- Google Gemini API key

### Steps

1. Clone this repository:

```
git clone https://github.com/SurajKumarRamagiri/InsightIQ.git
```

2. Navigate to the project root:

```
cd InsightIQ
```

3. Install all dependencies for frontend and backend:

```
npm install
```

4. Create a `.env` file in the project root and add the following environment variables:

```
GEMINI_API_KEY=your_google_gemini_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the entire project (frontend and backend concurrently):

```
npm run dev
```

> Note: This assumes `concurrently` is configured to run both frontend and backend as per the workspace setup.

## Usage

- Open your browser and go to: `http://localhost:3000`
- Register or log in to access the dashboard.
- Upload and manage your documents.
- Take quizzes to test your knowledge.
- Use the chat feature powered by AI to ask questions or get assistance.

## Acknowledgments

- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Mongoose](https://mongoosejs.com/)
- [Google Gemini API](https://ai.google.com/gemini)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [multer](https://github.com/expressjs/multer)

