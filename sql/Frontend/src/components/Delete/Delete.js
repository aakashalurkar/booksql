import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentID: "",
            authFlag: false
        }

        this.StudentIDChangeHandler = this.StudentIDChangeHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    StudentIDChangeHandler = (e) => {
        this.setState({
            StudentID: e.target.value
        })
    }

    DeleteStudentButton = (e) => {
        var headers = new Headers();

        e.preventDefault();
        const data = {
            StudentID: this.state.StudentID
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/delete', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                    return window.location.href = '/home';
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    render() {

        return (
            <div>
               
                <div class="container">
                    <form>
                        <div style={{ width: "50%", float: "left" }} class="form-group">
                            <input onChange={this.StudentIDChangeHandler} type="text" class="form-control" name="StudentID" placeholder="Search a student by ID" />
                        </div>
                        <div style={{ width: "50%", float: "right" }}>
                            <button onClick={this.DeleteStudentButton} class="btn btn-success" type="submit">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Delete;