import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserImg from "../../components/Pictures/user.png";
import './UserPageView.css'


export default function UserPageView(props) {
    const [user, setUser] = useState({ Name: "", IsActive: "", Email: "", Phone: "" });
    const [comments, setComments] = useState([]);


    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/User/GetUserById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setUser({ Name: json.name, IsActive: json.isActive, Email: json.email, Phone: json.phoneNumber }))
        }
        if (props.match.params.id !== undefined) {
            fetch('api/User/GetStudentComments/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setComments(json))
        }
    }, []);

    function renderComments(c) {
        return (
            <div>
                <h3 class="h3Label">Comments to {user.name}</h3>
                {c.map((row) =>
                    <div class="CommentCard">
                        <h5>
                            {row.commenter}:
                        </h5>
                        <hr />
                        <p>
                            {row.comment}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    function renderUserData() {
        return (
            <table class="userDataTable">
                {Object.entries(user).map(([key, value]) => {
                    if (key != "Name") {
                        return (
                            <tr>
                                <td>{key}:</td>
                                <td>{value}</td>
                            </tr>
                        )
                    };
                })}
            </table>
        );
    }

    if (Object.keys(user).length == 0) {
        return (
            <p>User not found</p>
        );
    }
    else if (user.id == -1) {
        return (
            <p>User not found</p>
        );
    }
    else {
        let commentsToRender = comments.length > 0
            ? renderComments(comments)
            : <p><em>There are no comments to this student.</em></p>;

        return (
            <div class="DivCard">
                <table class="MainDisplayTable">
                    <tr>
                        <td>
                            <img id="UserImage" src={UserImg} />
                        </td>
                        <td>
                            <h2>
                                {user.Name}
                            </h2>
                            {renderUserData()}
                        </td>
                    </tr>
                </table>
                {commentsToRender}
                <form class="comment-creation">
                    <h3 class="h3Label">Create a comment</h3>
                    <textarea placeholder="Comment" rows="4" onChange="UpdateComment()" />
                    <input type="submit" value="Create comment" />
                </form>
            </div>
        );
    }
}