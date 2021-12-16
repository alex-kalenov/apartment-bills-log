import styles from "./DetailsContent.module.css";

import { useContext, useEffect, useState, useCallback } from "react";

import DetailsItem from "./DetailsItem";
import DetailsAdd from "./DetailsAdd";

import { getData, sortData } from "../../helpers/functions";

import Item from "../UI/Item";
import LoadingSpinner from "../UI/LoadingSpinner";

import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

const DetailsContent = (props) => {
  const [rerenderTrigger, setRerenderTrigger] = useState(false);
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data, error } = useHttp(getData, true);

  useEffect(() => {
    sendRequest({
      token: authCtx.token,
      userId: authCtx.userId,
      category: props.category
    });
  }, [sendRequest, authCtx, props, rerenderTrigger]);

  const rerender = useCallback(() => {
    setRerenderTrigger((state) => {
      return !state;
    });
  }, []);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    alert(error);
    return <div></div>;
  }

  let billsData;

  if (data) {
    const sortedData = sortData(data, "DESC");
    billsData = sortedData.map((item) => {
      return (
        <Item key={item.id}>
          <DetailsItem
            billId={item.id}
            date={item.date}
            paid={item.paid}
            value={item.value}
            category={props.category}
            onReplaceData={rerender}
          />
        </Item>
      );
    });
  }

  return (
    <div className="row">
      <Item>
        <DetailsAdd
          onAddData={rerender}
          token={authCtx.token}
          userId={authCtx.userId}
          category={props.category}
        />
      </Item>
      {billsData}
    </div>
  );
};

export default DetailsContent;