import React from "react";
import { ListGroup } from "react-bootstrap";
import { Task } from "../types";
import { TodoItem } from "./task-item";
import { Row, Col } from "react-bootstrap";

interface TaskListProps {
  tasks: Task[];
  toggleCompletion: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  editTask: (taskId: number, newContent: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleCompletion,
  removeTask,
  editTask,
}) => {
  return (
    <Row>
      <Col>
        <ListGroup>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              toggleCompletion={toggleCompletion}
              removeTask={removeTask}
              editTask={editTask}
            />
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};
