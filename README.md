# IT Asset Management Tracking System

## Project Overview
The IT Asset Management Tracking System is a web-based application designed to help IT departments effectively manage their assets. The system allows users to track IT resources, assign assets to departments, generate reports, and manage the full lifecycle of assets, from procurement to retirement.

## Features
- **Asset Management**: Add, update, view, and delete IT assets.
- **Search and Filter**: Advanced search functionality by any column category and filters by device type, manufacturer, model, department, and location.
- **Sorting**: Sort assets by purchase date (newest to oldest or oldest to newest).
- **User Roles**:
  - IT Support Technician: Manage assets and receive notifications about warranty expirations.
  - IT Manager: Monitor department-specific assets.
  - CFO: Generate depreciation reports for planning future IT investments.
- **Lifecycle Tracking**: Track the lifecycle of assets from procurement to retirement.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Development Tools**: Visual Studio Code, Postman

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CIS420-FinalProject.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CIS420-FinalProject
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd frontend
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     MONGO_URI=mongodb://localhost:27017/assetdb
     ```

5. Start the backend server:
   ```bash
   npm run start
   ```

6. Start the React development server:
   ```bash
   cd frontend
   npm start
   ```

7. Open the application in your browser:
   - Navigate to `http://localhost:3000`.

## Directory Structure
```
CIS420-FinalProject/
├── backend/
│   ├── models/
│   │   └── Asset.js
│   ├── routes/
│   │   └── assets.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── ViewAssets.js
│   │   └── App.js
│   └── public/
├── .env
├── package.json
└── README.md
```

## User Stories
1. **IT Support Technician**:
   - Add new assets to the system.
   - Receive notifications for warranty expiration.
2. **IT Manager**:
   - View assets assigned to their department.
3. **CFO**:
   - Generate depreciation reports.
4. **General**:
   - Track the full lifecycle of IT assets.

## Project Timeline
- **Start Date**: September 13, 2024
- **First Draft Due**: October 17, 2024
- **Final Version Completed**: December 11, 2024

## Contributors
- **Julia Adams**

## Contact
For questions or support, please contact:
- Julia Adams (IT Support Technician, Project Lead)
