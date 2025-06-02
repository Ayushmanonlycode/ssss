# Screenshot Project

This project consists of a frontend infographic website and a backend service to capture screenshots of the website.

## Project Description

*   **Frontend:** An infographic website displaying information. It includes a "Take Screenshot" button that triggers a backend process to capture the current state of the page.
*   **Backend:** A Node.js application that provides an endpoint to receive requests from the frontend. Upon receiving a request, it uses an NPM package (e.g., Puppeteer or a similar library) to take a screenshot of the specified webpage URL and returns the captured image data to the frontend for download.

## Tech Stack

*   **Frontend:**
    *   HTML
    *   CSS
    *   Vanilla JavaScript
*   **Backend:**
    *   Node.js

## Getting Started

To get a local copy of the project up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayushmanonlycode/Screenshotproject.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Screenshotproject
    ```
3.  **Set up the backend:**
    *   Navigate to the `backend` directory (which is the root of the cloned repository).
    *   Install backend dependencies:
        ```bash
        npm install
        ```
    *   Start the backend server:
        ```bash
        npm start
        # Or whatever command you use to start your Node.js server
        ```
    *   Note the address and port the backend is running on (e.g., `http://localhost:3000`).
4.  **Serve the frontend:**
    *   The frontend files are located in the `frontend/` directory and are static (HTML, CSS, JS).
    *   You can open `frontend/index.html` directly in your browser for basic viewing, but for the "Take Screenshot" button to work, you'll need to serve the frontend files via a local web server or integrate it with your backend server.
    *   If your Node.js backend is set up to serve the `frontend` directory, ensure it's configured correctly.
    *   If using a separate simple static server (like VS Code's Live Server extension, or `serve` from npm), run it from the directory containing `index.html` or the project root. Ensure the frontend can make requests to the backend endpoint (e.g., `/api/screenshot`). You might need to configure CORS if running on different ports/domains.

## Deployment

This project involves deploying both a static frontend and a Node.js backend.

*   **Frontend Deployment (Static Site):**
    *   You can deploy the `frontend/` directory to any static hosting service. Popular options include:
        *   **GitHub Pages:** Host directly from your GitHub repository. Configure it to serve the `frontend/` directory.
        *   **Netlify:** Connects to your GitHub repository and automatically deploys the `frontend` directory.
        *   **Vercel:** Similar to Netlify, offers seamless deployment for static sites.
*   **Backend Deployment (Node.js Application):**
    *   The backend can be deployed to a platform that supports Node.js applications. Options include:
        *   **Heroku:** A widely used PaaS (Platform as a Service) for deploying web applications.
        *   **Vercel Functions / Netlify Functions:** If your backend logic is simple, you might be able to adapt it into serverless functions.
        *   **AWS Lambda, Google Cloud Functions, Azure Functions:** Serverless compute options.
        *   **Render:** Another good option for hosting web services.
    *   You will need to configure your deployment platform to run your Node.js application.
*   **Connecting Frontend and Backend:**
    *   Once both are deployed, you will need to update the frontend JavaScript (`frontend/script.js`) to make API requests to the *deployed URL* of your backend instead of a local address (like `'/api/screenshot'` if it's not relative or on the same domain). 