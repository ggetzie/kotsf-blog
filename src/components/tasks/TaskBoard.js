import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

import { 
    TaskCol, 
    TaskForm,
    TASK_COMPLETED,
    TASK_LATER,
    TASK_NOW,
    TASK_SOMETIME,
    TASK_SOON,
    TASK_UNASSIGNED
} from '.';
import getOrDefault from '../../utils/getOrDefault';

export function TaskBoard({ project, handleNewTask, handleEditTask, handleDeleteTask }) {

    const [currentTaskId, setCurrentTaskId] = useState(null);

    function selectTask(id) {
        if (currentTaskId === id) {
            setCurrentTaskId(null);
        } else {
            setCurrentTaskId(id);
        }
    }

    function getTask(id) {
        const filtered = project.tasks.filter(task => task.id === id);
        return filtered.length === 0 ? null : filtered[0];
    }

    const currentTask = getTask(currentTaskId);

    // sort tasks by status
    let taskMap = new Map();
    for (let task of project.tasks) {
        if (taskMap.has(task.status)) {
            const current = taskMap.get(task.status)
            taskMap.set(task.status, current.concat(task))
        } else {
            taskMap.set(task.status, [task])
        }
    }

    return (
        <>
            <h3>Tasks for {project.name}</h3>
            <div className="taskControl">
                <TaskForm task={currentTask} handleSubmit={(e) => {
                    e.preventDefault()
                    const taskName = e.target.querySelector("input#taskName");
                    const taskStatus = e.target.querySelector("select#statusSelect");
                    handleNewTask({
                        id: uuidv4(),
                        name: taskName.value,
                        status: taskStatus.value
                    })
                    setCurrentTaskId(null);
                }}/>

            </div>
            <div className="taskBoard">
                <TaskCol 
                    title="Unassigned" 
                    tasks={getOrDefault(taskMap, TASK_UNASSIGNED, [])} 
                    width="20%"
                    classArray={["borderRight"]}
                />
                <div className="gridCol">
                    <TaskCol
                        title="Now"
                        tasks={getOrDefault(taskMap, TASK_NOW, [])}
                        width="100%"
                        classArray={["borderRight", "borderBottom"]}
                    />
                    <TaskCol
                        title="Later"
                        tasks={getOrDefault(taskMap, TASK_LATER, [])}
                        width="100%"
                    />
                </div>
                <div className="gridCol">
                    <TaskCol
                        title="Soon"
                        tasks={getOrDefault(taskMap, TASK_SOON, [])}
                        height="50%"
                    />
                    <TaskCol
                        title="Sometime"
                        tasks={getOrDefault(taskMap, TASK_SOMETIME, [])}
                        height="50%"
                        classArray={["borderLeft", "borderTop"]}
                    />
                </div>
                <TaskCol 
                    title="Completed" 
                    tasks={getOrDefault(taskMap, TASK_COMPLETED, [])} 
                    width="20%"
                    classArray={["borderLeft"]}
                />
            </div>
        </>
    )
}