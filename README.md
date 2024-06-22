# Fugitive Finder

## Description
A game where three cops try to capture a fugitive hiding in one of five cities. Each cop selects a city and a vehicle to investigate. The system determines if the fugitive is captured.

## Technologies
- Frontend: React
- Backend: Node.js (Express.js)
- Cloudinary for storing images

## Installation
1. Clone the repository.
2. Install dependencies:
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```
3. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
4. Start the frontend server:
    ```bash
    cd frontend
    npm start
    ```

## Usage
1. Open the frontend in a browser.
2. Follow the prompts to select cities and vehicles for each cop.
3. View the result to see if the fugitive was captured.

## Assumptions
- Each cop must select a unique city.
- Vehicles must have enough range for a round trip.

## Deployment
- Frontend: [Netlify](https://www.netlify.com/)
- Backend: [Heroku](https://www.heroku.com/)

## Bonus Points
- Unit tests are included.
- Responsive UI with a clean design.

## Build Steps
1. Ensure Node.js and npm are installed.
2. Follow the installation steps above.
3. Deploy the backend and frontend to the respective platforms.
