import styles from "./Toast.module.css";

import { useContext } from "react";

import MsgContext from "../../store/message-context";

const Toast = (props) => {
  const msgCtx = useContext(MsgContext);

  const toastClass = `${styles.toast} ${
    msgCtx.type === "succeed" ? styles.succeed : styles.error
  } ${msgCtx.visible ? styles.show : ""}`;

  return (
    <div className={toastClass}>
      <p>{msgCtx.message}</p>
    </div>
  );
};

export default Toast;
