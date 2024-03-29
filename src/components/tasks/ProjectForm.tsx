import React from "react"

export function ProjectForm({
  projectFormName,
  projectFormNameChange,
  editMode,
  handleSubmit,
}: {
  projectFormName: string
  projectFormNameChange: React.ChangeEventHandler<HTMLInputElement>
  editMode: boolean
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}) {
  const verb = editMode ? "Edit" : "Add"
  return (
    <>
      <h3>{verb} Project</h3>
      <form onSubmit={handleSubmit} className="addProject">
        <label htmlFor="projectName">Name</label>
        <input
          id="projectName"
          name="projectName"
          type="text"
          required={true}
          value={projectFormName}
          onChange={projectFormNameChange}
        />
        <input type="submit" value={verb} />
      </form>
    </>
  )
}
