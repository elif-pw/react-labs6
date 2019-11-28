
import React, {Component} from 'react'
import AddEmployee from "./PageEmployee";


class PageEmployeeList extends Component{
    constructor(){
        super();
        this.state={
            employees:[],
            isFetching:false,
            addClicked: false,
            deletingId:''
        }
        this.update=this.update.bind(this);
        this.deleteHandler=this.deleteHandler.bind(this);
    }
    onaddclick=(e)=>{
        this.setState({addClicked:true})
    }

    componentDidMount(){
        this.update();
    }
    update(){
        this.setState({isFetching:true});

        fetch('http://localhost:3004/employees')

            .then(response=>response.json())
            .then(data=>this.setState({employees:data}))
            .then(()=>this.setState({isFetching:false}))
            .then(()=>this.toggleonclick(true))
        ;



    }

    toggleonclick=hide =>{
        hide? this.setState({addClicked:false}) :this.setState({addClicked:true})
    }

    deleteHandler(id) {
        this.setState({ deletingId:id });

        fetch(`http://localhost:3004/employees/${id}`, {
            method: "Delete",
            headers: { "Content-Type": "application/json" }
        })
            .then(()=>this.setState({ deletingId:'' }))
            .then(()=>this.update());
    }



    render(){
        return(
            <div>
                <h3>In total there are {this.state.employees.length} employees</h3>
                {this.state.employees.map(empl=><li key={empl.id}>
                    {this.state.deletingId === empl.id ? <b>Deleting...</b>: <div>{empl.name}  {empl.company}  {empl.id} {empl.age} {empl.isActive? 'active' : 'not active'} <button onClick={this.deleteHandler.bind(this, empl.id)}>Delete</button></div> }
                </li>)}
                <button onClick={this.onaddclick}>Add Employee</button>
                {this.state.addClicked? <AddEmployee toggle={this.toggleonclick} update={this.update}/> : ''}


            </div>

        )
    }


}

export default PageEmployeeList