import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";
interface BottomButtonProps {
  children: ReactNode;
  filter: "all" | "active" | "completed";
  currentFilter: string;
  setFilter: Dispatch<SetStateAction<"all" | "active" | "completed">>;
}

export const BottomButton = ({
  children,
  filter,
  currentFilter,
  setFilter,
}: BottomButtonProps) => {
  return (
    <Button
      variant="outline-secondary"
      className="rounded-pill px-3"
      active={filter === currentFilter}
      onClick={() => setFilter(filter)}>
      {children}
    </Button>
  );
};
