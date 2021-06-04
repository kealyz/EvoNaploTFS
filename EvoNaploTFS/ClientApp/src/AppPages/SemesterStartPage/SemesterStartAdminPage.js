﻿import React, { Component, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
/*import axios from 'axios';*/

const studentFieldsArray = [
    {
        id: '1',
        name: 'Student1'
    },
    {
        id: '2',
        name: 'Student2'
    },
    {
        id: '3',
        name: 'Student3'
    },
    {
        id: '4',
        name: 'Student4'
    },
    {
        id: '5',
        name: 'Student5'
    }
]

export default function SemesterStartAdminPage() {
    const [studentFields, updatestudentFields] = useState(studentFieldsArray);

    //function handleOnProjectDragEnd(result) {
    //    if (!result.destination) return;

    //    const items = Array.from(projectFields);
    //    const [reorderedItem] = items.splice(result.source.index, 1);
    //    items.splice(result.destination.index, 0, reorderedItem);

    //    updateprojectFields(items);
    //}

    function handleOnStudentDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(studentFields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updatestudentFields(items);
    }

    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    const fetchUrl = '/ProjectsOfCurrentSemester';
    const [columns, setColumns] = useState([]);
    console.log(data);

    useEffect(() => {
        fetch('api/Project' + fetchUrl)
            .then(response => response.json())
            .then(json => setData(json));
        console.log(data);
    }, []);

    if (data.length > 0) {
        return (
            <div>
                <h1>Join Semester</h1>
                <br />
                <br />
                <table class="DataListTable">
                    <thead>
                        <tr>
                            <th>
                                Projects
                        </th>
                            <th>
                                Students
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => 
                            <tr>
                                {<td>
                                    { row.projectName }
                                </td>}
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: 'right' }}>
                    <DragDropContext onDragEnd={handleOnStudentDragEnd}>
                        <Droppable droppableId="studentFields">
                            {(provided) => (
                                <ul className="studentFields" {...provided.droppableProps} ref={provided.innerRef}>
                                    {studentFields.map(({ id, name }, index) => {
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
                </div>
            </div>
        );
    }
    else {
        return (
            <h1>
                Loading...
            </h1>
            );
    }
}