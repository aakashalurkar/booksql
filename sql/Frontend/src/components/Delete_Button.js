import React, { Component } from 'react';
import '../../App.css';

class Delete_Button extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log(this.props.sid);
    }

    render() {
        return (
            <button class="btn btn-outline-dark" onClick={this.onClick} type = "submit">DELETE</button>
        )
    }
}

export default Delete_Button;