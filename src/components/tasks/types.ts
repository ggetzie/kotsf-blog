export const TASK_UNASSIGNED = "Unassigned"
export const TASK_COMPLETED = "Completed"
export const TASK_SOMETIME = "Sometime"
export const TASK_LATER = "Later"
export const TASK_SOON = "Soon"
export const TASK_NOW = "Now"

enum TASK_STATUS {
  UNASSIGNED = "Unassigned",
  COMPLETED = "Completed",
  SOMETIME = "Sometime",
  LATER = "Later",
  SOON = "Soon",
  NOW = "Now",
}

export type Task = {
  id: string | null
  name: string
  status: TASK_STATUS
  estimated_minutes?: number
  actual_minutes?: number
}

export type Project = {
  id?: string
  name: string
  tasks: Task[]
  started?: string
}

export { TASK_STATUS }
