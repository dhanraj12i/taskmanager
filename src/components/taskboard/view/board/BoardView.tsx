import React from "react";
import ListView from "../list/ListView";
import { TaskBoardData } from "../../../../types/types";

type BoardViewProps = {
  tableData: TaskBoardData;
  isBoardView?: boolean
};

const BoardView: React.FC<BoardViewProps> = ({ tableData, isBoardView = true }) => {
  return <ListView listData={tableData} isBoardView={isBoardView} />;
};

export default BoardView;
