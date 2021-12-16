import React, { useState, useEffect, useCallback } from "react";

// const initialData = { visible: false, message: "" };

const MessageContext = React.createContext({
  type: "succeed",
  visible: false,
  message: "",
  showMessage: (text) => {}
});

export const MessageContextProvider = (props) => {
  const [type, setType] = useState("succeed");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [visible]);

  const showMessage = useCallback((text, type) => {
    setType(type);
    setVisible(true);
    setMessage(text);
  }, []);

  const hideMessage = useCallback(() => {
    setVisible(false);
    setMessage("");
  }, []);

  const msgValue = {
    type,
    visible,
    message,
    showMessage
  };

  return (
    <MessageContext.Provider value={msgValue}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;