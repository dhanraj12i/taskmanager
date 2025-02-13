import { addDoc } from "firebase/firestore";
import { collection, getDocs, db } from "../config/firebase/firebase-Config";
import { TaskItems } from "../types/types";

const createTask = async (payload: TaskItems) => {
  try {
    await addDoc(collection(db, "tasks"), {
      ...payload,
    });
  } catch (error) {
    console.error("Error adding tasks: ", error);
  }
};

const fetchTasks = async () => {
  try {
    const taskSnapshot = await getDocs(collection(db, "tasks"));

    return taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as TaskItems),
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export { fetchTasks, createTask };
