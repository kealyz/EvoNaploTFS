import validate from "../EditSemesterPage/EditSemesterValidate";
import React, { useEffect, useState } from "react";

export default function EditUserPage(props) {
    const [semester, setSemester] = useState({
        id: '',
        startDate: '',
        endDate: '',
        isAppliable: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (props.match.params.id !== undefined) {
            fetch('api/Semester/GetSemesterToEditById/?id=' + props.match.params.id)
                .then(response => response.json())
                .then(json => setSemester({ id: json.id, startDate: json.startDate, endDate: json.endDate, isAppliable: json.isAppliable }))       
        }
    }, []);

    const handleChange = e => {
        setSemester({
            ...semester,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(semester));
        const returnedErrors = validate(semester);
        setErrors(returnedErrors);

        if (Object.keys(returnedErrors).length == 0) {
            fetch('api/Semester/EditSemester', { method: 'PUT', body: JSON.stringify(semester), headers: { "Content-Type": "application/json" } })
                .then(function (data) {
                    setSuccess(true);
                })
                .catch(function (error) {
                    setSuccess(false);
                });
            document.getElementById("editForm").reset();
        }
        else {
            setSuccess(false);
        }
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

        <div class="DivCard">
            <h1>Edit</h1>
            <form onSubmit={onSubmit} id="editForm">
                {/* register your input into the hook by invoking the "register" function */}
                <table>
                    <tr>
                        <td>
                            <input type="text" name="startDate" value={semester.startDate} placeholder="startDate" onChange={handleChange} />
                            {errors.startDate && <p class="ErrorParagraph">{errors.startDate}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="endDate" value={semester.endDate} placeholder="endDate" onChange={handleChange} />
                            {errors.endDate && <p class="ErrorParagraph">{errors.endDate}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="isAppliable" value={semester.isAppliable} placeholder="False" onChange={handleChange} />
                            {errors.isAppliable && <p class="ErrorParagraph">{errors.isAppliable}</p>}
                        </td>
                    </tr>
                </table>
                <input type="submit" />
            </form>
            {success && <p class="SuccessParagraph">User {semester.startDate} successfully edited.</p>}
        </div>
    );
}