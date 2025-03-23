import {
  addDoc,
  doc,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { collection, getDocs, db } from "../config/firebase/firebase-Config";
import { FetchTasksParams, TaskItems } from "../types/types";

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

const editTask = async (
  taskId: string,
  updatedData: Partial<TaskItems>
): Promise<void> => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      ...updatedData,
      updated: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Failed to update task ${taskId}:`, error);
    throw error;
  }
};

const fetchTasks = async ({
  category = "All",
  dueDateFilter = "All",
  uID,
}: FetchTasksParams): Promise<TaskItems[]> => {
  try {
    console.log(';user ID fetchTasks', uID)
    console.log('filter ID dueDateFilter', dueDateFilter)
    console.log('filter ID category', category)

    const tasksCollection = collection(db, "tasks");
    const conditions = [];

    if (category !== "All") {
      conditions.push(where("category", "==", category.toLowerCase()));
    }

    if (dueDateFilter !== "All") {
      let startOfPeriod: Timestamp;
      let endOfPeriod: Timestamp;

      switch (dueDateFilter) {
        case "today": {
          endOfPeriod = Timestamp.fromDate(new Date());
          startOfPeriod = Timestamp.fromDate(
            new Date(new Date().setDate(new Date().getDate() - 1))
          );
          break;
        }

        case "this-week": {
          const currentDate = new Date();
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          startOfPeriod = Timestamp.fromDate(startOfWeek);
          endOfPeriod = Timestamp.fromDate(endOfWeek);
          break;
        }

        case "this-month": {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

          startOfPeriod = Timestamp.fromDate(startOfMonth);
          endOfPeriod = Timestamp.fromDate(endOfMonth);
          break;
        }

        default: {
          startOfPeriod = Timestamp.fromDate(new Date(0));
          endOfPeriod = Timestamp.fromDate(new Date());
        }
      }

      if (startOfPeriod && endOfPeriod) {
        conditions.push(
          where("duedate", ">=", startOfPeriod),
          where("duedate", "<=", endOfPeriod)
        );
      }
    }
    const tasksQuery = conditions?.length
      ? query(tasksCollection, ...conditions)
      : tasksCollection;

    const snapshot = await getDocs(tasksQuery);
    // return snapshot.docs.map((doc) => ({
    const test = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TaskItems),
    }));
    console.log("test fetch data ", test);
    return test.filter((doc) => {
      console.log('fiulter test fetch', doc.UUID , doc.UUID === uID ? '==' :'!=', uID)
      return doc.UUID === uID;
    });
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
      ...task,
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
export { fetchTasks, createTask, deleteTasks, updateTaskStatus, editTask };
