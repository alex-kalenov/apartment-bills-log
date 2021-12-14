import "./index.css";
import { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";

import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

import Navigation from "./components/Navigation/Navigation";
import Workflow from "./components/UI/Workflow";
import Toast from "./components/UI/Toast";

export default function App() {
  const authCtx = useContext(AuthContext);

  let switchContent;
  if (authCtx.isLoggedIn) {
    switchContent = (
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
    );
  } else {
    switchContent = (
      <Switch>
        <Route>
          <LoginPage />
        </Route>
      </Switch>
    );
  }

  return (
    <Fragment>
      {switchContent}
      <Toast message={"Всё отлично!"} type="succeed" />
    </Fragment>
  );
}
