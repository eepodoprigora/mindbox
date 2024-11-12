import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { TaskList, TaskInput, BottomPanel } from "./components";
import { Task } from "./types";

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const editTask = (taskId: number, newContent: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newContent } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (taskId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the task?"
    );

    if (isConfirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const removeCompletedTasks = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Container className="w-50">
      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      {tasks.length ? (
        <>
          <TaskList
            tasks={filteredTasks}
            toggleCompletion={toggleTaskCompletion}
            removeTask={removeTask}
            editTask={editTask}
          />
          <BottomPanel
            filteredTasks={filteredTasks}
            filter={filter}
            setFilter={setFilter}
            removeCompletedTasks={removeCompletedTasks}
          />
        </>
      ) : (
        <div className="text-center fs-4 text">
          No todos! You are doing great
        </div>
      )}
    </Container>
  );
};
