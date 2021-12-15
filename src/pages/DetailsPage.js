import styles from "./DetailsPage.module.css";

import { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import DetailsItem from "../components/Details/DetailsItem";
import DetailsAdd from "../components/Details/DetailsAdd";

import { categories } from "../helpers/data";
import { getData, sortData } from "../helpers/functions";

import Item from "../components/UI/Item";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const DetailsPage = () => {
  const [rerenderTrigger, setRerenderTrigger] = useState(false);
  const authCtx = useContext(AuthContext);
  const { sendRequest, status, data, error } = useHttp(getData, true);

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  useEffect(() => {
    sendRequest({
      token: authCtx.token,
      userId: authCtx.userId,
      category: existingCategory.id
    });
  }, [sendRequest, authCtx, existingCategory, rerenderTrigger]);

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

  const sortedData = sortData(data, "DESC");
  let billsData;

  if (data)
    billsData = sortedData.map((item) => {
      return (
        <Item key={item.id}>
          <DetailsItem
            billId={item.id}
            date={item.date}
            paid={item.paid}
            value={item.value}
            category={existingCategory.id}
            onReplaceData={rerender}
          />
        </Item>
      );
    });

  return (
    <div>
      <div className={styles["header-wrapper"]}>
        <h2>
          Отчетные данные по <span>{existingCategory.detailLabel}</span>
        </h2>
      </div>
      <div className="row">
        <Item>
          <DetailsAdd
            onAddData={rerender}
            token={authCtx.token}
            userId={authCtx.userId}
            category={existingCategory.id}
          />
        </Item>
        {billsData}
      </div>
    </div>
  );
};

export default DetailsPage;
