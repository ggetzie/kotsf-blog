import React, { useState, useEffect } from "react"
import Layout from "../../../components/layout"
import { Helmet } from "react-helmet"
import { v4 as uuidv4 } from "uuid"
import { graphql, Link, PageProps } from "gatsby"
import { Project, Task, TASK_STATUS } from "../../../components/tasks/types"

import "../../../styles/tasks.css"

import {
  TaskBoard,
  ProjectListItem,
  ProjectForm,
} from "../../../components/tasks"

export default function TaskPage({ data }: PageProps<Queries.TasksPageQuery>) {
  const emptyProject = {
    id: null,
    name: "",
    tasks: [],
  }
  const [projects, setProjects] = useState(() => {
    if (typeof window !== "undefined") {
      const savedProjects = localStorage.getItem("TAW_projects")
      return savedProjects ? JSON.parse(savedProjects) : []
    } else {
      return []
    }
  })

  const [currentProject, setCurrentProject] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCurrent = localStorage.getItem("TAW_currentProject")
      return savedCurrent ? JSON.parse(savedCurrent) : emptyProject
    } else {
      return emptyProject
    }
  })

  const [projectFormName, setProjectFormName] = useState(currentProject.name)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("TAW_projects", JSON.stringify(projects))
      localStorage.setItem("TAW_currentProject", JSON.stringify(currentProject))
    }
  })

  function selectProject(project: Project) {
    if (currentProject.id === project.id) {
      setCurrentProject(emptyProject)
      setProjectFormName(emptyProject.name)
    } else {
      setCurrentProject(project)
      setProjectFormName(project.name)
    }
  }

  function addProject(name: string) {
    const newProject = {
      id: uuidv4(),
      name: name,
      tasks: [],
    }
    setProjects(projects.concat(newProject))
    setCurrentProject(newProject)
  }

  function deleteProject(project: Project) {
    if (currentProject.id === project.id) {
      setCurrentProject(emptyProject)
    }
    const msg = `Project ${project.name} and all associated tasks will be deleted. Are you sure?`
    if (window.confirm(msg)) {
      setProjects(projects.filter((p: Project) => p.id !== project.id))
    }
  }

  function editProject(projectId: string, name?: string, tasks?: Task[]) {
    let newProjectList = []
    for (let project of projects) {
      if (project.id === projectId) {
        const edited = {
          id: projectId,
          name: name || project.name,
          tasks: tasks || project.tasks,
        }
        newProjectList.push(edited)
        if (currentProject.id === projectId) {
          setCurrentProject(edited)
        }
      } else {
        newProjectList.push(project)
      }
    }
    setProjects(newProjectList)
  }

  function addTask(project: Project, task: Task) {
    const tasks = project.tasks.concat(task)
    editProject(project.id!, project.name, tasks)
  }

  function editTask(
    project: Project,
    taskId: string,
    taskName?: string,
    taskStatus?: TASK_STATUS
  ) {
    let res = []
    for (let t of project.tasks) {
      if (t.id === taskId) {
        res.push({
          id: taskId,
          name: taskName || t.name,
          status: taskStatus || t.status,
        })
      } else {
        res.push(t)
      }
    }
    editProject(project.id!, project.name, res)
  }

  function deleteTask(project: Project, task: Task) {
    const msg = `Task ${task.name} will be permanently deleted from project ${project.name}. Are you sure?`
    if (window.confirm(msg)) {
      const filtered = project.tasks.filter((t: Task) => t.id !== task.id)
      editProject(project.id!, project.name, filtered)
    }
  }

  const ProjectListItems = projects.map((p: Project) => {
    return (
      <ProjectListItem
        key={p.id}
        project={p}
        isSelected={currentProject.id === p.id}
        handleSelect={() => selectProject(p)}
        handleDelete={() => deleteProject(p)}
      />
    )
  })

  return (
    <Layout is_index={false} fullWidth={true}>
      <Helmet title={"Project Manager - " + data?.site?.siteMetadata?.title} />
      <h2>Tilting at Windmills Project Manager</h2>
      <div className="intro">
        <p>
          Finally, a place to keep track of all the windmills you're tilting at.
          To start, enter a project name "Add Project" form on the left and
          click Add. Enter tasks in the the form that appears on the right and
          assign them a status with the drop down menu. They'll automatically
          sort to the appropriate column. You can click on a task to select it
          and change the name and status in the same form at the top of the task
          area. Change the status to move the task to the associated column.
        </p>

        <p>
          To add a new project, click on the currently selected project name to
          deselect it, enter a new name in the "Add Project" form and click Add.
          You can switch back and forth between projects by clicking on the
          project name in the list to select it.
        </p>

        <p>
          Clicking on the red <span style={{ color: "red" }}>&times;</span> that
          appears next to a project or task when you hover over it will delete
          it.
        </p>

        <p>
          All changes are automatically saved to your browser's local storage,
          so your data never leaves your computer. However this also means that
          your data will be lost if you clear site data from your browser's
          settings.
        </p>

        <p>
          Like the rest of the blog, this application is released under the site{" "}
          <Link to="/license/">license</Link>. View the source on{" "}
          <a href="https://github.com/ggetzie/kotsf-blog/blob/master/src/pages/tasks.js">
            Github
          </a>
          .
        </p>
      </div>

      <div className="taskMain">
        <div className="projectPane">
          <ProjectForm
            handleSubmit={(e) => {
              e.preventDefault()
              if (currentProject.id !== null) {
                editProject(currentProject.id, projectFormName)
              } else {
                addProject(projectFormName)
              }
            }}
            projectFormName={projectFormName}
            projectFormNameChange={(e) => setProjectFormName(e.target.value)}
            editMode={currentProject.id !== null}
          />
          <div className="projectList">
            <h3>Projects</h3>
            {ProjectListItems}
          </div>
        </div>
        <div className="taskPane">
          {currentProject.id !== null && (
            <TaskBoard
              project={currentProject}
              handleNewTask={(task) => addTask(currentProject, task)}
              handleEditTask={(taskId, taskName, taskStatus) =>
                editTask(currentProject, taskId, taskName, taskStatus)
              }
              handleDeleteTask={(taskId) => deleteTask(currentProject, taskId)}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TasksPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
