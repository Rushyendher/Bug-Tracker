import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,Redirect} from "react-router";


import BugList from "./BugList";

class NoPageFound extends React.Component{
    render(){
        return(
            <h1>
                404
            </h1>
        )
    }
}

ReactDOM.render(
    <Router>
        <Route path="/bugs" component={BugList}/>
        <Redirect from="/" to "/bugs" />
        <Route path="*" component={NoPageFound} />
    </Router>,
    document.getElementById("main")
)
