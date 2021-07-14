import React, { useEffect, useState } from 'react';
import UserImg from "../../components/Pictures/user.png";
import '../../AppPages/UserPageView/UserPageView.css'


export default function MyAccountPage(props) {
    const [user, setUser] = useState({ Id: 0, Name: "", IsActive: "", Email: "", Phone: "" });


    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/User/GetUserById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setUser({ Id: json.id, Name: json.name, IsActive: json.isActive, Email: json.email, Phone: json.phoneNumber }))
        }   
    }, []);

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
            </div>
        );
    }
}