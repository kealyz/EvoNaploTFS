import React, { Component, useEffect, useState } from 'react';
import GetObjectPropValues from '../../components/GetObjectPropValues/GetObjectPropValues';
import GetObjectPropValuesMonitor from '../../components/GetObjectPropValues/GetObjectPropValuesMonitor';
import Accordion from '../../components/Accordion/Accordion';
import ListTable from '../ListTable';

export default function StudentsPage() {
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    const fetchUrl = '/Semesters';


    useEffect(() => {
        fetch('api/Semester' + fetchUrl)
            .then(response => response.json())
            .then(json => setData(json))
    }, []);

    
    function search(rows) {
        return rows.filter(row => row.startDate.toLowerCase().indexOf(q.toLowerCase()) > -1)
    }

    return (
        <div>
            Filter: <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            <form class="AddSemesterButton" action="/AddSemesterPage" style={{ textAlign: 'right' }}>
                <input type="submit" value="Add Semester" />
            </form>
            <br />
            <br />
            <ListTable data={search(data)} url={'api/Semester'} />
        </div>
    );
}
