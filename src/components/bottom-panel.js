import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ButtonGroup } from "react-bootstrap";
import { BottomButton } from "./bottom-button";
import { getItemLabel } from "../utils/get-item-label";
export const BottomPanel = ({ filteredTasks, filter, setFilter, removeCompletedTasks, }) => {
    return (_jsx("div", { className: "bottom-panel", children: _jsxs("div", { className: "d-flex justify-content-between", children: [_jsxs("div", { children: [filteredTasks.length, " ", getItemLabel(filteredTasks.length)] }), _jsxs(ButtonGroup, { className: "gap-1", children: [_jsx(BottomButton, { filter: "all", currentFilter: filter, setFilter: setFilter, children: "All" }), _jsx(BottomButton, { filter: "active", currentFilter: filter, setFilter: setFilter, children: "Active" }), _jsx(BottomButton, { filter: "completed", currentFilter: filter, setFilter: setFilter, children: "Completed" })] }), _jsx("button", { className: "clear-filter", onClick: removeCompletedTasks, children: "Clear completed" })] }) }));
};
