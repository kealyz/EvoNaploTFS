import React, { useEffect, useState, useRef } from "react";
import '../Forms.css';
//import validate from "./RegisterValidate";
import EditSemesterValidate from '../EditSemesterPage/EditSemesterValidate'


const AddSemesterPage = () => {
    const [semester, setSemester] = useState({
        startDate: '',
        endDate: '',
        isAppliable: ''
    });

    const [errors, setErrors] = useState({});

    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setSemester({
            ...semester,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault()

        const returnedErrors = EditSemesterValidate(semester);
        setErrors(returnedErrors);

        if (Object.keys(returnedErrors).length == 0) {
            console.log(JSON.stringify(semester));
            fetch('api/Semester/AddSemester', { method: 'POST', body: JSON.stringify(semester), headers: { "Content-Type": "application/json" } })
                .then(function (data) {
                    setSuccess(true);
                })
                .catch(function (error) {
                    setSuccess(false);
                });
            document.getElementById("registrationForm").reset();
        }
        else {
            setSuccess(false);
        }

    }

    return (
        <div class="DivCard">
            <h1>Registration</h1>
            <form onSubmit={onSubmit} id="registrationForm">
                {/* register your input into the hook by invoking the "register" function */}
                <table>
                    <tr>
                        <td>
                            <input type="text" name="startDate" value={semester.startDate} placeholder="StartDate" onChange={handleChange} />
                            {errors.startDate && <p class="ErrorParagraph">{errors.startDate}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="endDate" value={semester.endDate} placeholder="EndDate" onChange={handleChange} />
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
            {success && <p class="SuccessParagraph">Semester {semester.startDate} : {semester.endDate} successfully added.</p>}
            <a href="/Semesters" class="joffan">
                Back
             </a>
            
        </div>
    );
}

export default AddSemesterPage;