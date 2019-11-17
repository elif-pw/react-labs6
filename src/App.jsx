
import React, {Component} from 'react'
import MyComponent from "./MyComponent";
import AddEmployee from "./AddEmployee";
// const App = () => (
//   <h1>Minimal React</h1>
// )

class App extends Component{
    constructor(){
        super();
        this.state={
            employees:[],
            isFetching:false,
            addClicked: false
        }
    }
    onaddclick=(e)=>{
        this.setState({addClicked:true})
    }

    componentDidMount(){
        this.setState({isFetching:true});
        fetch('http://localhost:3004/employees')
            .then(response=>response.json())
            .then(data=>this.setState({employees:data}))
            .then(()=>this.setState({isFetching:false}));
    }

    toggleonclick=hide =>{
        hide? this.setState({addClicked:false}) :this.setState({addClicked:true})
    }

    render(){
        return(
            <div>
                {this.state.employees.map(empl=><li key={empl.id}>{empl.name}</li>)}
                <MyComponent isFetching={this.state.isFetching}/>

                <button onClick={this.onaddclick}>Add Employee</button>
                {this.state.addClicked? <AddEmployee toggle={this.toggleonclick}/> : ''}
            </div>

        )
    }


}

export default App