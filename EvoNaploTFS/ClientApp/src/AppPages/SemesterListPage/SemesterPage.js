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
            //.then(json => console.log(json))
    }, []);

    
    function search(rows) {
        return rows.filter(row => row.startDate.toLowerCase().indexOf(q.toLowerCase()) > -1)
    }

    return (
        <div>
            Filter: <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            <a href="/AddSemesterPage" style={{ float: 'right' }}>
                <input type="button" value="Add Semester" />
            </a>
            <br />
            <br />
            <ListTable data={search(data)} url={'api/Semester'} />
        </div>
    );
}
