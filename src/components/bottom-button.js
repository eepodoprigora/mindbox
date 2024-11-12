import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
export const BottomButton = ({ children, filter, currentFilter, setFilter, }) => {
    return (_jsx(Button, { variant: "outline-secondary", className: "rounded-pill px-3", active: filter === currentFilter, onClick: () => setFilter(filter), children: children }));
};
