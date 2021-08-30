import React, { useState } from 'react';
import { StatusSelect, TASK_UNASSIGNED } from '.';

export function TaskForm({ task, handleSubmit }) {
    const [taskName, setTaskName] = useState(task ? task.name: "");
    const [taskStatus, setTaskStatus] = useState(task ? task.status : TASK_UNASSIGNED);
    return (
        <form onSubmit={(e) => {
            handleSubmit(e); 
            setTaskName("");
            setTaskStatus(TASK_UNASSIGNED);
        }} className="taskForm">
            <label htmlFor="taskName">Name</label>
            <input 
                type="text" 
                id="taskName" 
                name="taskName" 
                value={taskName} 
                onChange = {(e) => setTaskName(e.target.value)}
                required={true}
            />
            <label htmlFor="statusSelect">Status</label>
            <StatusSelect 
                id="statusSelect" 
                name="statusSelect" 
                value={taskStatus} 
                handleChange={(e) => setTaskStatus(e.target.value)}
            />
            <input type="submit" value={task ? "Edit" : "Add"} />
        </form>
    )
}