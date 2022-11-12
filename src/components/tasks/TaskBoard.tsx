import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { TaskCol, TaskForm } from "."
import { Project, Task, TASK_STATUS } from "./types"
import getOrDefault from "../../utils/getOrDefault"

export function TaskBoard({
  project,
  handleNewTask,
  handleEditTask,
  handleDeleteTask,
}: {
  project: Project
  handleNewTask: (task: Task) => void
  handleEditTask: (taskId: string, name: string, status: TASK_STATUS) => void
  handleDeleteTask: (task: Task) => void
}) {
  const emptyTask = {
    id: null,
    name: "",
    status: TASK_STATUS.UNASSIGNED,
  }

  const [currentTask, setCurrentTask] = useState<Task>(emptyTask)
  const [taskFormName, setTaskFormName] = useState("")
  const [taskFormStatus, setTaskFormStatus] = useState<TASK_STATUS>(
    TASK_STATUS.UNASSIGNED
  )

  function selectTask(task: Task) {
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

  function deselectAndDelete(task: Task) {
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
          taskFormNameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTaskFormName(e.target.value)
          }
          taskFormStatus={taskFormStatus}
          taskFormStatusChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setTaskFormStatus(e.target.value as TASK_STATUS)
          }
          editMode={currentTask.id !== null}
          handleSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
          tasks={getOrDefault(taskMap, TASK_STATUS.UNASSIGNED, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id as string}
          width="20%"
          classArray={["borderLeft", "borderTop", "borderBottom"]}
        />
        <TaskCol
          title="Sometime"
          tasks={getOrDefault(taskMap, TASK_STATUS.SOMETIME, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id as string}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          width="20%"
        />
        <TaskCol
          title="Later"
          tasks={getOrDefault(taskMap, TASK_STATUS.LATER, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          currentTaskId={currentTask.id as string}
          width="20%"
        />
        <TaskCol
          title="Soon"
          tasks={getOrDefault(taskMap, TASK_STATUS.SOON, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          classArray={["borderLeft", "borderTop", "borderBottom"]}
          currentTaskId={currentTask.id as string}
          width="20%"
        />

        <TaskCol
          title="Now"
          tasks={getOrDefault(taskMap, TASK_STATUS.NOW, [])}
          handleSelect={(task) => selectTask(task)}
          currentTaskId={currentTask.id as string}
          handleDelete={(task) => deselectAndDelete(task)}
          width="20%"
          classArray={["borderLeft", "borderTop", "borderBottom"]}
        />
        <TaskCol
          title="Completed"
          tasks={getOrDefault(taskMap, TASK_STATUS.COMPLETED, [])}
          handleSelect={(task) => selectTask(task)}
          handleDelete={(task) => deselectAndDelete(task)}
          currentTaskId={currentTask.id as string}
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
