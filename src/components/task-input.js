import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";
export const TaskInput = ({ newTask, setNewTask, addTask }) => {
    return (_jsx(Row, { className: "my-4", children: _jsxs(Col, { children: [_jsx("h1", { className: "text-danger-emphasis text-center", children: "Todos" }), _jsxs(InputGroup, { children: [_jsx(FormControl, { placeholder: "What needs to be done?", value: newTask, onChange: (e) => setNewTask(e.target.value), onKeyDown: (e) => {
                                if (e.key === "Enter")
                                    addTask();
                            } }), _jsx(Button, { variant: "primary", onClick: addTask, disabled: !newTask.length, children: "Add Task" })] })] }) }));
};
