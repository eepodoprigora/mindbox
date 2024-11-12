import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";
export const TodoItem = ({ task, toggleCompletion, removeTask, editTask, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const handleChangeClick = () => {
        if (isEditing && editedText.length) {
            setEditedText(editedText);
            editTask(task.id, editedText);
            setIsEditing(false);
        }
        else {
            setIsEditing(true);
        }
    };
    return (_jsxs(ListGroup.Item, { className: "d-flex justify-content-between align-items-center rounded-0", children: [_jsxs("div", { className: "position-relative", children: [_jsx("input", { type: "checkbox", className: "custom-checkbox", checked: task.completed, onChange: () => toggleCompletion(task.id) }), isEditing ? (_jsxs("div", { className: "position-relative", style: { cursor: "pointer" }, children: [_jsx(FormControl, { type: "text", value: editedText, onChange: (e) => setEditedText(e.target.value), onKeyDown: (e) => {
                                    if (e.key === "Enter")
                                        handleChangeClick();
                                }, autoFocus: true }), editedText.length === 0 && (_jsx("span", { className: "error", children: "The field should not be empty" }))] })) : (_jsx("label", { style: {
                            textDecoration: task.completed ? "line-through" : "none",
                        }, className: "form-check-label", onClick: () => toggleCompletion(task.id), children: task.text }))] }), _jsxs("div", { className: "d-flex gap-1", children: [_jsx(Button, { variant: "warning", onClick: () => handleChangeClick(), disabled: editedText.length === 0, children: isEditing ? "Save" : "Edit" }), _jsx(Button, { variant: "danger", onClick: () => removeTask(task.id), children: "Remove" })] })] }));
};
