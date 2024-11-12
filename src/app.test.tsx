import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./app";

const testValue = "Test Task";
const testValue2 = "Test Task 2";
const placeholderText = "What needs to be done?";
const addButtonText = "Add Task";
const editButtonText = "Edit";
const saveButtonText = "Save";
const removeButtonText = "Remove";
const clearCompleted = "Clear completed";
const allButton = "All";
const activeButton = "Active";
const completedButton = "Completed";
const noTodos = "No todos! You are doing great";

// добавление

test("should add a new task", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(placeholderText), {
    target: { value: testValue },
  });
  fireEvent.click(screen.getByText(addButtonText));

  expect(screen.getByText(testValue)).toBeInTheDocument();
});

// уаление

test("should remove a task", () => {
  window.confirm = jest.fn().mockReturnValue(true);

  render(<App />);
  const input = screen.getByPlaceholderText(placeholderText);
  const button = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(button);

  const removeButton = screen.getByText(removeButtonText);
  fireEvent.click(removeButton);

  expect(screen.queryByText(testValue)).not.toBeInTheDocument();
});

//редактирование

test("should edit a task", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText(placeholderText);
  const addButton = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(addButton);

  const editButton = screen.getByText(editButtonText);

  fireEvent.click(editButton);

  const saveButton = screen.getByText(saveButtonText);

  const editInput = screen.getByDisplayValue(testValue);

  fireEvent.change(editInput, { target: { value: testValue2 } });

  fireEvent.click(saveButton);

  expect(screen.getByText(testValue2)).toBeInTheDocument();
});

// проверка выполнена ли задача

test("should mark task as completed", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(placeholderText);
  const button = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(button);

  const task = screen.getByText(testValue);
  fireEvent.click(task);

  expect(task).toHaveStyle("text-decoration: line-through");
});

// удаление всех выполненных

test("should remove completed tasks", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(placeholderText);
  const button = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: testValue2 } });
  fireEvent.click(button);

  fireEvent.click(screen.getByText(testValue));

  const removecompletedButton = screen.getByText(clearCompleted);
  fireEvent.click(removecompletedButton);

  expect(screen.queryByText(testValue)).not.toBeInTheDocument();
  expect(screen.getByText(testValue2)).toBeInTheDocument();
});

// фильтрация

test("should filter tasks by active/completed/all", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(placeholderText);
  const button = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: testValue2 } });
  fireEvent.click(button);

  fireEvent.click(screen.getByText(testValue2));

  const activeFilterButton = screen.getByText(activeButton);
  fireEvent.click(activeFilterButton);

  expect(screen.getByText(testValue)).toBeInTheDocument();
  expect(screen.queryByText(testValue2)).not.toBeInTheDocument();

  const completedFilterButton = screen.getByText(completedButton);
  fireEvent.click(completedFilterButton);

  expect(screen.queryByText(testValue)).not.toBeInTheDocument();
  expect(screen.getByText(testValue2)).toBeInTheDocument();

  const allFilterButton = screen.getByText(allButton);
  fireEvent.click(allFilterButton);

  expect(screen.queryByText(testValue)).toBeInTheDocument();
  expect(screen.getByText(testValue2)).toBeInTheDocument();
});

// отстутвие дел

test("should display no todos message when no tasks are present", () => {
  render(<App />);

  expect(screen.getByText(noTodos)).toBeInTheDocument();
});

// сохрание в хранилище

beforeAll(() => {
  global.localStorage = {
    getItem: jest.fn(() =>
      JSON.stringify([{ id: 1, text: "Test Task", completed: false }])
    ),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 1,
    key: jest.fn(() => "key"),
  };
});

test("should load tasks from localStorage", () => {
  render(<App />);
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});
