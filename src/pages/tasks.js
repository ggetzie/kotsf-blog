import React, { useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import {v4 as uuidv4} from 'uuid';

import "../styles/tasks.css"


const ProjectPane = styled.div`
    width: 20%;
    height: 100%;
`

const TaskPane = styled.div`
    height: 100%;
    width: 80%;
`

const PaneHeading = styled.h3`
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
`

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
            <input name="projectName" type="text" required={true} />
            <input type="submit" value="Add" />
        </form>
    )
}

function ProjectListItem({ handleSelect, handleDelete, isSelected, project }) {
    
    const cn = "projectName" + (isSelected ? " selected" : "");
    return (
        <div className="projectListItem">
            <div className={cn} onClick={handleSelect}>{project.name}</div>
            <div 
                className="projectDelete" 
                onClick={handleDelete} 
                role="button">
                &times;
            </div>
        </div>
    )
}

const TASK_UNASSIGNED = "TASK_UNASSIGNED";
const TASK_COMPLETED = "TASK_COMPLETED";
const TASK_SOMETIME = "TASK_SOMETIME";
const TASK_LATER = "TASK_LATER";
const TASK_SOON = "TASK_SOON";
const TASK_NOW = "TASK_NOW";
function TaskBoard({ project, handleNewTask, handleEditTask, handleDeleteTask }) {

    // sort tasks by status
    let taskMap = new Map();
    for (let task of project.tasks) {
        if (taskMap.has(task.status)) {
            current = taskMap.get(task.status)
            taskMap.set(task.status, current.concat(task))
        } else {
            taskMap.set(task.status, [task])
        }
    }

    return (
        <div className="taskBoard">
            <div className="taskCol">
            </div>
            <div className="taskGrid">
                <div className="taskRow">
                    <div className="taskQuad">
                    </div>
                    <div className="taskQuad">
                    </div>
                </div>
                <div className="taskRow">
                    <div className="taskQuad">
                    </div>
                    <div className="taskQuad">
                    </div>
                </div>
            </div>
            <div className="taskCol">

            </div>
        </div>
    )
}

export default({ data }) => {
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    const currentProject = currentProjectId !== "" ? projects[currentProjectId]: {}

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
        setProjects(projects.filter(p => p.id !== id))
    }

    function getProject(id) {
        const filtered = projects.filter(p => p.id === id);
        return filtered.length === 0 ? null : filtered[0];
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

    function addTask(projectId, task) {
        const project = getProject(projectId);
        editProject(projectId, tasks=project.tasks.concat(task));
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
            <div className="taskMain" style={{fontSize: "1.2em"}}>
                <ProjectPane>
                    <PaneHeading>Add Project</PaneHeading>
                    <AddProject handleSubmit={(e) => {
                        e.preventDefault();
                        const nameField = e.target.querySelector("input[name='projectName']");
                        addProject(nameField.value);
                        nameField.value=""
                    }}/>
                    <PaneHeading>Projects</PaneHeading>
                    <ProjectList>
                        {ProjectListItems}
                    </ProjectList>
                    
                </ProjectPane>
                <TaskPane>
                    {currentProjectId !== null &&
                        <PaneHeading>
                            Tasks for {currentProject.name}
                        </PaneHeading> 
                    }
                </TaskPane>
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