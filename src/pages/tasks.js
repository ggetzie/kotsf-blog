import React, { useState } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import {v4 as uuidv4} from 'uuid';

const TaskMain = styled.div`
    min-height: calc(-50px + 100vh);
    display: flex;
    flex-direction: row;
`

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="projectName">Name</label>
            <input name="projectName" type="text" style={{width:"100%", boxSizing:"border-box"}} />
            <input type="submit" value="Add" style={{display: "block", width:"100%"}} />

        </form>
    )
}

function ProjectListItem({ handleClick, isSelected, project }) {
    const baseStyle = {
        textAlign: "center",
        borderRadius: "0.2em",
        width: "100%",
        display: "block",
        margin: 0,
        padding: 0,
        cursor: "pointer"
    }
    const selectedStyle = {
        ...baseStyle,
        backgroundColor: "#AFB5F1",
        color: "white"
    }

    const unselectedStyle = {
        ...baseStyle,
        backgroundColor: "white",
        color: "black"
    }
    return (
        <div onClick={handleClick} style={isSelected ? selectedStyle : unselectedStyle}>
            {project.name}
        </div>
    )
}

export default({ data }) => {
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState("");

    const currentProject = currentProjectId !== "" ? projects.filter(p => p.id === currentProjectId)[0] : {}

    return (
        <Layout>
            <Helmet title={"Task Manager - " + data.site.siteMetadata.title} />
            <h2 style={{textAlign: "center", width: "100%"}}>Task Manager</h2>
            <TaskMain>
                <ProjectPane>
                    <AddProject handleSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target);
                        const nameField = e.target.querySelector("input[name='projectName']");
                        setProjects(projects.concat({
                            id: uuidv4(),
                            name: nameField.value,
                            tasks: []
                        }))
                        nameField.value=""
                    }}/>
                    <PaneHeading>Projects</PaneHeading>
                    <ProjectList>
                        {projects.map((p) => <ProjectListItem 
                                                key={p.id}
                                                project={p}
                                                isSelected={currentProjectId === p.id}
                                                handleClick={() => currentProjectId === p.id ? setCurrentProjectId("") : setCurrentProjectId(p.id)} />
                        )}
                    </ProjectList>
                    
                </ProjectPane>
                <TaskPane>
                    {currentProjectId !== "" &&
                        <PaneHeading>
                            Tasks for {currentProject.name}
                        </PaneHeading> 
                    }
                </TaskPane>
            </TaskMain>
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