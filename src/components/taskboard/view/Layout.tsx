import { useEffect, useState, useCallback, useMemo } from "react";
import { RowItem, TaskBoardData, TaskItems } from "../../../types/types";
import { fetchTasks } from "../../../services/db";
import { Timestamp } from "firebase/firestore";
import ListView from "./list/ListView";
import { useSelector, useDispatch } from "react-redux";
import {
  getRefetchState,
  getSearchText,
  getViewType,
  getFilters,
  getIsLoading
} from "../../../states/store/selectors";
import BoardView from "./board/BoardView";
import { setIsLoading } from "../../../states/store/slice";
import { Box, CircularProgress } from "@mui/material";

const Layout = () => {
  const [tableData, setTableData] = useState<TaskBoardData>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const isListViewActive = useSelector(getViewType);
  const isLoading = useSelector(getIsLoading);
  const searchText = useSelector(getSearchText);
  const isRefetch = useSelector(getRefetchState);
  const filters = useSelector(getFilters);
  const dispatch = useDispatch();

  const initialData: RowItem[] = useMemo(() => [
    { id: "todo", title: "ToDo", tasks: [], bgColor: "#FAC3FF" },
    { id: "inprogress", title: "In-Progress", tasks: [], bgColor: "#85D9F1" },
    { id: "completed", title: "Completed", tasks: [], bgColor: "#CEFFCC" },
  ], []);

  const convertFirebaseTimestamp = useCallback((timestamp: Timestamp | Date): Date => {
    return timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  }, []);

  const transformData = useCallback((data: TaskItems[]) => {
    setTableData(
      initialData.map((boardItem) => ({
        ...boardItem,
        tasks: data
          .filter((task) => task.status === boardItem.id)
          .map((task) => ({
            ...task,
            createdAt: convertFirebaseTimestamp(task.createdAt),
            updatedAt: convertFirebaseTimestamp(task.updated),
            duedate: convertFirebaseTimestamp(task.duedate),
          })),
      }))
    );
  }, [initialData, convertFirebaseTimestamp]);

  const loadData = useCallback(async () => {
    dispatch(setIsLoading(true))
    try {
      const res = await fetchTasks({ category: filters.category, dueDateFilter: filters.dueDate });
      if (res.length > 0) {
        transformData(res);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [filters, transformData, dispatch]);

  useEffect(() => {
    loadData();
  }, [filters, isRefetch, filters]);

  useEffect(() => {
    if (!searchText) return;
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(() => {
      dispatch(setIsLoading(true))
      setTableData((prevData) =>
        prevData.map((boardItem) => ({
          ...boardItem,
          tasks: boardItem.tasks.filter((task) =>
            task.title.toLowerCase().includes(searchText.toLowerCase())
          ),
        }))
      );
      dispatch(setIsLoading(false))
    }, 300);

    setDebounceTimeout(newTimeout);
  }, [searchText]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return tableData.length > 0 && (
      isListViewActive
        ? <ListView listData={tableData} />
        : <BoardView tableData={tableData} />
    );
  }
};

export default Layout;
