import styles from "./DetailsAdd.module.css";
import useHttp from "../../hooks/use-http";
import { sendData } from "../../helpers/functions";
import { useEffect } from "react";

const DetailsAdd = (props) => {
  const { token, userId, category } = props.passData;
  const { sendRequest, status, data, error } = useHttp(sendData, true);

  useEffect(() => {
    if (status === "completed") props.onAddData();
  }, [status, props]);

  const add = () => {
    sendRequest({ token, userId, category });
  };

  return (
    <button className={styles["add-button"]} onClick={add}>
      <div className={styles["add-button__inner"]}></div>
    </button>
  );
};

export default DetailsAdd;
