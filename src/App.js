import "./index.css";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

import Navigation from "./components/Navigation/Navigation";
import Workflow from "./components/UI/Workflow";
import { Redirect } from "react-router-dom";
import Toast from "./components/UI/Toast";

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route>
          <Navigation />
          <Workflow>
            <Switch>
              <Route path="/details" exact>
                <DetailsPage />
              </Route>
              <Route>
                <div>Hello</div>
              </Route>
            </Switch>
          </Workflow>
        </Route>
      </Switch>
      <Toast message={"Всё отлично!"} type="succeed" />
    </Fragment>
  );
}
