import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import DeleteButton from '../Create/Delete_Button';
import { Redirect } from 'react-router';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            students: []
        }
    }

    //get the students data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/home')
            .then((response) => {
                console.log(response.data);
                console.log("in CDM");
                //update the state with the response data
                this.setState({
                    students: this.state.students.concat(response.data)
                });
            });
    }

    DeleteStudentButton = (e) => {
       
    }

    render() {
        //iterate over students to create a table row
        let details = this.state.students.map(student => {
            return (
                <tr>

                    <td>{student.STUDENT_ID}</td>
                    <td>{student.STUDENT_NAME}</td>
                    <td>{student.STUDENT_DEPT}</td>
                    <td><DeleteButton studentid = {student.STUDENT_ID} value = "DELETE" /></td>
                    {/* <td><button onClick={this.DeleteStudentButton} class="btn btn-danger" type="submit">DELETE</button></td> */}
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Students</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>StudentID</th>
                                <th>StudentName</th>
                                <th>StudentDept</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;