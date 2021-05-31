import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserImg from "../../components/Pictures/user.png";
import './SemesterPageViewStyle.css'


export default function UserPageView(props) {
    const [semester, setSemester] = useState({});
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/Semester/GetSemesterById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setSemester(json))
        }
        
        if (props.match.params.id !== undefined) {
            fetch('api/Semester/GetSemesterProjects/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setProjects(json))
        }
    }, []);

    function renderProjects(c) {
        return (
            <div>
                {c.map((row) =>
                    <div class="CommentCard">
                        <div class="CommentHeader">
                            <h5>
                                {row.projectName}
                            </h5>
                        </div>
                        <hr />
                        <div class="CommentContent">
                            <p>
                                {row.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (Object.keys(semester).length == 0) {
        return (
            <p>Semester not found</p>
        );
    }
    else if (semester.id == -1) {
        return (
            <p>Semester not found</p>
        );
    }
    else {
        let projectsToRender = projects.length > 0
            ? renderProjects(projects)
            : <p><em>There are no projets to this semester.</em></p>;

        return (
            <div>
                <table class="MainDisplayTable">
                    <tr>
                        <td>
                            <img id="UserImage" src={UserImg} />
                        </td>
                        <td>
                            <h2>
                                {semester.name}
                            </h2>
                            <table class="DataTable">
                                {Object.entries(semester).map(([key, value]) =>
                                    <tr key={key}>
                                        <td>
                                            {key}
                                        </td>
                                        <td>
                                            {value}
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </td>
                    </tr>
                </table>
                {projectsToRender}
            </div>
        );
    }
}