import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { TaskList, TaskInput, BottomPanel } from "./components";
export const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    const addTask = () => {
        if (newTask.trim() === "")
            return;
        const newTaskObj = {
            id: Date.now(),
            text: newTask,
            completed: false,
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask("");
    };
    const editTask = (taskId, newContent) => {
        const updatedTasks = tasks.map((task) => task.id === taskId ? Object.assign(Object.assign({}, task), { text: newContent }) : task);
        setTasks(updatedTasks);
    };
    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map((task) => task.id === taskId ? Object.assign(Object.assign({}, task), { completed: !task.completed }) : task);
        setTasks(updatedTasks);
    };
    const removeTask = (taskId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete the task?");
        if (isConfirmed) {
            setTasks(tasks.filter((task) => task.id !== taskId));
        }
    };
    const removeCompletedTasks = () => {
        const activeTasks = tasks.filter((task) => !task.completed);
        setTasks(activeTasks);
    };
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active")
            return !task.completed;
        if (filter === "completed")
            return task.completed;
        return true;
    });
    return (_jsxs(Container, { className: "w-50", children: [_jsx(TaskInput, { newTask: newTask, setNewTask: setNewTask, addTask: addTask }), tasks.length ? (_jsxs(_Fragment, { children: [_jsx(TaskList, { tasks: filteredTasks, toggleCompletion: toggleTaskCompletion, removeTask: removeTask, editTask: editTask }), _jsx(BottomPanel, { filteredTasks: filteredTasks, filter: filter, setFilter: setFilter, removeCompletedTasks: removeCompletedTasks })] })) : (_jsx("div", { className: "text-center fs-4 text", children: "No todos! You are doing great" }))] }));
};
