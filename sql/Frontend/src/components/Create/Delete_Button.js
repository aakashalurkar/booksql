import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';

//Create a Main Component
class Delete_Button extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log(this.props.studentid);
        // this.props.onKeyPressed(this.props.value);
        var headers = new Headers();

        const data = {
            StudentID: this.props.studentid
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
            <button class="btn btn-danger" onClick={this.onClick} value={this.props.value}>{this.props.studentid}</button>
        )
    }
}
//Export The Main Component
export default Delete_Button;