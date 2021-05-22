import React, { Component } from 'react';
import GetObjectPropValues from '../../components/GetObjectPropValues/GetObjectPropValues';
import Accordion from '../../components/Accordion/Accordion';

export class ProjectsPage extends Component {
    static displayName = ProjectsPage.name;

    constructor(props) {
        super(props);
        this.state = { projects: [], loading: true };
    }

    componentDidMount() {
        this.populateProjectsData();
    }

    static renderProjectsTable(projects) {
        return (
            <div>
                {projects.map(project =>
                    <Accordion title={project.name} content={GetObjectPropValues(project)} />
                )}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ProjectsPage.renderProjectsTable(this.state.projects);

        return (
            <div>
                <h1 id="tabelLabel" >Project forecast :)</h1>
                <p>Ló.</p>
                {contents}
            </div>
        );
    }

    async populateProjectsData() {
        const response = await fetch('api/Project');
        const data = await response.json();
        this.setState({ projects: data, loading: false });
        console.log("aaaa");
        //fetch('api/Student')
        //    .then(response => response.json())
        //    .then(users => console.warn(users))

        //this.setState({ students: users, loading: false });
    }
}
