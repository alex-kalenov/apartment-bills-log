import { useContext, useEffect } from "react";
import styles from "./DetailsPage.module.css";
import DetailsItem from "../components/Details/DetailsItem";
import { useLocation } from "react-router-dom";
import { categories, dummyBills } from "../helpers/data";
import DetailsAdd from "../components/Details/DetailsAdd";
import Item from "../components/UI/Item";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { getData } from "../helpers/functions";

const DetailsPage = () => {
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
  }, [sendRequest, authCtx, existingCategory]);

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

  if (data)
    billsData = data.map((item) => {
      const date = new Date(item.date * 1000);
      return (
        <Item key={item.id}>
          <DetailsItem date={date} paid={item.paid} value={item.value} />
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
          <DetailsAdd />
        </Item>
        {billsData}
      </div>
    </div>
  );
};

export default DetailsPage;
