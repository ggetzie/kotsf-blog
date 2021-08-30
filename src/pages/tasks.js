import React, { useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import {v4 as uuidv4} from 'uuid';
import { graphql } from 'gatsby';

import "../styles/tasks.css"
import getOrDefault from "../utils/getOrDefault";

const TASK_UNASSIGNED = "TASK_UNASSIGNED";
const TASK_COMPLETED = "TASK_COMPLETED";
const TASK_SOMETIME = "TASK_SOMETIME";
const TASK_LATER = "TASK_LATER";
const TASK_SOON = "TASK_SOON";
const TASK_NOW = "TASK_NOW";


const ProjectList = styled.div`
    margin-top: 1em;
    padding: 0;
    display: flex;
    flex-direction: column;
`
function AddProject({handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} className="addProject">
            <label htmlFor="projectName">Name</label>
            <input id="projectName" name="projectName" type="text" required={true} />
            <input type="submit" value="Add" />
        </form>
    )
}

function ProjectListItem({ handleSelect, handleDelete, isSelected, project }) {
    
    const cn = "projectName" + (isSelected ? " selected" : "");
    return (
        <div className="projectListItem">
            <div 
                className={cn} 
                onClick={handleSelect} 
                onKeyPress={handleSelect}
                role="button" tabIndex={0}>
                {project.name}
            </div>
            <div 
                className="projectDelete" 
                onClick={handleDelete} 
                onKeyPress={handleDelete}
                role="button"
                tabIndex={0}>
                &times;
            </div>
        </div>
    )
}

function StatusSelect({ selected, id, name }) {
    return (
        <select 
            id={id}
            name={name}
            className="statusSelect"
            defaultValue={selected}
            >
            <option value={TASK_UNASSIGNED}>
                Unassigned
            </option>
            <option value={TASK_SOMETIME}>
                Sometime
            </option>
            <option value={TASK_LATER}>
                Later
            </option>
            <option value={TASK_SOON}>
                Soon
            </option>
            <option value={TASK_NOW}>
                Now
            </option>
            <option value={TASK_COMPLETED}>
                Completed
            </option>
        </select>
    )
}

function TaskForm({ task, handleSubmit }) {
    const [taskName, setTaskName] = useState(task ? task.name: "");
    const [taskStatus, setTaskStatus] = useState(task ? task.status : TASK_UNASSIGNED);
    return (
        <form onSubmit={(e) => {
            handleSubmit(e); 
            setTaskName("");
            setTaskStatus(TASK_UNASSIGNED);
        }} className="taskForm">
            <label htmlFor="taskName">Name</label>
            <input 
                type="text" 
                id="taskName" 
                name="taskName" 
                value={taskName} 
                onChange = {(e) => setTaskName(e.target.value)}
                required={true}
            />
            <label htmlFor="statusSelect">Status</label>
            <StatusSelect 
                id="statusSelect" 
                name="statusSelect" 
                selected={taskStatus} 
                onChange={(e) => setTaskStatus(e.target.value)}
            />
            <input type="submit" value={task ? "Edit" : "Add"} />
        </form>
    )
}

function TaskCol({ title, tasks, width="100%", height="100%", classArray=[]}) {
    const cn = ["taskContainer"].concat(classArray).join(" ");
    return(
        <div className={cn} style={{width: width, height: height}}>
            <h4>{title}</h4>
            {tasks.map((task) => <div className="taskCell" key={task.id}>{task.name}</div>)}
        </div>
    )
}


function TaskBoard({ project, handleNewTask, handleEditTask, handleDeleteTask }) {

    const [selectedTask, setSelectedTask] = useState(null);

    // sort tasks by status
    let taskMap = new Map();
    for (let task of project.tasks) {
        if (taskMap.has(task.status)) {
            const current = taskMap.get(task.status)
            taskMap.set(task.status, current.concat(task))
        } else {
            taskMap.set(task.status, [task])
        }
    }

    return (
        <>
            <h3>Tasks for {project.name}</h3>
            <div className="taskControl">
                <TaskForm task={selectedTask} handleSubmit={(e) => {
                    e.preventDefault()
                    const taskName = e.target.querySelector("input#taskName");
                    const taskStatus = e.target.querySelector("select#statusSelect");
                    handleNewTask({
                        id: uuidv4(),
                        name: taskName.value,
                        status: taskStatus.value
                    })
                    setSelectedTask(null);
                }}/>

            </div>
            <div className="taskBoard">
                <TaskCol 
                    title="Unassigned" 
                    tasks={getOrDefault(taskMap, TASK_UNASSIGNED, [])} 
                    width="20%"
                    classArray={["borderRight"]}
                />
                <div className="gridCol">
                    <TaskCol
                        title="Now"
                        tasks={getOrDefault(taskMap, TASK_NOW, [])}
                        width="100%"
                        classArray={["borderRight", "borderBottom"]}
                    />
                    <TaskCol
                        title="Later"
                        tasks={getOrDefault(taskMap, TASK_LATER, [])}
                        width="100%"
                    />
                </div>
                <div className="gridCol">
                    <TaskCol
                        title="Soon"
                        tasks={getOrDefault(taskMap, TASK_SOON, [])}
                        height="50%"
                    />
                    <TaskCol
                        title="Sometime"
                        tasks={getOrDefault(taskMap, TASK_SOMETIME, [])}
                        height="50%"
                        classArray={["borderLeft", "borderTop"]}
                    />
                </div>
                <TaskCol 
                    title="Completed" 
                    tasks={getOrDefault(taskMap, TASK_COMPLETED, [])} 
                    width="20%"
                    classArray={["borderLeft"]}
                />
            </div>
        </>
    )
}

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
                    <h3>Projects</h3>
                    <ProjectList>
                        {ProjectListItems}
                    </ProjectList>
                    
                </div>
                <div className="taskPane">
                    {currentProject !== null && 
                        <TaskBoard 
                            project={currentProject} 
                            handleNewTask={(task) => addTask(currentProject, task)}
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