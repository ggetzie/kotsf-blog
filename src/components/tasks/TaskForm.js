import React from 'react';
import { StatusSelect } from '.';

export function TaskForm({ taskFormName, taskFormNameChange, taskFormStatus, taskFormStatusChange, handleSubmit, editMode }) {
        
    return (
        <form onSubmit={handleSubmit} className="taskForm">
            <label htmlFor="taskName">Name</label>
            <input 
                type="text" 
                id="taskName" 
                name="taskName" 
                value={taskFormName} 
                onChange={taskFormNameChange}
                required={true}
            />
            <label htmlFor="statusSelect">Status</label>
            <StatusSelect 
                id="statusSelect" 
                name="statusSelect" 
                value={taskFormStatus} 
                handleChange={taskFormStatusChange}
            />
            <input type="submit" value={editMode ? "Edit" : "Add"} />
        </form>
    )
}