import { render, screen, fireEvent, cleanup } from "@testing-library/react";
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

beforeEach(() => {
  window.confirm = jest.fn().mockReturnValue(true);
  localStorage.clear();
  render(<App />);
});

afterEach(() => {
  cleanup();
});

// Тест на добавление задачи
test("should add a new task", () => {
  fireEvent.change(screen.getByPlaceholderText(placeholderText), {
    target: { value: testValue },
  });
  fireEvent.click(screen.getByText(addButtonText));

  expect(screen.getByText(testValue)).toBeInTheDocument();
});

// Тест на удаление задачи
test("should remove a task", () => {
  window.confirm = jest.fn().mockReturnValue(true);

  const input = screen.getByPlaceholderText(placeholderText);
  const button = screen.getByText(addButtonText);

  fireEvent.change(input, { target: { value: testValue } });
  fireEvent.click(button);

  const removeButton = screen.getByText(removeButtonText);
  fireEvent.click(removeButton);

  expect(screen.queryByText(testValue)).not.toBeInTheDocument();
});

// Тест на редактирование задачи
test("should edit a task", async () => {
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
  expect(screen.getByText(noTodos)).toBeInTheDocument();
});
