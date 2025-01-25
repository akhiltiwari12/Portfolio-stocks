Portfolio Tracker
Portfolio Tracker is a full-stack web application that helps users track their stock portfolio. The application allows users to add, edit, and delete stocks, view their total portfolio value, and monitor the performance of their stocks. The frontend is built using React, styled with Tailwind CSS, and communicates with a backend server built using Node.js and Express.

Features
Add New Stock: Users can add a new stock to their portfolio with details such as stock name, ticker symbol, buy price, and quantity.
View Portfolio: Displays a list of all the stocks in the user's portfolio, showing the stock name, ticker, quantity, and value.
Stock Price Tracking: The app fetches the real-time stock price via an API and calculates the total portfolio value.
Top Performing Stock: Displays the stock with the highest value in the user's portfolio.
Edit and Delete Stocks: Users can edit or delete stocks in their portfolio.
Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js, MongoDB (for storing stock data)
API for Stock Prices: Example Stock Price API
Project Structure
bash
Copy
Edit
/Portfolio-Tracker
│
├── /frontend          # React frontend
│   ├── /src
│   │   ├── /components # React components
│   │   ├── /services   # API requests
│   │   └── App.jsx     # Main React component
│   └── tailwind.config.js  # Tailwind CSS config
│
├── /backend           # Node.js backend
│   ├── /models         # MongoDB models (e.g., stock model)
│   ├── /routes         # Express routes (e.g., stock routes)
│   └── /server.js      # Main server entry point
│
├── /vercel.json        # Vercel configuration file (if deploying both frontend and backend together)
└── README.md           # Project documentation
Getting Started
Prerequisites
Before starting, ensure you have the following installed:

Node.js (v14 or above)
npm (or yarn)
MongoDB instance (local or cloud)
Setup Instructions
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/your-username/portfolio-tracker.git
cd portfolio-tracker
Install Dependencies for Backend:

bash
Copy
Edit
cd backend
npm install
Install Dependencies for Frontend:

bash
Copy
Edit
cd frontend
npm install
Setup Environment Variables:

Create a .env file in the /backend folder and add the following:

makefile
Copy
Edit
MONGO_URI=<Your MongoDB URI>
STOCK_API_URL=<Your Stock Price API URL>
Optionally, set up any other environment variables based on your setup.

Run the Application:

Backend:

bash
Copy
Edit
cd backend
npm start
Frontend:

bash
Copy
Edit
cd frontend
npm start
Visit the app in your browser at http://localhost:3000 (frontend) and http://localhost:5000 (backend).

Deploying to Vercel
Frontend:

Navigate to the frontend directory.
Initialize a Vercel project and deploy:
bash
Copy
Edit
vercel
Backend:

If deploying separately, navigate to the backend directory.
Initialize and deploy your backend with Vercel:
bash
Copy
Edit
vercel
If deploying both together in a full-stack project, use the vercel.json configuration mentioned earlier to deploy everything at once.

API Endpoints (Backend)
/api/stocks
GET: Fetch all stocks in the portfolio.
POST: Add a new stock.
DELETE: Delete a stock by its ID.
/api/stocks/{id}
GET: Fetch a specific stock by ID.
PUT: Update stock details by ID.
Contributing
Feel free to fork the repository, make changes, and submit pull requests.
