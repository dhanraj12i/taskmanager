import { useEffect, useState } from "react";
import { RowItem, TaskBoardData, TaskItems } from "../../../types/types";
import { fetchTasks } from "../../../services/db";
import { Timestamp } from "firebase/firestore";
import ListView from "./list/ListView";
import { useSelector } from "react-redux";
import { getViewType } from "../../../states/store/selectors";
import BoardView from "./board/BoardView";
const Layout = () => {
  const [tableData, setTableData] = useState<TaskBoardData>([]);

  const isListViewActive = useSelector(getViewType);

  const initialData: RowItem[] = [
    { id: "todo", title: "ToDo", tasks: [], bgColor: "#FAC3FF" },
    { id: "inprogress", title: "In-Progress", tasks: [], bgColor: "#85D9F1" },
    { id: "completed", title: "Completed", tasks: [], bgColor: "#CEFFCC" },
  ];

  const convertFirebaseTimestamp = (timestamp: Timestamp | Date): Date => {
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  };

  const transformData = (data: TaskItems[]) => {
    const boardData = initialData.map((boardItem) => {
      const tasksForStatus = data
        .filter((task) => task.status === boardItem.id)
        .map((task) => {
          return {
            ...task,
            createdAt: convertFirebaseTimestamp(task.createdAt),
            updatedAt: convertFirebaseTimestamp(task.updated),
            duedate: convertFirebaseTimestamp(task.duedate),
          };
        });
      return {
        ...boardItem,
        tasks: tasksForStatus,
      };
    });
    setTableData(boardData);
    console.log(boardData);
  };

  const loadData = async () => {
    try {
      const res = await fetchTasks();
      if (res.length > 0) {
        transformData(res);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    tableData.length > 0 &&
    (isListViewActive ? <ListView listData={tableData} /> : <BoardView />)
  );
};

export default Layout;
