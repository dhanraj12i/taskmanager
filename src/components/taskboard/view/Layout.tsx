import { useEffect, useCallback, useMemo } from "react";
import { fetchTasks } from "../../../services/db";
import { Timestamp } from "firebase/firestore";
import ListView from "./list/ListView";
import { useSelector, useDispatch } from "react-redux";
import { getSearchText, getViewType, getFilters, getUUID } from "../../../states/store/selectors";
import { useQuery } from "@tanstack/react-query";
import BoardView from "./board/BoardView";
import { setIsLoading } from "../../../states/store/slice";
import { Box, CircularProgress } from "@mui/material";
import { TaskItems, TaskBoardData, FiltersType, RowItem } from "../../../types/types";
import { Dispatch } from "@reduxjs/toolkit";

const Layout = () => {
  console.log("🔄 Layout component rendering...");

  const dispatch = useDispatch();
  const userID = useSelector(getUUID);
  const filters = useSelector(getFilters);
  const searchText = useSelector(getSearchText);
  const isListViewActive = useSelector(getViewType);

  const initialData: TaskBoardData = useMemo(() => [
    { id: "todo", title: "ToDo", tasks: [], bgColor: "#FAC3FF" },
    { id: "inprogress", title: "In-Progress", tasks: [], bgColor: "#85D9F1" },
    { id: "completed", title: "Completed", tasks: [], bgColor: "#CEFFCC" },
  ], []);

  const convertFirebaseTimestamp = useCallback((timestamp: Timestamp | Date | null): Date => {
    if (!timestamp) return new Date();
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  }, []);

  const fetchAndTransformTasks = async (
    filters: FiltersType,
    searchText: string,
    transformData: (data: TaskItems[]) => TaskBoardData,
    initialData: TaskBoardData,
    dispatch: Dispatch,
  ) => {
    console.log("📡 Fetching tasks...");
    dispatch(setIsLoading(true));
    try {
      console.log("📡 Fetching tasks... filter", { category: filters.category, dueDateFilter: filters.dueDate, uID: userID });
      const res = await fetchTasks({ category: filters.category, dueDateFilter: filters.dueDate, uID: userID });
      console.log("✅ Fetched tasks:", res);

      const transformed: TaskBoardData = res.length > 0 ? transformData(res) : initialData;
      console.log('transformed', transformed)
      if (searchText) {
        console.log("🔄 Filters/Search changed, refetching data...");
        console.log("🔎 Filtering tasks with search text:", searchText);
        return transformed.map((boardItem: RowItem) => ({
          ...boardItem,
          tasks: boardItem.tasks?.filter((task: TaskItems) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
          ),
        }));
      }
      return transformed;
    } catch (error) {
      console.error("❌ Failed to load tasks:", error);
      return initialData;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const transformData = useCallback((data: TaskItems[]): TaskBoardData => {
    console.log("⚙️ Transforming data...");
    return initialData.map((boardItem: RowItem) => ({
      ...boardItem,
      tasks: data
        .filter((task: TaskItems) => task.status === boardItem.id)
        .map((task: TaskItems) => ({
          ...task,
          createdAt: convertFirebaseTimestamp(task.createdAt),
          updated: convertFirebaseTimestamp(task.updated),
          duedate: convertFirebaseTimestamp(task.duedate),
        })),
    }));
  }, [initialData, convertFirebaseTimestamp]);

  const { data: tableData, isFetching, refetch } = useQuery({
    queryKey: ["tasks", filters, searchText],
    queryFn: () => fetchAndTransformTasks(filters, searchText, transformData, initialData, dispatch),
    enabled: !!userID,
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userID)
      refetch();
  }, [filters, searchText, refetch, userID]);

  if (isFetching) {
    console.log("⏳ Loading tasks...", isFetching);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return tableData && tableData.length > 0 && (
    isListViewActive
      ? <ListView listData={tableData} />
      : <BoardView tableData={tableData} />
  );
};

export default Layout;
