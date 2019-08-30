import React, { Component } from "react";
import List from "../Display/List";
import Design from "../Design/Design";

class Dashboard extends Component {
  render() {
    return(
      
        <List history={this.props.history} />
      
    ) 
    
   
  }
}
export default Dashboard;
