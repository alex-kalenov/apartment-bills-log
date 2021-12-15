import styles from "./DetailsItem.module.css";

import { useEffect, useRef, useContext } from "react";

import Card from "../UI/Card";

import { months } from "../../helpers/data";
import { replaceData } from "../../helpers/functions";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const DetailsItem = (props) => {
  const authCtx = useContext(AuthContext);
  const valueRef = useRef();
  const paidRef = useRef();
  const { sendRequest, status, data, error } = useHttp(replaceData, true);

  const digitalMonth = props.date.getMonth();
  const date = months[digitalMonth] + " " + props.date.getFullYear();

  useEffect(() => {
    if (status === "completed") props.onReplaceData();
  }, [status, props]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = valueRef.current.value;
    const enteredPaid = paidRef.current.value;

    const requestData = {
      billId: props.billId,
      date: props.date.getTime() / 1000,
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
        <div>
          <label htmlFor="value">Показатели</label>
          <input
            type="number"
            id="value"
            defaultValue={props.value}
            ref={valueRef}
          />
        </div>
        <div>
          <label htmlFor="paid">Сумма</label>
          <input
            type="number"
            id="paid"
            defaultValue={props.paid}
            ref={paidRef}
          />
        </div>
        <div>
          <button type="submit">Изменить</button>
        </div>
      </form>
    </Card>
  );
};

export default DetailsItem;
