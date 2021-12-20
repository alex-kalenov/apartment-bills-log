import styles from "./DetailsItem.module.css";

import React, { useState, useEffect, useContext } from "react";

import Card from "../UI/Card";

import { months } from "../../helpers/data";
import { replaceData } from "../../helpers/functions";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import MessageContext from "../../store/message-context";

const DetailsItem = (props) => {
  const authCtx = useContext(AuthContext);
  const msgCtx = useContext(MessageContext);
  const [allowToShowM, setAllowToShowM] = useState(false);
  const [value, setValue] = useState(props.value);
  const [paid, setPaid] = useState(props.paid);
  const { sendRequest, status, data, error } = useHttp(replaceData, false);

  const convertedDate = new Date(props.date * 1000);
  const digitalMonth = convertedDate.getMonth();
  const date = months[digitalMonth] + " " + convertedDate.getFullYear();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        msgCtx.showMessage("Изменено", "succeed");
        props.onReplaceData();
      } else if (allowToShowM) {
        setValue(props.value);
        setPaid(props.paid);
        setAllowToShowM(false);
        msgCtx.showMessage(`Ошибка: ${error}`, "error");
      }
    }
  }, [status, props, error, msgCtx, allowToShowM]);

  const changeValueHandler = (event) => {
    setValue(event.target.value);
  };

  const changePaidHandler = (event) => {
    setPaid(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = value;
    const enteredPaid = paid;

    const requestData = {
      billId: props.billId,
      date: convertedDate.getTime() / 1000,
      paid: enteredPaid,
      value: enteredValue,
      passDetails: {
        token: authCtx.token,
        userId: authCtx.userId,
        category: props.category
      }
    };
    if (paid === "" || value === "") {
      msgCtx.showMessage("Поля не должны быть пустыми", "error");
      setValue(props.value);
      setPaid(props.paid);
      return;
    }
    if (paid < 0 || value < 0) {
      msgCtx.showMessage("Значения не могут быть отрицательными", "error");
      setValue(props.value);
      setPaid(props.paid);
      return;
    }
    setAllowToShowM(true);
    sendRequest(requestData);
  };

  return (
    <Card className={styles["bills-item"]}>
      <span>{date}</span>
      <form onSubmit={submitHandler}>
        {!props.noValue && (
          <div>
            <label htmlFor="value">Показатели</label>
            <input
              type="number"
              id="value"
              onChange={changeValueHandler}
              value={value}
            />
          </div>
        )}
        <div>
          <label htmlFor="paid">Сумма</label>
          <input
            type="number"
            id="paid"
            onChange={changePaidHandler}
            value={paid}
          />
        </div>
        <div>
          <button type="submit">Изменить</button>
        </div>
      </form>
    </Card>
  );
};

export default React.memo(DetailsItem);
