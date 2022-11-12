import React from "react"
import { Project } from "./types"

export function ProjectListItem({
  handleSelect,
  handleDelete,
  isSelected,
  project,
}: {
  handleSelect: () => void
  handleDelete: () => void
  isSelected: boolean
  project: Project
}) {
  const cn = "itemName" + (isSelected ? " selected" : "")
  return (
    <div className="listItem">
      <div
        className={cn}
        onClick={handleSelect}
        onKeyPress={handleSelect}
        role="button"
        tabIndex={0}
      >
        {project.name}
      </div>
      <div
        className="itemDelete"
        onClick={handleDelete}
        onKeyPress={handleDelete}
        role="button"
        tabIndex={0}
      >
        &times;
      </div>
    </div>
  )
}
