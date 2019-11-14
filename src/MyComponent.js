import React, {Component} from 'react'


class MyComponent extends Component{
    constructor(props){
        super(props);
        console.log("Constructor")
    }

    componentDidMount() {
    console.log("DidMount")
    }

    render() {
        console.log("Render");
        return (
            <div>
                {this.props.isFetching ? <label>Loading...</label>:<label>Loaded</label>}

            </div>
        );
    }


}

export default MyComponent