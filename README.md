# Next_Js-Task
NTTS Portal

The NTTS Portal is a web application built with Next.js that provides a complete employee management system. It allows secure authentication, employee data management, filtering, and real-time notifications using Redux Toolkit and Mantine UI.

Tech Stack & Libraries

Framework: Next.js 14
 (React + App Router)
 
State Management: Redux Toolkit
UI Framework: Mantine
 (@mantine/core, @mantine/notifications, @mantine/dates)

Styling: (Mantine styling)
Routing & Navigation: Next.js App Router

Notifications: Mantine Notifications (showNotification)
API Handling: Axios instance (api.js with base URL & interceptors)

Version Control: Git & GitHub

Features

Authentication (Login Page)
Email & password-based login
Validation for email format
Redirect to dashboard after successful login
Error toast on failed login

Employee Management

Add new employees (name, email, gender, role, technology, etc.)
Fetch employee list from backend API
Filter employees based on criteria
Success & error notifications on operations

UI/UX Enhancements

Clean, modern design using Mantine UI components
Centered Login card with Mantine’s Center & Card components
Loader indicator while submitting forms
Toast notifications for success/error feedback

State Management

Centralized state using Redux Toolkit slices (employeeSlice, authSlice, uiSlice)
Async actions with createAsyncThunk for API calls
Loading/error handling for async requests

💡 Use Cases

HR Portal – Manage employee data (create, filter, assign roles).

Admin Dashboard – Secure login and role-based access.

Organization Tool – Track technologies, roles, and employee details.

Notification System – Real-time feedback for actions (success/error).

Getting Started

1️⃣ Clone the repository
git clone https://github.com/sumit1092/Next_Js-Task.git
cd Next_Js-Task

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Set up environment variables

Create a .env.local file in root with:

NEXT_PUBLIC_API_BASE_URL=http://your-api-url.com

4️⃣ Run the development server
npm run dev
App will be available at: http://localhost:3000

