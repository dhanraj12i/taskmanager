import {
  addDoc,
  doc,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { collection, getDocs, db } from "../config/firebase/firebase-Config";
import { TaskItems } from "../types/types";

const createTask = async (task: TaskItems) => {
  try {
    const taskCollectionRef = collection(db, "tasks");

    const docRef = await addDoc(taskCollectionRef, {
      ...task,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

const fetchTasks = async ({
  category = "All",
  dueDateFilter = "All",
} = {}): Promise<TaskItems[]> => {
  try {
    const tasksCollection = collection(db, "tasks");
    const conditions = [];

    if (category !== "All") {
      conditions.push(where("category", "==", category.toLowerCase()));
    }

    if (dueDateFilter !== "All") {
      const now = new Date();
      let startOfPeriod, endOfPeriod;

      switch (dueDateFilter) {
        case "Today":
          startOfPeriod = new Date();
          startOfPeriod.setHours(0, 0, 0, 0);
          endOfPeriod = new Date();
          endOfPeriod.setHours(23, 59, 59, 999);
          break;
        case "This Week":
          startOfPeriod = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
          startOfPeriod.setHours(0, 0, 0, 0);
          endOfPeriod = new Date(startOfPeriod);
          endOfPeriod.setDate(startOfPeriod.getDate() + 6); // Saturday
          endOfPeriod.setHours(23, 59, 59, 999);
          break;
        case "This Month":
          startOfPeriod = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
          startOfPeriod.setHours(0, 0, 0, 0);
          endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
          endOfPeriod.setHours(23, 59, 59, 999);
          break;
        default:
          startOfPeriod = null;
          endOfPeriod = null;
      }

      if (startOfPeriod && endOfPeriod) {
        conditions.push(
          where("duedate", ">=", startOfPeriod),
          where("duedate", "<=", endOfPeriod)
        );
      }
    }
    const tasksQuery = conditions.length
      ? query(tasksCollection, ...conditions)
      : tasksCollection;

    const snapshot = await getDocs(tasksQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TaskItems),
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const deleteTasks = async (taskIds: string[]): Promise<void> => {
  if (!taskIds.length) {
    throw new Error("No task IDs provided for deletion");
  }
  const batchOp = writeBatch(db);
  taskIds.forEach((id) => {
    const taskRef = doc(db, "tasks", id);
    batchOp.delete(taskRef);
  });

  await batchOp.commit();
};

const updateTaskStatus = async (
  tasks: TaskItems[],
  newStatus: "todo" | "inporgress" | "completed"
): Promise<void> => {
  if (tasks.length === 0) return;
  const batchOp = writeBatch(db);
  tasks.forEach((task) => {
    const taskRef = doc(db, "tasks", task.id!);
    batchOp.update(taskRef, {
      status: newStatus,
      updated: serverTimestamp(),
    });
  });

  try {
    await batchOp.commit();
  } catch (error) {
    console.error("Failed to update task statuses:", error);
    throw error;
  }
};
export { fetchTasks, createTask, deleteTasks, updateTaskStatus };
