import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Strore";
import Dashboard from "./Component/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./Component/Display/List";
import UpdateRequest from "./Component/UpdateRequest/UpdateRequest";
import SecondStep from "./Component/Add/SecondStep";
import ThirdStep from "./Component/Add/ThirdStep";

import Form from "./Component/Add/Form";
import Design from "./Component/Design/Design";
import DesignAdd from "./Component/Design/DesignAdd";
import DesignAddStep2 from "./Component/Design/DesignAddStep2";

import DesignUpdate from "./Component/Design/DesignUpdate";
import DesignAll from "./Component/Design/DesignAll";
import Login from "./Component/Login/Login";
import ListAll from "./Component/Display/ListAll";
import DesignAddStep3 from "./Component/Design/DesignAddStep3";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/AddDemande" component={DesignAdd} />
          <Route exact path="/List" component={Design} />
          <Route exact path="/ListAll" component={DesignAll} />
          <Route exact path="/updateRequest/:id" component={DesignUpdate} />
          <Route exact path="/secondStep/:id" component={DesignAddStep2} />
          <Route exact path="/thirdStep/:id" component={DesignAddStep3} />

        
        </div>
      </Provider>
    </Router>
  );
}

export default App;
