import { Timestamp } from "firebase/firestore";
import { TaskItems } from "../types/types";

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const convertToFirebaseTimeStamp = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  return Timestamp.fromDate(dateObj);
};

const validateForm = (task: TaskItems) => {
  const errors: { [key: string]: string } = {};
  if (!task.title) errors.title = "Task title is required.";
  if (!task.desc) errors.desc = "Description is required.";
  if (!task.duedate) errors.duedate = "Due date is required.";
  if (!task.status) errors.status = "Task status is required.";
  return errors;
};

export { formatDate, convertToFirebaseTimeStamp, validateForm };
