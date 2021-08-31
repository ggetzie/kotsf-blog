import React, { useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import {v4 as uuidv4} from 'uuid';
import { graphql } from 'gatsby';

import "../styles/tasks.css"

import { TaskBoard, ProjectListItem, AddProject } from '../components/tasks';

export default function TaskPage({ data })  {
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    const currentProject = getProject(currentProjectId);

    function selectProject(id) {
        if (currentProjectId === id) {
            setCurrentProjectId(null);
        } else {
            setCurrentProjectId(id)
        }
    }

    function addProject(name) {
        setProjects(projects.concat({
                id: uuidv4(),
                name: name,
                tasks: []
            }));
    }

    function deleteProject(id) {
        if (currentProjectId === id) {
            setCurrentProjectId(null);
        }
        const project = getProject(id);
        const msg = `Project ${project.name} and all associated tasks will be deleted. Are you sure?`
        if (window.confirm(msg)) {
            setProjects(projects.filter(p => p.id !== id))
        }
        
    }

    function getProject(id) {
        const filtered = projects.filter(p => p.id === id);
        if (filtered.length === 0) {
            return null;
        } else {
            return filtered[0];
        }
    }

    function editProject(projectId, name=null, tasks=null) {
        let res = [];
        for (let project of projects) {
            if (project.id === projectId) {
                res.push({
                    id: projectId,
                    name: name || project.name,
                    tasks: tasks || project.tasks
                })
            } else {
                res.push(project)
            }
        }
        setProjects(res);
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

    function deleteTask(project, taskId) {
        const filtered = project.tasks.filter((task) => task.id !== taskId);
        editProject(project.id, project.name, filtered);
    }

    const ProjectListItems = projects.map(p => {
        return <ProjectListItem
                    key={p.id}
                    project={p}
                    isSelected={currentProjectId === p.id}
                    handleSelect={() => selectProject(p.id)}
                    handleDelete={() => deleteProject(p.id)}
                />
    });
    
    return (
        <Layout fullWidth={true}>
            <Helmet title={"Task Manager - " + data.site.siteMetadata.title} />
            <h2>Task Manager</h2>
            <div className="taskMain">
                <div className="projectPane">
                    <h3>Add Project</h3>
                    <AddProject handleSubmit={(e) => {
                        e.preventDefault();
                        const nameField = e.target.querySelector("input[name='projectName']");
                        addProject(nameField.value);
                        nameField.value=""
                    }}/>
                    <div className="projectList">
                        <h3>Projects</h3>
                        {ProjectListItems}
                    </div>
                    
                </div>
                <div className="taskPane">
                    {currentProject !== null && 
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