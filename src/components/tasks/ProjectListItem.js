import React from 'react';

export function ProjectListItem({ handleSelect, handleDelete, isSelected, project }) {
    
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