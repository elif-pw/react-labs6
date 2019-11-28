import React, {Component} from 'react'
import PageEmployee from "./PageEmployee";
import PageEmployeeList from "./PageEmployeeList";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <PageEmployeeList/>
            </Route>
            <Route path="/new">
                <PageEmployee/>
            </Route>
        </Switch>
    </Router>
)


export default App