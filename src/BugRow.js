import React from "react";

export default class BugRow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.bug._id}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
}
