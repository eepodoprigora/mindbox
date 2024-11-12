import React, { useState } from "react";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { Task } from "../types";

interface TodoItemProps {
  task: Task;
  toggleCompletion: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  editTask: (taskId: number, newContent: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  toggleCompletion,
  removeTask,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleChangeClick = () => {
    if (isEditing && editedText.length) {
      setEditedText(editedText);
      editTask(task.id, editedText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center rounded-0">
      <div className="position-relative">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={task.completed}
          onChange={() => toggleCompletion(task.id)}
        />
        {isEditing ? (
          <div className="position-relative" style={{ cursor: "pointer" }}>
            <FormControl
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChangeClick();
              }}
              autoFocus
            />
            {editedText.length === 0 && (
              <span className="error">The field should not be empty</span>
            )}
          </div>
        ) : (
          <label
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            className="form-check-label"
            onClick={() => toggleCompletion(task.id)}>
            {task.text}
          </label>
        )}
      </div>
      <div className="d-flex gap-1">
        <Button
          variant="warning"
          onClick={() => handleChangeClick()}
          disabled={editedText.length === 0}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button variant="danger" onClick={() => removeTask(task.id)}>
          Remove
        </Button>
      </div>
    </ListGroup.Item>
  );
};
