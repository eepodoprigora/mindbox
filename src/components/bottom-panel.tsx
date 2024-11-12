import { ButtonGroup } from "react-bootstrap";
import { BottomButton } from "./bottom-button";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../types";
import { getItemLabel } from "../utils/get-item-label";

interface BottomPanelProps {
  filteredTasks: Task[];
  filter: "all" | "active" | "completed";
  setFilter: Dispatch<SetStateAction<"all" | "active" | "completed">>;
  removeCompletedTasks: () => void;
}

export const BottomPanel = ({
  filteredTasks,
  filter,
  setFilter,
  removeCompletedTasks,
}: BottomPanelProps) => {
  return (
    <div className="bottom-panel">
      <div className="d-flex justify-content-between">
        <div>
          {filteredTasks.length} {getItemLabel(filteredTasks.length)}
        </div>
        <ButtonGroup className="gap-1">
          <BottomButton
            filter="all"
            currentFilter={filter}
            setFilter={setFilter}>
            All
          </BottomButton>
          <BottomButton
            filter="active"
            currentFilter={filter}
            setFilter={setFilter}>
            Active
          </BottomButton>
          <BottomButton
            filter="completed"
            currentFilter={filter}
            setFilter={setFilter}>
            Completed
          </BottomButton>
        </ButtonGroup>
        <button className="clear-filter" onClick={removeCompletedTasks}>
          Clear completed
        </button>
      </div>
    </div>
  );
};
