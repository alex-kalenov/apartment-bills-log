import "./index.css";

import { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthContext from "./store/auth-context";
import MsgContext from "./store/message-context";

import Navigation from "./components/Navigation/Navigation";
import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

import Workflow from "./components/UI/Workflow";
import Toast from "./components/UI/Toast";

export default function App() {
  const authCtx = useContext(AuthContext);
  const msgCtx = useContext(MsgContext);
  let switchContent;
  if (authCtx.isLoggedIn) {
    switchContent = (
      <Switch>
        <Route>
          <Navigation />
          <Workflow>
            <Switch>
              <Route path="/details" exact>
                <DetailsPage />
              </Route>
              <Route>
                <Redirect to="/details" />
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
      <Toast
        type={msgCtx.type}
        message={msgCtx.message}
        show={msgCtx.visible}
      />
    </Fragment>
  );
}
