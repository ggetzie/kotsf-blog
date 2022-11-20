import React from "react"
import { TASK_STATUS } from "./types"

export function StatusSelect({
  value,
  id,
  name,
  handleChange,
}: {
  value: TASK_STATUS
  id: string
  name: string
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
}) {
  return (
    <select
      id={id}
      name={name}
      className="statusSelect"
      value={value}
      onChange={handleChange}
    >
      <option value={TASK_STATUS.UNASSIGNED}>{TASK_STATUS.UNASSIGNED}</option>
      <option value={TASK_STATUS.SOMETIME}>{TASK_STATUS.SOMETIME}</option>
      <option value={TASK_STATUS.LATER}>{TASK_STATUS.LATER}</option>
      <option value={TASK_STATUS.SOON}>{TASK_STATUS.SOON}</option>
      <option value={TASK_STATUS.NOW}>{TASK_STATUS.NOW}</option>
      <option value={TASK_STATUS.COMPLETED}>{TASK_STATUS.COMPLETED}</option>
    </select>
  )
}
