import { Timestamp } from "firebase/firestore";

export type user = {
  [key: string]: string | user;
};

export interface TaskItems {
  id?: string;
  UUID: string;
  category: string;
  createdAt: Timestamp | Date;
  updated: Timestamp | Date;
  duedate: Timestamp | Date;
  desc: string;
  status: "todo" | "inprogress" | "completed";
  title: string;
}

export type RowItem = {
  id: "todo" | "inprogress" | "completed";
  title: string;
  bgColor?: string;
  tasks: TaskItems[];
};

export type TaskBoardData = RowItem[];
