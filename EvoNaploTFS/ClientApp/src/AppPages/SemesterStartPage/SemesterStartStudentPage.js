import React, { Component, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '@atlaskit/css-reset';
import styled from 'styled-components';
import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

//const projectFieldsArray = [
//    {
//        id: '1',
//        name: 'EvoSavanna'
//    },
//    {
//        id: '2',
//        name: 'EvoCemetary'
//    },
//    {
//        id: '3',
//        name: 'EvoBoi'
//    },
//    {
//        id: '4',
//        name: 'EvoProject2'
//    },
//    {
//        id: '5',
//        name: 'EvoProjectPlus'
//    }
//]

//function useWindowSize() {
//    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

//    useEffect(() => {
//        const handleResize = () => {
//            setSize([window.innerHeight, window.innerWidth]);
//        };
//        window.addEventListener("resize", handleResize);
//    }, []);

//    return size;
//}

export default function SemesterStartStudentPage() {
    const [projectFields, updateprojectFields] = useState(initialData);
    /*const [height, width] = useWindowSize();*/

    function handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = projectFields.columns[source.droppableId];
        const finish = projectFields.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...projectFields,
                columns: {
                    ...projectFields.columns,
                    [newColumn.id]: newColumn,
                },
            };

            updateprojectFields(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...projectFields,
            columns: {
                ...projectFields.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        updateprojectFields(newState);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Container>
                {projectFields.columnOrder.map(columnId => {
                    const column = projectFields.columns[columnId];
                    const tasks = column.taskIds.map(
                        taskId => projectFields.tasks[taskId],
                    );

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </Container>
        </DragDropContext>
    );

    //function handleOnDragEnd(result) {
    //    if (!result.destination) return;

    //    const items = Array.from(projectFields);
    //    const [reorderedItem] = items.splice(result.source.index, 1);
    //    items.splice(result.destination.index, 0, reorderedItem);

    //    updateprojectFields(items);
    //}

    //if (width > 600) {
    //    return (
    //        <div className="App">
    //            <header className="App-header">
    //                <h1>Join Semester</h1>
    //                <DragDropContext onDragEnd={handleOnDragEnd}>
    //                    <Droppable droppableId="projectFields">
    //                        {(provided) => (
    //                            <ul className="projectFields" {...provided.droppableProps} ref={provided.innerRef}>
    //                                {projectFields.map(({ id, name }, index) => {
    //                                    return (
    //                                        <Draggable key={id} draggableId={id} index={index}>
    //                                            {(provided) => (
    //                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    //                                                    <p>
    //                                                        {name}
    //                                                    </p>
    //                                                </li>
    //                                            )}
    //                                        </Draggable>
    //                                    );
    //                                })}
    //                                {provided.placeholder}
    //                            </ul>
    //                        )}
    //                    </Droppable>
    //                </DragDropContext>
    //            </header>
    //        </div>
    //    );
    //}
    //else {
    //    return (
    //        <div className="App">
    //            <header className="App-header">
    //                <h1>Join Semester</h1>
    //                <DragDropContext onDragEnd={handleOnDragEnd}>
    //                    <Droppable droppableId="projectFields">
    //                        {(provided) => (
    //                            <ul className="projectFields" {...provided.droppableProps} ref={provided.innerRef}>
    //                                {projectFields.map(({ id, name, thumb }, index) => {
    //                                    return (
    //                                        <Draggable key={id} draggableId={id} index={index}>
    //                                            {(provided) => (
    //                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
    //                                                    <p>
    //                                                        {name}
    //                                                    </p>
    //                                                </li>
    //                                            )}
    //                                        </Draggable>
    //                                    );
    //                                })}
    //                                {provided.placeholder}
    //                            </ul>
    //                        )}
    //                    </Droppable>
    //                </DragDropContext>
    //            </header>
    //        </div>
    //    );
    //}
}
