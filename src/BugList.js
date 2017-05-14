import React from "react";

import BugFilter from "./BugFilter";
import BugTable from "./BugTable";
import BugAdd from "./BugAdd";

export default class BugList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bugs: []
        }
    }

    componentDidMount(){
        this.loadData({});
    }

    loadData(filter){
        $.ajax({
            type: 'GET',
            url: '/api/bugs',
            data: filter,
            success: function(data){
                this.setState({
                    bugs: data
                })
            }.bind(this)
        })
    }

    addBug(bug){
        console.log("Adding bug:", bug);
         $.ajax({
           type: 'POST', url: '/api/bugs', contentType: 'application/json',
           data: JSON.stringify(bug),
           success: function(data) {
             console.log(data)
             var bug = data;
             // We're advised not to modify the state, it's immutable. So, make a copy.
             var bugsModified = this.state.bugs.concat(bug);
             this.setState({bugs: bugsModified});
           }.bind(this),
           error: function(xhr, status, err) {
             // ideally, show error to user.
             console.log("Error adding bug:", err);
           }
     });
    }

    render(){
        return(
            <div className="container">
                <h1>Bug Tracker</h1>
                <BugFilter loadData={this.loadData.bind(this)}/>
                <hr/>
                <BugTable bugs={this.state.bugs}/>
                <hr/>
                <BugAdd addBug={this.addBug.bind(this)}/>
            </div>
        )
    }
}
