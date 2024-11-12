import { Row, Col, Button, InputGroup, FormControl } from "react-bootstrap";

interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
}

export const TaskInput = ({ newTask, setNewTask, addTask }: TaskInputProps) => {
  return (
    <Row className="my-4">
      <Col>
        <h1 className="text-danger-emphasis text-center">Todos</h1>
        <InputGroup>
          <FormControl
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <Button
            variant="primary"
            onClick={addTask}
            disabled={!newTask.length}>
            Add Task
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};
