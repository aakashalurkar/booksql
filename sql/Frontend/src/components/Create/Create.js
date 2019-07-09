import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{

    constructor(props){
        super(props);

        this.state = {
            StudentID : "",
            StudentName : "",
            StudentDept : "",
            authFlag : false
        }

        this.StudentIDChangeHandler = this.StudentIDChangeHandler.bind(this);
        this.StudentNameChangeHandler = this.StudentNameChangeHandler.bind(this);
        this.StudentDeptChangeHandler = this.StudentDeptChangeHandler.bind(this);
        this.CreateStudentButton = this.CreateStudentButton.bind(this);

    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    StudentIDChangeHandler = (e) => {
        this.setState({
            StudentID : e.target.value
        })
    }

    StudentNameChangeHandler = (e) => {
        this.setState({
            StudentName : e.target.value
        })
    }

    StudentDeptChangeHandler = (e) => {
        this.setState({
            StudentDept : e.target.value
        })
    }

    CreateStudentButton = (e) => {
        var headers = new Headers();

        e.preventDefault();
        const data = {
            StudentID : this.state.StudentID,
            StudentName : this.state.StudentName,
            StudentDept : this.state.StudentDept
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/create',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    authFlag : true
                })
                return window.location.href = '/home';
            }else{
                this.setState({
                    authFlag : false
                })
            }
        });
    }

    render(){

        return(
            <div>
              
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.StudentIDChangeHandler} type="text" class="form-control" name="StudentID" placeholder="StudentID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.StudentNameChangeHandler} type="text" class="form-control" name="StudentName" placeholder="StudentName"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.StudentDeptChangeHandler}  type="text" class="form-control" name="StudentDept" placeholder="StudentDept"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.CreateStudentButton} class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;