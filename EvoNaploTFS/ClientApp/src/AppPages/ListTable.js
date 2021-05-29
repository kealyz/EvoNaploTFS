import React, { useEffect, useState } from 'react';
import GetObjectPropValues from '../components/GetObjectPropValues/GetObjectPropValues';
import Accordion from '../components/Accordion/Accordion';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import './ListTable.css'
import { Redirect } from 'react-router-dom';

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

function RemoveContent(row, url) {
    alert("Remove data with id [" + row + "] (" + url + ")");
    url = url + "/DELETE/?ID=" + row;
    fetch(url, { method: 'DELETE' });
    window.location.reload(false);
}

function EditContent(row, url) {
    alert("Edit data with id [" + row + "] (" + url + ")");
}

function ViewContent(row, url) {
    alert("Edit data with id [" + row + "] (" + url + ")");
}

export default function RenderTable(props) {
    const columns = props.data[0] && Object.keys(props.data[0]);
    const [height, width] = useWindowSize();
    const users = props.data;
    var pageViewURL;//= "UserPageView/";
    var editPageURL;// = "EditUserPage/";

    switch (props.url) {
        case 'api/User':
            pageViewURL = "UserPageView/";
            editPageURL = "EditUserPage/";
            break;
        case 'api/Semester':
            pageViewURL = "SemesterPageView/";
            editPageURL = "EditSemesterPage/";
            break;
        case 'api/Project':
            pageViewURL = "ProjectPageView/";
            editPageURL = "EditProjectsPage/";
            break;
        default:
        // code block
    }
    

    if (width > 600) {
        return (
            <div>
                <table class="DataListTable">
                    <thead>
                        <tr>
                            {props.data[0] && columns.map((heading) => <th>{heading}</th>)}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((row) =>
                            <tr>
                                {columns.map((column) =>
                                    <td>{row[column]}</td>
                                )}
                                <td>
                                    <a href={pageViewURL + row.id}>
                                        <BsEye className="ActionIcon ViewIcon" onClick={() => ViewContent(row.id, props.url)} />
                                    </a>
                                    <a href={editPageURL + row.id}>
                                        <BsPencil class="ActionIcon EditIcon" onClick={() => EditContent(row.id, props.url)} />
                                    </a>
                                    <BsTrashFill class="ActionIcon RemoveIcon" onClick={() => RemoveContent(row.id, props.url)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (
            <div>
                {props.data.map(student =>
                    <Accordion title={student.name} content={GetObjectPropValues(student)} />
                )}
            </div>
        );
    }

}