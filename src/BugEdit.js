import React from "react";
import {Link} from "react-router";

export default class BugEdit extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            priority: '',
            status: '',
            owner: '',
            title: ''
        }
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps){
        if (this.props.params.id != prevProps.params.id) {
           this.loadData();
        }
    }

    loadData() {
        $.ajax({
            type: 'GET',
            url: '/api/bugs/' + this.props.params.id,
            success: function(bug){
                this.setState(bug)
            }.bind(this)
        });
    }

    onChange(){
        this.setState({
            priority: this.refs.priority.value,
            status: this.refs.status.value,
            owner: this.refs.owner.value,
            title: this.refs.title.value,
        })
    }

    submit(e){
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        }

        $.ajax({
            url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function(bug) {
                this.setState(bug);
            }.bind(this),
        });
    }

    render(){
        return(
            <div className="container">
                <h3>Edit Bug - {this.props.params.id}</h3> 
                <br/>
                <form onSubmit={this.submit.bind(this)}>
                    Priority:
                    <select ref="priority" name="priority" value={this.state.priority} onChange={this.onChange.bind(this)}>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                    </select>
                    <br/>
                    Status:
                    <select ref="status" value={this.state.status} onChange={this.onChange.bind(this)}>
                      <option>New</option>
                      <option>Open</option>
                      <option>Fixed</option>
                      <option>Closed</option>
                    </select>
                    <br/>
                    Owner: <input ref="owner" className="form-control" type="text" value={this.state.owner} onChange={this.onChange.bind(this)}/>
                    <br/>
                    Title: <input ref="title" className="form-control" type="text" value={this.state.title} onChange={this.onChange.bind(this)}/>
                    <br/>
                    <button type="submit">Submit</button>
                    <br/>
                    <Link to="/bugs">Back to bug list</Link>
                </form>
            </div>
        )
    }
}
