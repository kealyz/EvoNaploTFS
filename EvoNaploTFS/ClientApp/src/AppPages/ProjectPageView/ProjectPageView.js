import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserImg from "../../components/Pictures/user.png";
import UnauthorizedPage from '../../components/Unauthorized';


export default function UserPageView(props) {
    const [project, setProject] = useState({});
    const [comments, setComments] = useState([]);


    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/Project/GetProjectById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setProject(json))
        }
        /*
        if (props.match.params.id !== undefined) {
            fetch('api/User/GetStudentComments/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setComments(json))
        }*/
    }, []);

    const [session, setSession] = useState();
    useEffect(() => {
        (
            async () => {
                const response = await fetch('api/Session', { method: 'GET' });
                const content = await response.json();

                await setSession(content);
            }
        )();
    }, []);

    function renderComments(c) {
        return (
            <div>
                {c.map((row) =>
                    <div class="CommentCard">
                        <div class="CommentHeader">
                            <h5>
                                {row.commenter}
                            </h5>
                        </div>
                        <hr />
                        <div class="CommentContent">
                            <p>
                                {row.comment}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (session !== undefined) {
        if (session.title !== "Unauthorized") {
            if (session.role !== "Student") {
                if (Object.keys(project).length == 0) {
                    return (
                        <p>Project not found</p>
                    );
                }
                else if (project.id == -1) {
                    return (
                        <p>Project not found</p>
                    );
                }
                else {
                    let commentsToRender = comments.length > 0
                        ? renderComments(comments)
                        : <p><em>There are no comments to this project.</em></p>;

                    return (
                        <div>
                            <table class="MainDisplayTable">
                                <tr>
                                    <td>
                                        <img id="UserImage" src={UserImg} />
                                    </td>
                                    <td>
                                        <h2>
                                            {project.name}
                                        </h2>
                                        <table class="DataTable">
                                            {Object.entries(project).map(([key, value]) =>
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
                            {commentsToRender}
                        </div>
                    );
                }
            }
        }
    }
    return (
        <UnauthorizedPage />
    );
}