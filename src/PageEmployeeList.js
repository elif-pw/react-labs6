import React, {Component} from 'react'
import PageEmployee from "./PageEmployee";
import { withRouter } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class PageEmployeeList extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
            isFetching: false,
            deletingId: ''
        }
        this.update = this.update.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }


    componentDidMount() {
        this.update();
    }

    update() {
        this.setState({isFetching: true});

        fetch('http://localhost:3004/employees')

            .then(response => response.json())
            .then(data => this.setState({employees: data}))
            .then(() => this.setState({isFetching: false}))
        ;


    }

    deleteHandler(id) {
        this.setState({deletingId: id});

        fetch(`http://localhost:3004/employees/${id}`, {
            method: "Delete",
            headers: {"Content-Type": "application/json"}
        })
            .then(() => this.setState({deletingId: ''}))
            .then(() => this.update());
    }


    render() {
        return (
            <div>
                {this.state.isFetching ? <b>Loading...</b> :
                    <h3>In total there are {this.state.employees.length} employees</h3>}
                {this.state.employees.map(empl => <div> {this.state.deletingId === empl.id ?
                    <b>Deleting...</b> :
                    <div><b style={{ color: 'red' }}>{empl.name}  </b>
                        <b style={{ color: 'black' }}>{empl.company}  </b>
                        <b style={{ color: 'grey' }}>{  empl.id}  </b>
                        <b style={{ color: 'green' }}>{empl.age}  </b>
                        <b style={{ color: 'orange' }}>{empl.isActive ? 'active' : 'not active'}  </b>
                        <button onClick={this.deleteHandler.bind(this, empl.id)}>Delete</button>
                    </div>}
                </div>)}
                <br/>
                <Link to="/new">
                <button >Create new employee</button>
                </Link>
                    <br/>
            </div>

        )
    }


}

export default withRouter(PageEmployeeList)