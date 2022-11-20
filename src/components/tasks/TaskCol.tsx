import React from "react"
import { TASK_STATUS, Task } from "./types"
type TaskHandler = (task: Task) => void
function TaskCell({
  task,
  handleSelect,
  handleDelete,
  currentTaskId,
}: {
  task: Task
  handleSelect: TaskHandler
  handleDelete: TaskHandler
  currentTaskId: string
}) {
  let cn = "itemName"

  if (task.id === currentTaskId) {
    cn += " selected"
  }

  if (task.status === TASK_STATUS.COMPLETED) {
    cn += " completed"
  }

  return (
    <div className="listItem">
      <div
        onClick={() => handleSelect(task)}
        onKeyPress={() => handleSelect(task)}
        tabIndex={0}
        role="button"
        className={cn}
      >
        {task.name}
      </div>
      <div
        className="itemDelete"
        role="button"
        onClick={() => handleDelete(task)}
        onKeyPress={() => handleDelete(task)}
        tabIndex={0}
      >
        &times;
      </div>
    </div>
  )
}

export function TaskCol({
  title,
  tasks,
  handleSelect,
  handleDelete,
  currentTaskId,
  width = "100%",
  height = "100%",
  classArray = [],
}: {
  title: string
  tasks: Task[]
  handleSelect: TaskHandler
  handleDelete: TaskHandler
  currentTaskId: string
  width?: string
  height?: string
  classArray?: string[]
}) {
  const cn = ["taskContainer"].concat(classArray).join(" ")
  return (
    <div className={cn} style={{ width: width, height: height }}>
      <h4>{title}</h4>
      {tasks.map((task) => (
        <TaskCell
          key={task.id}
          task={task}
          handleSelect={handleSelect}
          handleDelete={handleDelete}
          currentTaskId={currentTaskId}
        />
      ))}
    </div>
  )
}
