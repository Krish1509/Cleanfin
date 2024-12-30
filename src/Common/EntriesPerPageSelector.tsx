import React from "react";

interface EntriesPerPageSelectorProps {
    entriesPerPage: number;
    onEntriesPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EntriesPerPageSelector: React.FC<EntriesPerPageSelectorProps> = ({
    entriesPerPage,
    onEntriesPerPageChange,
}) => {
    return (
        <ul className="list-inline m-0" style={{ float: 'right' }}>
            <span className="me-2">entries per page</span>
            <li className="list-inline-item">
                <select
                    className="form-select"
                    onChange={onEntriesPerPageChange}
                    value={entriesPerPage}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
            </li>
        </ul>
    );
};

export default EntriesPerPageSelector;
