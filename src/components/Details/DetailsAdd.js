import styles from "./DetailsAdd.module.css";

import React, { useState, useEffect, useContext } from "react";

import useHttp from "../../hooks/use-http";
import { sendData } from "../../helpers/functions";

import MessageContext from "../../store/message-context";

const DetailsAdd = (props) => {
  const [allowToShowM, setAllowToShowM] = useState(false);
  const { token, userId, category } = props;
  const msgCtx = useContext(MessageContext);
  const { sendRequest, status, data, error } = useHttp(sendData, false);

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        setAllowToShowM(false);
        msgCtx.showMessage(`Добавлено`, "succeed");
        props.onAddData();
      } else if (allowToShowM) {
        setAllowToShowM(false);
        msgCtx.showMessage(`Ошибка: ${error}`, "error");
      }
    }
  }, [status, props, error, allowToShowM, msgCtx]);

  const add = () => {
    const lastDate = new Date(props.lastDate * 1000);
    const isCurrentMonth =
      lastDate.getMonth() === new Date().getMonth() &&
      lastDate.getFullYear() === new Date().getFullYear();

    if (lastDate && isCurrentMonth) {
      msgCtx.showMessage("Данные за этот месяц уже добавлены", "error");
      return;
    }
    setAllowToShowM(true);
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
