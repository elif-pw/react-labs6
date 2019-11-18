import React, {Component} from 'react';


class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {

            id: '',
            isActive: false,
            age: 0,
            name: '',
            company: '',
            email: '',
            hide: true,
            isSaving: false


        }
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onActivityChanged = this.onActivityChanged.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    generateid() {
        //1st trial
        //  return [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('').toLowerCase()
        //2nd trial
        //   function chr4(){
        //       return Math.random().toString(16).slice(-4);
        //   }
        //   return chr4() + chr4() +
        //       '-' + chr4() +
        //       '-' + chr4() +
        //       '-' + chr4() +
        //       '-' + chr4() + chr4() + chr4();
        (Date.now().toString(36) + Math.random().toString(36).substr(1, 24)).toLowerCase()
    }

    handleFormSubmit() {
        this.setState({id: this.generateid()})
        this.setState({isSaving: true});
        event.preventDefault();
        fetch("http://localhost:3004/employees", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "id": this.state.id,
                "name": this.state.name,
                "company": this.state.company,
                "age": this.state.age,
                "email": this.state.email,
                "isActive": this.state.isActive
            })
        })
            .then(response => response.json())
            .then(() => this.props.update());

    };


    onChangeEvent(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onActivityChanged = (e) => {
        this.setState({
            isActive: e.currentTarget.value
        });
    }

    handleCancel = e => {
        this.setState({hide: true});
        this.props.toggle(this.state.hide);
    }

    render() {
        return (
            <div>
                {this.state.isSaving ? <b>Saving...</b> : ''}
                <form className="container" onSubmit={this.handleFormSubmit}>
                    <fieldset>
                        <h3 className="formtext">Form </h3>
                        <label>Is User Active?</label>
                        <input type="radio" name="isActive"
                               onChange={this.onActivityChanged}/>
                        <br/>
                        <br/>
                        <input
                            type="number"
                            name='age'
                            placeholder="Enter Age"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>
                        <input
                            type="text"
                            name='name'
                            placeholder="Enter Name"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        <br/>
                        <input
                            type="text"
                            name='company'
                            placeholder="Enter Company Name"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/>
                        <br/>
                        <input
                            type="email"
                            name='email'
                            placeholder="Enter email"
                            onChange={this.onChangeEvent}
                            required
                        />
                        <br/><br/>
                        <button type="submit">Submit</button>
                        <br/><br/>
                        <button type="button"
                                onClick={this.handleCancel}>Cancel
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }


}

export default AddEmployee;