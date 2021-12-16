import styles from "./DetailsItem.module.css";

import React, { useState, useEffect, useRef, useContext } from "react";

import Card from "../UI/Card";

import { months } from "../../helpers/data";
import { replaceData } from "../../helpers/functions";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const DetailsItem = (props) => {
  const authCtx = useContext(AuthContext);
  //const valueRef = useRef();
  //const paidRef = useRef();
  const [value, setValue] = useState(props.value);
  const [paid, setPaid] = useState(props.paid);
  const { sendRequest, status, data, error } = useHttp(replaceData, true);

  const convertedDate = new Date(props.date * 1000);
  const digitalMonth = convertedDate.getMonth();
  const date = months[digitalMonth] + " " + convertedDate.getFullYear();

  useEffect(() => {
    if (status === "completed") {
      if (!error) {
        alert("Изменено");
        props.onReplaceData();
      } else {
        setValue(props.value);
        setPaid(props.paid);
        alert(error);
      }
    }
  }, [status, props, error]);

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
