# React Vite + TypeScript + Firebase Project

## Overview
This project is a web application built with **React**, **Vite**, **TypeScript**, and **Firebase**. It includes features like user authentication, protected routes, and Firebase Firestore integration.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Project Structure](#project-structure)
5. [Firebase Integration](#firebase-integration)


---

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web applications.
- **TypeScript**: A typed superset of JavaScript for better developer experience.
- **Firebase**: A backend-as-a-service platform for authentication, database, and hosting.
  - Firebase Authentication
  - Firebase Firestore (or Realtime Database)
  - Firebase Hosting

---

## Features
- **User Authentication**: Sign in with Google or email/password.
- **Protected Routes**: Only authenticated users can access certain routes.
- **Firestore Integration**: Store and retrieve data from Firebase Firestore.
- **Responsive Design**: Works on both desktop and mobile devices.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo



src/
├── components/       # Reusable UI components
├── pages/            # Page components (e.g., Login, Dashboard)
├── services/         # Firebase services and API calls
├── contexts/         # React contexts (e.g., AuthContext)
├── hooks/            # Custom React hooks
├── assets/           # Static assets (images, fonts, etc.)
├── App.tsx           # Main application component
├── main.tsx          # Entry point
├── vite-env.d.ts     # Vite environment type definitions
├── firebase-config.ts # Firebase initialization

Firebase Integration
Firebase Setup
Go to the Firebase Console.

Create a new project and enable Authentication and Firestore.

Add a web app to your Firebase project and copy the configuration keys.

Authentication
Users can sign in with Google or email/password.

Authentication state is managed using React Context.

Firestore
Data is stored in Firestore and retrieved for display.

Example Firestore structure:

json
Copy
users/
  userId/
    name: "John Doe"
    email: "john@example.com"



Key Components
AuthContext
Manages the authentication state using React Context.

Provides user and setUser to all components.

Protected Routes
Routes are protected using a ProtectedRoute component.

Unauthenticated users are redirected to the login page.

Firebase Services
auth.ts: Handles Firebase authentication.

firestore.ts: Handles Firestore operations.


Deployment
Build the Project
Build the project for production:

bash
Copy
npm run build
Deploy to Firebase Hosting
Install Firebase CLI:

bash
Copy
npm install -g firebase-tools
Log in to Firebase:

bash
Copy
firebase login
Initialize Firebase Hosting:

bash
Copy
firebase init
Deploy the project:

bash
Copy
firebase deploy


<ReusableModal
  open={isOpen}
  onClose={handleClose}
  title="Example Modal"
  primaryButtonText="Save"
  secondaryButtonText="Cancel"
  onPrimaryClick={handleSave}
>
  <p>This is modal content!</p>
</ReusableModal>

 Customization
🔹 Customize Button Styles: Modify Button in ReusableModal.tsx
🔹 Change Task Categories: Update TaskModal.tsx
🔹 Add More Fields: Extend TaskItems and update form fields

Dashboard

 Layout Component Documentation
Purpose:
This component serves as the main layout for displaying tasks in either ListView or BoardView, dynamically switching based on user selection and screen size (mobile or desktop). It fetches task data from Firebase, manages state using Redux, and optimizes rendering for performance.

📂 File Location
bash
Copy
Edit
src/components/task/Layout.tsx
🛠 Features
✅ Fetches Tasks from Firebase
✅ Filters & Searches Tasks Dynamically
✅ Debounces Search Input for Performance
✅ Switches Between List & Board View
✅ Optimized for Mobile & Desktop
✅ Uses Material UI for Styling
✅ Efficient API Calls & State Management

 Task Data Initialization
We define the board categories (ToDo, In Progress, Completed) as the initial structure:

tsx
Copy
Edit
const initialData: RowItem[] = useMemo(() => [
  { id: "todo", title: "ToDo", tasks: [], bgColor: "#FAC3FF" },
  { id: "inprogress", title: "In-Progress", tasks: [], bgColor: "#85D9F1" },
  { id: "completed", title: "Completed", tasks: [], bgColor: "#CEFFCC" },
], []);
This ensures that tasks are categorized properly when data is fetched.

useEffect(() => {
  loadData();
}, [filters, isRefetch]);

 Rendering ListView or BoardView
Finally, based on isListViewActive, we render either ListView or BoardView:



-Rendering ListView or BoardView
Finally, based on isListViewActive, we render either ListView or BoardView:

return tableData.length > 0 && (
  isListViewActive
    ? <ListView listData={tableData} />
    : <BoardView tableData={tableData} />
);

✔️ Integrate Drag-and-Drop for BoardView
✔️ Add Task Editing & Deletion
✔️ Improve Mobile Responsivenes
