
import React, {Component} from 'react'
import AddEmployee from "./AddEmployee";


class App extends Component{
    constructor(){
        super();
        this.state={
            employees:[],
            isFetching:false,
            addClicked: false
        }
        this.update=this.update.bind(this);
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
            .then(()=>this.toggleonclick(true));

    }

    toggleonclick=hide =>{
        hide? this.setState({addClicked:false}) :this.setState({addClicked:true})
    }

    render(){
        return(
            <div>
                <h3>In total there are {this.state.employees.length} employees</h3>
                {this.state.employees.map(empl=><li key={empl.id}>
                    {empl.name}   {empl.id}   {empl.isActive? 'active' : 'not active'}  {empl.age}
                </li>)}
                <button onClick={this.onaddclick}>Add Employee</button>
                {this.state.addClicked? <AddEmployee toggle={this.toggleonclick} update={this.update}/> : ''}
            </div>

        )
    }


}

export default App