import React, { Component, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const projectFieldsArray = [
    {
        id: '1',
        name: 'EvoSavanna'
    },
    {
        id: '2',
        name: 'EvoCemetary'
    },
    {
        id: '3',
        name: 'EvoBoi'
    },
    {
        id: '4',
        name: 'EvoProject2'
    },
    {
        id: '5',
        name: 'EvoProjectPlus'
    }
]

function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth]);
        };
        window.addEventListener("resize", handleResize);
    }, []);

    return size;
}

export default function SemesterStartStudentPage() {
    const [projectFields, updateprojectFields] = useState(projectFieldsArray);
    const [height, width] = useWindowSize();

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(projectFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateprojectFields(items);
    }

    if (width > 600) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Join Semester</h1>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="projectFields">
                            {(provided) => (
                                <ul className="projectFields" {...provided.droppableProps} ref={provided.innerRef}>
                                    {projectFields.map(({ id, name }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <p>
                                                            {name}
                                                        </p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </header>
            </div>
        );
    }
    else {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Join Semester</h1>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="projectFields">
                            {(provided) => (
                                <ul className="projectFields" {...provided.droppableProps} ref={provided.innerRef}>
                                    {projectFields.map(({ id, name, thumb }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <p>
                                                            {name}
                                                        </p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </header>
            </div>
        );
    }
}