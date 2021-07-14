import React, { useEffect, useState, useRef } from "react";
import '../Forms.css';
//import validate from "./RegisterValidate";
import EditSemesterValidate from '../EditSemesterPage/EditSemesterValidate'
import UnauthorizedPage from '../../components/Unauthorized';


const AddSemesterPage = () => {

    const [project, setSemester] = useState({
        startDate: '',
        endDate: '',
        isAppliable: false
    });

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


    const [errors, setErrors] = useState({});

    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setSemester({
            ...project,
            [e.target.name]: e.target.value
        });
        if (e.target.name === "isAppliable") {
            setSemester({
                ...project,
                [e.target.name]: e.currentTarget.value === 'true' ? true : false
            })
        }
        console.log(project);
    }
    //{"startDate": "2088-01-01T00:00:00", "endDate": "2088-01-01T00:00:00", "isAppliable": true}

    const onSubmit = e => {
        e.preventDefault()

        const returnedErrors = EditSemesterValidate(project);
        setErrors(returnedErrors);

        if (Object.keys(returnedErrors).length == 0) {
           
            console.log(project);
            fetch('api/Semester/AddSemester', { method: 'POST', body: JSON.stringify(project), headers: { "Content-Type": "application/json" } })
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

    if (session !== undefined) {
        if (session.title !== "Unauthorized") {
            if (session.role === "Admin") {
                return (
                    <div class="DivCard">
                        <h1>Registration</h1>
                        <form onSubmit={onSubmit} id="registrationForm">
                            {/* register your input into the hook by invoking the "register" function */}
                            <table>
                                <tr>
                                    <td>
                                        <input type="text" name="startDate" value={project.startDate} placeholder="StartDate" onChange={handleChange} />
                                        {errors.startDate && <p class="ErrorParagraph">{errors.startDate}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" name="endDate" value={project.endDate} placeholder="EndDate" onChange={handleChange} />
                                        {errors.endDate && <p class="ErrorParagraph">{errors.endDate}</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/*<input type="checkbox" name="isAppliable" value="ture" onChange={handleChange} />*/}
                                        <label >isAppliable</label><br />
                                        <input type="radio" id="isAppliableTrue" name="isAppliable" value={true} onChange={handleChange} checked={project.isAppliable === true} />
                                        <label for="isAppliableTrue">True</label><br />
                                        <input type="radio" id="isAppliableFalse" name="isAppliable" value={false} onChange={handleChange} checked={project.isAppliable === false} />
                                        <label for="isAppliableFalse">False</label><br />
                                    </td>
                                </tr>
                            </table>
                            <input type="submit" />
                        </form>
                        {success && <p class="SuccessParagraph">Semester {project.startDate} : {project.endDate} successfully added.</p>}
                        <a href="/Semesters" class="joffan">
                            Back
             </a>

                    </div>
                );
            }
        }
    }
    return (
        <UnauthorizedPage />
    );
}
//<input type="checkbox" name="isAppliable" value={project.isAppliable} onChange={handleChange} />
//<input type="text" name="isAppliable" value={project.isAppliable} placeholder="False" onChange={handleChange} />
//{ errors.isAppliable && <p class="ErrorParagraph">{errors.isAppliable}</p> }
export default AddSemesterPage;