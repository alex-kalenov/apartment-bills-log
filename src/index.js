import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { MessageContextProvider } from "./store/message-context";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MessageContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </MessageContextProvider>,
  rootElement
);
