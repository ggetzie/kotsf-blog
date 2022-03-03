import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import {
  TaskCol,
  TaskForm,
  TASK_COMPLETED,
  TASK_LATER,
  TASK_NOW,
  TASK_SOMETIME,
  TASK_SOON,
  TASK_UNASSIGNED,
} from "."
import getOrDefault from "../../utils/getOrDefault"

export function TaskBoard({
  project,
  handleNewTask,
  handleEditTask,
  handleDeleteTask,
}) {
  const emptyTask = {
    id: null,
    name: "",
    status: TASK_UNASSIGNED,
  }

  const [currentTask, setCurrentTask] = useState(emptyTask)
  const [taskFormName, setTaskFormName] = useState("")
  const [taskFormStatus, setTaskFormStatus] = useState(TASK_UNASSIGNED)

  function selectTask(task) {
    if (currentTask.id === task.id) {
      setCurrentTask(emptyTask)
      setTaskFormName(emptyTask.name)
      setTaskFormStatus(emptyTask.status)
    } else {
      setCurrentTask(task)
      setTaskFormName(task.name)
      setTaskFormStatus(task.status)
    }
  }

  // sort tasks by status
  let taskMap = new Map()
  for (let task of project.tasks) {
    if (taskMap.has(task.status)) {
      const current = taskMap.get(task.status)
      taskMap.set(task.status, current.concat(task))
    } else {
      taskMap.set(task.status, [task])
    }
  }

  function deselectAndDelete(task) {
    if (task.id === currentTask.id) {
      selectTask(emptyTask)
    }
    handleDeleteTask(task)
  }

  return (
    <>
      <h3>Tasks for {project.name}</h3>
      <div className="taskControl">
        <TaskForm
          taskFormName={taskFormName}
          taskFormNameChange={(e) => setTaskFormName(e.target.value)}
          taskFormStatus={taskFormStatus}
          taskFormStatusChange={(e) => setTaskFormStatus(e.target.value)}
          editMode={currentTask.id !== null}
          handleSubmit={(e) => {
            e.preventDefault()
            if (currentTask.id === null) {
              handleNewTask({
                id: uuidv4(),
                name: taskFormName,
                status: taskFormStatus,
              })
            } else {
              handleEditTask(currentTask.id, taskFormName, taskFormStatus)
            }
            // leave last status in the form
            setCurrentTask(emptyTask)
            setTaskFormName(emptyTask.name)
          }}
        />
      </div>
      <div className="taskBoard">
        <TaskCol
          title="Unassigned"
          tasks={getOrDefault(taskMap, TASK_UNASSIGNED, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id}
          width="20%"
          classArray={["borderLeft", "borderTop", "borderBottom"]}
        />
        <TaskCol
          title="Sometime"
          tasks={getOrDefault(taskMap, TASK_SOMETIME, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          width="20%"
        />
        <TaskCol
          title="Later"
          tasks={getOrDefault(taskMap, TASK_LATER, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          currentTaskId={currentTask.id}
          width="20%"
        />
        <TaskCol
          title="Soon"
          tasks={getOrDefault(taskMap, TASK_SOON, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          currentTaskId={currentTask.id}
          width="20%"
        />

        <TaskCol
          title="Now"
          tasks={getOrDefault(taskMap, TASK_NOW, [])}
          handleSelect={(task) => selectTask(task)}
          currentTaskId={currentTask.id}
          handleDelete={(task) => deselectAndDelete(task)}
          width="20%"
          classArray={["borderLeft", "borderTop", "borderBottom"]}
        />
        <TaskCol
          title="Completed"
          tasks={getOrDefault(taskMap, TASK_COMPLETED, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id}
          width="20%"
          classArray={[
            "borderLeft",
            "borderRight",
            "borderTop",
            "borderBottom",
          ]}
        />
      </div>
    </>
  )
}
