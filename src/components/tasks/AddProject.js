import React from 'react';

export function AddProject({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} className="addProject">
            <label htmlFor="projectName">Name</label>
            <input id="projectName" name="projectName" type="text" required={true} />
            <input type="submit" value="Add" />
        </form>
    )
}