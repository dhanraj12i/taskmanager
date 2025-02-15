# TaskBuddy

TaskBuddy is a modern task management application designed to help you organize your tasks efficiently. It offers two views: **List View** and **Board View**, each divided into three sections: **To Do**, **In Progress**, and **Completed**. With features like adding, editing, and deleting tasks, drag-and-drop functionality, and advanced filtering, TaskBuddy ensures a seamless task management experience.

![TaskBuddy Screenshot](screenshot.png)  
*TaskBuddy in action.*

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Two Views**: Switch between **List View** and **Board View** for better task organization.
- **Task Management**:
  - Add, edit, and delete tasks.
  - Drag and drop tasks between sections (To Do, In Progress, Completed).
- **Advanced Filtering**:
  - Search tasks by name.
  - Filter tasks by date or category (Personal or Work).
- **User Authentication**: Securely log in and manage your tasks.
- **Responsive Design**: Built with **Material UI** for a clean and intuitive user interface.

---

## Technologies Used

- **Frontend**:
  - TypeScript
  - React
  - React-DnD (for drag-and-drop functionality)
  - Material UI (for UI components)
  - Redux (for global state management)
- **Backend**:
  - Firebase (for user authentication and data storage)

---

## Installation

Follow these steps to set up TaskBuddy locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/taskbuddy.git
2. Navigate to the project directory:
    ```bash
    cd taskbuddy
3. Install dependencies:
    ```bash
    npm install
4. Set up Firebase:
   - Create a Firebase project at Firebase Console.
   - Add your Firebase configuration in src/firebaseConfig.ts.
     - Create a new file named firebaseConfig.ts in the src directory.
     - Add the following code to the file and replace the placeholders with your Firebase project's configuration:
    
       ```typescript
       const firebaseConfig = {
       VITE_FIREBASE_API_KEY="Your_VITE_FIREBASE_API_KEY"
       VITE_FIREBASE_AUTH_DOMAIN="Your_VITE_FIREBASE_AUTH_DOMAIN"
       VITE_FIREBASE_PROJECT_ID="Your_FIREBASE_PROJECT_ID"
       VITE_FIREBASE_STORAGE_ID="Your_FIREBASE_STORAGE_ID"
       VITE_FIREBASE_MESSAGING_SENDER_ID="Your_FIREBASE_MESSAGING_SENDER_ID"
       VITE_FIREBASE_APP_ID="Your_FIREBASE_APP_ID"
       VITE_FIREBASE_M_ID="Your_FIREBASE_M_ID"
       };

       export default firebaseConfig;

    - Note: The original firebaseConfig.ts file is not included in the repository due to sensitive information like API keys. You must create your own configuration file using your Firebase project details.

5. Start the development server:
   ```bash
   npm start

6. Open your browser and visit http://localhost:3000.


## Usage

### Adding a Task
1. Click the **Add Task** button.
2. Enter the task details (title, description, category, and due date).
3. Click **Save**.

### Editing a Task
1. Click the **Edit** icon on the task card.
2. Update the task details.
3. Click **Save**.

### Deleting a Task
1. Click the **Delete** icon on the task card.
2. Confirm the deletion.

### Drag and Drop
- Drag tasks between **To Do**, **In Progress**, and **Completed** sections in the **Board View**.

### Searching and Filtering
- Use the **search bar** to find tasks by name.
- Filter tasks by **date** or **category** using the filter options.

## License
This project is licensed under the **MIT License**. See the LICENSE file for details.

## Acknowledgements
- **React-DnD**: For enabling drag-and-drop functionality.
- **Material UI**: For providing a sleek and responsive UI design.
- **Firebase**: For seamless user authentication and data storage.
- **Redux**: For efficient global state management.




