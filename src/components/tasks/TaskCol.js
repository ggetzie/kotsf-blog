import React from 'react';

export function TaskCol({ title, tasks, width="100%", height="100%", classArray=[]}) {
    const cn = ["taskContainer"].concat(classArray).join(" ");
    return(
        <div className={cn} style={{width: width, height: height}}>
            <h4>{title}</h4>
            {tasks.map((task) => <div className="taskCell" key={task.id}>{task.name}</div>)}
        </div>
    )
}