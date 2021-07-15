import React, { useEffect, useState } from 'react';
import UserImg from "../../components/Pictures/user.png";
import '../../AppPages/UserPageView/UserPageView.css'
import UnauthorizedPage from '../../components/Unauthorized';


export default function MyAccountPage() {
    const [user, setUser] = useState({ Id: 0, Name: "", IsActive: "", Email: "", Phone: "" });
    const [session, setSession] = useState();
    const [myProjects, setMyProjects] = useState();

    useEffect(() => {
        (
            async () => {
                const response = await fetch('api/Session', { method: 'GET' });
                const content = await response.json();

                await setSession(content);
            }
        )();
    }, []);

    useEffect(() => {
        if (session !== undefined) {
            if (session.title !== "Unauthorized") {
                fetch('api/User/GetUserById/?id=' + session.id)
                    .then(response => response.json())
                    .then(json => setUser({ Id: json.id, Name: json.name, IsActive: json.isActive, Email: json.email, Phone: json.phoneNumber }));
            }
        }
    }, [session]);

    useEffect(() => {
        if (session !== undefined) {
            if (session.title !== "Unauthorized") {
                fetch('api/Project/MyProjects/?userId=' + session.id)
                    .then(response => response.json())
                    .then(json => setMyProjects(json));
            }
        }
    }, [session]);

    function renderUserData() {
        return (
            <table class="userDataTable">
                {Object.entries(user).map(([key, value]) => {
                    if (key != "Name" && key != "Id") {
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

    function GetMyProjects() {
        if (myProjects !== undefined) {
            return (
                <div>
                    <h3>Your projects</h3>
                    <ul>
                        {
                            myProjects.map(project => {
                                return (<li>{project.projectName}</li>);
                            })
                        }
                    </ul>
                </div>
            );
        }
        return (
            <h3>You have no projects yet.</h3>
        );
    }

    if (session !== undefined) {
        if (session.title !== "Unauthorized") {
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

                    {GetMyProjects()}

                </div>
            );
        }
    }
    return (
        <UnauthorizedPage />
    );
}