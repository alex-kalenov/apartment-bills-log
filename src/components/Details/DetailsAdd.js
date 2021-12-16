import styles from "./DetailsAdd.module.css";

import React, { useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { sendData } from "../../helpers/functions";

const DetailsAdd = (props) => {
  const { token, userId, category } = props;
  const { sendRequest, status, data, error } = useHttp(sendData, true);

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        alert("Добавлено");
        props.onAddData();
      } else alert(error);
    }
  }, [status, props, error]);

  const add = () => {
    const lastDate = new Date(props.lastDate * 1000);
    const isCurrentMonth =
      lastDate.getMonth() === new Date().getMonth() &&
      lastDate.getFullYear() === new Date().getFullYear();

    if (lastDate && isCurrentMonth) {
      alert("Current month has been already added");
      return;
    }
    sendRequest({ token, userId, category });
  };

  const buttonClass = `${styles["add-button"]} ${
    props.noValue ? styles["no-value"] : ""
  }`;

  return (
    <button className={buttonClass} onClick={add}>
      <div className={styles["add-button__inner"]}></div>
    </button>
  );
};

export default React.memo(DetailsAdd);
