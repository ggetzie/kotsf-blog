import React from 'react';
import { TASK_COMPLETED } from '.';

function TaskCell({task, handleSelect, handleDelete, currentTaskId}) {
    let cn = "projectName";

    if (task.id === currentTaskId) {
        cn += " selected"
    }

    if (task.status === TASK_COMPLETED) {
        cn += " completed"
    }
    
    return (
        <div className="projectListItem">
            <div onClick={() => handleSelect(task)}
                 onKeyPress={() => handleSelect(task)}
                 tabIndex={0}
                 role="button"
                 className={cn}>
                {task.name}
            </div>
            <div className="projectDelete"
                 role="button"
                 onClick={() => handleDelete(task)}
                 onKeyPress={() => handleDelete(task)}
                 tabIndex={0}>
                &times;
            </div>
        </div>
    )
}

export function TaskCol({ title, tasks, handleSelect, handleDelete, currentTaskId, width="100%", height="100%", classArray=[]}) {
    const cn = ["taskContainer"].concat(classArray).join(" ");
    return(
        <div className={cn} style={{width: width, height: height}}>
            <h4>{title}</h4>
            {tasks.map((task) => <TaskCell 
                                    key={task.id} 
                                    task={task} 
                                    handleSelect={handleSelect} 
                                    handleDelete={handleDelete}
                                    currentTaskId={currentTaskId} />)}
        </div>
    )
}