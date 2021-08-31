import React from 'react';
import { TASK_COMPLETED } from '.';

function TaskCell({task, handleSelect, currentTaskId}) {
    let cn = "taskCell";

    if (task.id === currentTaskId) {
        cn += " selected"
    }

    if (task.status === TASK_COMPLETED) {
        cn += " completed"
    }
    
    return (
        <div 
            className={cn}
            onClick={() => handleSelect(task)}
            onKeyPress={() => handleSelect(task)}
            tabIndex={0}
            role="button"
        >
            {task.name}
        </div>
    )
}

export function TaskCol({ title, tasks, handleSelect, currentTaskId, width="100%", height="100%", classArray=[]}) {
    const cn = ["taskContainer"].concat(classArray).join(" ");
    return(
        <div className={cn} style={{width: width, height: height}}>
            <h4>{title}</h4>
            {tasks.map((task) => <TaskCell 
                                    key={task.id} 
                                    task={task} 
                                    handleSelect={handleSelect} 
                                    currentTaskId={currentTaskId} />)}
        </div>
    )
}