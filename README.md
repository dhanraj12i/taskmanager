# Task Manager

Task Manager is a modern task management application designed to help you organize your tasks efficiently. It offers two views: **List View** and **Board View**, each divided into three sections: **To Do**, **In Progress**, and **Completed**. With features like adding, editing, and deleting tasks, drag-and-drop functionality, and advanced filtering, Task Manager  ensures a seamless task management experience.

*Task Manager in action.*

## List View

![TaskManager1](https://github.com/user-attachments/assets/022df3c0-965f-4ac3-832f-d0a58c9ad26d)

## Board View

![TM_BoardV](https://github.com/user-attachments/assets/e0586de5-4c2f-4ad8-b851-91d2079b6a74)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Responsive Design**: Task Manager adapts seamlessly to different screen sizes, providing an optimized experience for both desktop and mobile devices.
  - **Desktop View**: Enjoy a spacious layout with two views: **List View** and **Board View**, each divided into three sections: **To Do**, **In Progress**, and **Completed**.
  - **Mobile View**: A streamlined, single-column layout for easy task management on smaller screens.
- **Task Management**:
  - Add, edit, and delete tasks.
  - Drag and drop tasks between sections (To Do, In Progress, Completed).
- **Advanced Filtering**:
  - Search tasks by name.
  - Filter tasks by Due Date (All, Today, This Week, This Month ) or Category (Personal or Work).
- **User Authentication**: Securely log in and manage your tasks.
- **Cross-Platform Compatibility**: Built with **Material UI** for a consistent and intuitive user interface across devices.
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

Follow these steps to set up Task Manager locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/dhanraj12i/taskmanager.git
2. Navigate to the project directory:
    ```bash
    cd taskmanager
3. Install dependencies:
    ```bash
    npm install
4. Set up Firebase:
   - Create a Firebase project at Firebase Console.
   - Add your Firebase configuration in src/config/firebase-Config.ts.
     - Create a new file named firebase-Config.ts in the src directory.
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

    - Note: The original firebase-Config.ts file is not included in the repository due to sensitive information like API keys. You must create your own configuration file using your Firebase project details.
    - Create collection name tasks in firestore database.

5. Start the development server:
   ```bash
   npm run dev

6. Open your browser and visit http://localhost:5173.
 
7. Deployment_URL:- https://taskboard-4d88d.web.app/

## Usage

## Login Mobile View

![MobileView_login](https://github.com/user-attachments/assets/01a4b169-f2b3-4da1-9c8d-e6e0506520dc)

## Dashboard Mobile View
![mobileView_dashboard](https://github.com/user-attachments/assets/cd14609e-178e-49e7-a6c3-6e5f7f297df8)

### Adding a Task
1. Click the **Add Task** button.
2. Enter the task details (title, description, category, status and due date ( attachment if any) ).
3. Click **Create**.

![TM_ADDTask](https://github.com/user-attachments/assets/2b3c4700-8120-4a7b-a267-3288ea4bf9d9)

### Editing a Task
1. Click the ellipsis icon on any task Row
2. Choose **Edit** option on the appeared popup.
3. Edit the task details.
4. Click **Update**.

![TM_Edit](https://github.com/user-attachments/assets/00e2c5b4-7eef-4cd5-9e68-9f1a99c2f9ad)

### Deleting a Task 
1. Click the ellipsis icon on any task Row.
2. Choose **Delete** option on the appeared popup.
3. Confirm the deletion.

![TM_Delete](https://github.com/user-attachments/assets/7b56310e-7ca0-4207-838f-91b1f2a6d5b7)

### Batch Operations
1. **Checkbox Selection**:- Allow users to select multiple task with checkboxes.
2. **Status Update/Delete**:- Once tasks are selected, display a **Status**/**Delete** button, to allow batch status update or Bat deletion.
   
![Select_CheckBox](https://github.com/user-attachments/assets/788a7b58-a0e9-46a0-8a51-1b268ec9ca2b)

### Drag and Drop
- Drag tasks between **To Do**, **In Progress**, and **Completed** sections in the **Board View**

### Searching and Filtering
- Use the **search bar** to find tasks by name.
- Filter tasks by **date** or **category** using the filter options.

![TM_Filter](https://github.com/user-attachments/assets/2aee3160-d26a-496f-96cd-6689d278270e)

## Acknowledgements
- **React-DnD**: For enabling drag-and-drop functionality.
- **Material UI**: For providing a sleek and responsive UI design.
- **Firebase**: For seamless user authentication and data storage.
- **Redux**: For efficient global state management.

## Challeneges 
1. Inconsistent Checkbox Selection in Task List
  Challenge:
        The checkbox selection was inconsistent, leading to incorrect selections and unselected tasks appearing selected.
  Solution:
        Used useEffect to update the selected tasks list when the state changed.
        Implemented a controlled component approach to ensure correct state updates.
 2. Performance Optimization in Task Selection
  Challenge:
        Selecting multiple tasks caused unnecessary re-renders.
  Solution:
        Used useCallback to memoize selection handlers.
        Optimized state updates by using a more efficient method to update the selected tasks array.


