import React, {Component} from 'react';


class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                id: '',
                isActive: false,
                age: '',
                name: '',
                company: '',
                email: '',

            },
            hide:true,


        }
    }

    /* This life cycle hook gets executed when the component mounts */

    handleFormSubmit= async (event) => {
        event.preventDefault();
        //this.props.onSubmit(resp.data);
        fetch("http://localhost:3004/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `${Math.random()
                    .toString(36)
                    .substring(7)}`,
                name: this.name.value,
                company: this.company.value,
                age: this.age.value,
                email: this.email.value,
                isActive: this.isActive.checked
            })
        })

    };


    onActivityChanged= (e)=> {
        this.setState({
            isActive: e.currentTarget.value
        });
    }

    handleCancel=e=>{
        this.setState({hide:true});
        this.props.toggle(this.state.hide);
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <fieldset>
                <h3 className="formtext">Form </h3>
                <label>Is User Active?</label>
                <input type="radio" name="isActive"
                       value={this.state.isActive}
                       // checked={this.state.isActive}
                       onChange={this.onActivityChanged} />
                <br/>
                    <br/>
                <input
                    type="number"
                    value={this.state.age}
                    placeholder="Enter Age"
                    required
                />
                <br/><br/>
                <input
                    type="text"
                    value={this.state.name}
                    placeholder="Enter Name"
                    required
                />
                <br/>
                    <br/>
                <input
                    type="text"
                    value={this.state.company}
                    placeholder="Enter Company Name"
                    required
                />
                <br/>
                    <br/>
                <input
                    type="email"
                    value={this.state.email}
                    placeholder="Enter email"
                    required
                />
                    <br/><br/>
                <button type="submit">Submit</button>
                <br/><br/>
                <button   type="button"
                          onClick={this.handleCancel}>Cancel</button>
                </fieldset>
            </form>
        );
    }


}

export default AddEmployee;