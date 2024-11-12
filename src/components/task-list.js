import { jsx as _jsx } from "react/jsx-runtime";
import { ListGroup } from "react-bootstrap";
import { TodoItem } from "./task-item";
import { Row, Col } from "react-bootstrap";
export const TaskList = ({ tasks, toggleCompletion, removeTask, editTask, }) => {
    return (_jsx(Row, { children: _jsx(Col, { children: _jsx(ListGroup, { children: tasks.map((task) => (_jsx(TodoItem, { task: task, toggleCompletion: toggleCompletion, removeTask: removeTask, editTask: editTask }, task.id))) }) }) }));
};
