import React, { Component, useEffect, useState } from 'react';
import GetObjectPropValues from '../../components/GetObjectPropValues/GetObjectPropValues';
import GetObjectPropValuesMonitor from '../../components/GetObjectPropValues/GetObjectPropValuesMonitor';
import Accordion from '../../components/Accordion/Accordion';
import ListTable from '../ListTable';

export default function ProjectsPage() {
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    const fetchUrl = '/Projects';


    useEffect(() => {
        fetch('api/Project' + fetchUrl)
            .then(response => response.json())
            .then(json => setData(json))
    }, []);

    function search(rows) {
        return rows.filter(row => row.projectName.toLowerCase().indexOf(q.toLowerCase()) > -1)
    }

    return (
        <div>
            Filter: <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            <br/>
            <br/>
            <ListTable data={search(data)} headings={["Id","Project name","Description","Source link","Technologies","Semester Id"]} url={'api/Project'} />
        </div>
    );
}
