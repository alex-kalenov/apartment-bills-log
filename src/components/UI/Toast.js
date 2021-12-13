import styles from "./Toast.module.css";

const Toast = (props) => {
  const toastClass = `${styles.toast} ${
    props.type === "succeed" ? styles.succeed : styles.error
  } ${props.show ? styles.show : ""}`;

  return (
    <div className={toastClass}>
      <p>{props.message}</p>
    </div>
  );
};

export default Toast;
