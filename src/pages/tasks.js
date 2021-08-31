import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import {v4 as uuidv4} from 'uuid';
import { graphql } from 'gatsby';

import "../styles/tasks.css"

import { TaskBoard, ProjectListItem, ProjectForm } from '../components/tasks';

export default function TaskPage({ data })  {
    const emptyProject = {
        id: null,
        name: "",
        tasks: []
    }
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem("projects");
        return savedProjects ? JSON.parse(savedProjects) : [];
    });

    const [currentProject, setCurrentProject] = useState(() => {
        const savedCurrent = localStorage.getItem("currentProject");
        return savedCurrent ? JSON.parse(savedCurrent) : emptyProject;
    })

    const [projectFormName, setProjectFormName] = useState(currentProject.name);

    function selectProject(project) {
        if (currentProject.id === project.id) {
            setCurrentProject(emptyProject);
            setProjectFormName(emptyProject.name);
        } else {
            setCurrentProject(project);
            setProjectFormName(project.name);
        }
    }

    function addProject(name) {
        const newProject = {
            id: uuidv4(),
            name: name,
            tasks: []
        }
        setProjects(projects.concat(newProject));
        setCurrentProject(newProject);
    }

    function deleteProject(project) {
        if (currentProject.id === project.id) {
            setCurrentProject(emptyProject);
        }
        const msg = `Project ${project.name} and all associated tasks will be deleted. Are you sure?`
        if (window.confirm(msg)) {
            setProjects(projects.filter(p => p.id !== project.id))
        }
    }

    function editProject(projectId, name=null, tasks=null) {
        let newProjectList = [];
        for (let project of projects) {
            if (project.id === projectId) {
                const edited = {
                    id: projectId,
                    name: name || project.name,
                    tasks: tasks || project.tasks
                }
                newProjectList.push(edited)
                if (currentProject.id == projectId) {
                    setCurrentProject(edited);
                }
            } else {
                newProjectList.push(project)
            }
        }
        setProjects(newProjectList);
    }

    function addTask(project, task) {
        const tasks = project.tasks.concat(task);
        editProject(project.id, project.name, tasks);
    }

    function getTask(project, taskId) {
        const filtered = project.tasks.filter(task => task.id === taskId)
        return filtered.length === 0 ? null : filtered[0];
    }

    function editTask(project, taskId, taskName=null, taskStatus=null) {
        const task = getTask(project, taskId);
        let res = [];
        for (let t of project.tasks) {
            if (t.id === taskId) {
                res.push({
                    id: taskId,
                    name: taskName || t.name,
                    status: taskStatus || t.status
                })
            } else {
                res.push(t);
            }
        }
        editProject(project.id, project.name, res);
    }

    function deleteTask(project, task) {
        const msg = `Task ${task.name} will be permanently deleted from project ${project.name}. Are you sure?`
        if (window.confirm(msg)) {
            const filtered = project.tasks.filter((t) => t.id !== task.id);
            editProject(project.id, project.name, filtered);
        }
    }

    const ProjectListItems = projects.map(p => {
        return <ProjectListItem
                    key={p.id}
                    project={p}
                    isSelected={currentProject.id === p.id}
                    handleSelect={() => selectProject(p)}
                    handleDelete={() => deleteProject(p)}
                />
    });
    
    return (
        <Layout fullWidth={true}>
            <Helmet title={"Task Manager - " + data.site.siteMetadata.title} />
            <h2>Task Manager</h2>
            <div className="taskMain">
                <div className="projectPane">
                    <ProjectForm 
                        handleSubmit={(e) => {
                            e.preventDefault();
                            if (currentProject.id !== null) {
                                editProject(currentProject.id, projectFormName);
                            } else {
                                addProject(projectFormName);
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
                    {currentProject.id !== null && 
                        <TaskBoard 
                            project={currentProject} 
                            handleNewTask={(task) => addTask(currentProject, task)}
                            handleEditTask={(taskId, taskName, taskStatus) => editTask(currentProject, taskId, taskName, taskStatus)}
                            handleDeleteTask={(taskId) => deleteTask(currentProject, taskId)}
                        />
                    }
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`