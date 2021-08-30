import React from 'react';

import {
    TASK_UNASSIGNED,
    TASK_SOMETIME,
    TASK_COMPLETED,
    TASK_LATER,
    TASK_NOW,
    TASK_SOON
} from '.';

export function StatusSelect({ value, id, name, handleChange }) {
    return (
        <select 
            id={id}
            name={name}
            className="statusSelect"
            value={value}
            onChange={handleChange}
            >
            <option value={TASK_UNASSIGNED}>
                {TASK_UNASSIGNED}
            </option>
            <option value={TASK_SOMETIME}>
                {TASK_SOMETIME}
            </option>
            <option value={TASK_LATER}>
                {TASK_LATER}
            </option>
            <option value={TASK_SOON}>
                {TASK_SOON}
            </option>
            <option value={TASK_NOW}>
                {TASK_NOW}
            </option>
            <option value={TASK_COMPLETED}>
                {TASK_COMPLETED}
            </option>
        </select>
    )
}