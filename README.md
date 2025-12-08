**Appointment management system**

Frontend (React 19)
- Appointments listing with:
  - Pagination / Load More
  - Filtering by doctor, date, and status
  - Auto-fetch doctors for dropdown filter
- Loader & delayed API simulation
- Clean Bootstrap UI
- Error handling
  
Backend (Node.js + Express)
- Login
- CRUD APIs for appointments
- Filtering + Pagination support


Installation & Setup Instructions

1. Clone Repo: git clone https://github.com/Samhithasachin/appointment-management-system.git
2. cd appointment-management-system

Backend Setup
1. Install dependencies:
   - cd backend
   - npm install
2. Run backend
  - npm start
API runs at:  http://localhost:4000

Frontend Setup
1. Install dependencies
   - cd frontend
   - npm install
2. Start React
   - npm start
     
The app runs at: http://localhost:3000

Login Page: http://localhost:3000/

Appointments listing Page: http://localhost:3000/appointments

Add New Appointment Page: http://localhost:3000/appointments/new

Test Credentials:

email: doctor@email.com

password: password

Assumptions:
- Authentication is simulated
- Data storage is in JSON file
- Basic appointment model used: {
  "id": "a1",
  "patientName": "",
  "doctor": "",
  "date": "",
  "time": "",
  "status": "scheduled"
}
- Filtering supports only doctor and status. Search is performed on patient name only.
- Limited UI/UX

Limitations:
- No real authentication
- No real database
- No concurrency handling
- Basic validation
- Basic Bootstrap used. No detailed animations.

Improvements:
- Implement real authentication(JWT-based login)
- Add a real database(MongoDB or MySQL)
- Better validations(Date/time conflicts, Prevent double-booking)
- Improve UI/UX
