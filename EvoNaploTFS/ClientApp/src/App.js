import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import StudentsPage from './AppPages/StudentListPage/StudentsPage'
import  MentorsPage  from './AppPages/MentorListPage/MentorsPage'
import { ProjectsPage } from './AppPages/ProjectListPage/ProjectsPage'
import  RegisterPage  from './AppPages/RegisterPage/RegisterPage';
import AdminsPage from './AppPages/AdminListPage/AdminsPage';
import SemesterPage from './AppPages/SemesterListPage/SemesterPage';
import UserPageView from './AppPages/UserPageView/UserPageView';
import EditUserPage from './AppPages/EditUserPage/EditUserPage';
import SemesterPageView from './AppPages/SemesterPageView/SemesterPageView';
import EditSemesterPage from './AppPages/EditSemesterPage/EditSemesterPage';

import './custom.css'
import './components/Accordion.css'


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/Students' component={StudentsPage} />
                <Route path='/Mentors' component={MentorsPage} />
                <Route path='/Admins' component={AdminsPage} />
                <Route path='/Projects' component={ProjectsPage} />
                <Route path='/Semesters' component={SemesterPage} />
                <Route path='/Register' component={RegisterPage} />
                <Route path='/UserPageView/:id' component={UserPageView} />
                <Route path='/EditUserPage/:id' component={EditUserPage} />
                <Route path='/SemesterPageView/:id' component={SemesterPageView} />
                <Route path='/EditSemesterPage/:id' component={EditSemesterPage} />          
            </Layout>
        );
    }
}
