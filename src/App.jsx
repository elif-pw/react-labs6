
import React, {Component} from 'react'
import MyComponent from "./MyComponent";
// const App = () => (
//   <h1>Minimal React</h1>
// )

class App extends Component{
    constructor(){
        super();
        this.state={
            employees:[],
            isFetching:false
        }
    }

    componentDidMount(){
        this.setState({isFetching:true});
        fetch('http://localhost:3004/employees')
            .then(response=>response.json())
            .then(data=>this.setState({employees:data}))
            .then(()=>this.setState({isFetching:false}));
    }

    render(){
        return(
            <div>
                {this.state.employees.map(empl=><li key={empl.id}>{empl.name}</li>)}
                <MyComponent isFetching={this.state.isFetching}/>
            </div>

        )
    }


}

export default App