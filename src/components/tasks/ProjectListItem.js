import React from 'react';

export function ProjectListItem({ handleSelect, handleDelete, isSelected, project }) {
    
    const cn = "itemName" + (isSelected ? " selected" : "");
    return (
        <div className="listItem">
            <div 
                className={cn} 
                onClick={handleSelect} 
                onKeyPress={handleSelect}
                role="button" tabIndex={0}>
                {project.name}
            </div>
            <div 
                className="itemDelete" 
                onClick={handleDelete} 
                onKeyPress={handleDelete}
                role="button"
                tabIndex={0}>
                &times;
            </div>
        </div>
    )
}