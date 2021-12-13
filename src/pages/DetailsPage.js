import styles from "./DetailsPage.module.css";
import DetailsItem from "../components/Details/DetailsItem";
import { useLocation } from "react-router-dom";
import { categories, dummyBills } from "../helpers/data";
import DetailsAdd from "../components/Details/DetailsAdd";
import Item from "../components/UI/Item";

const DetailsPage = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  let billsData;

  if (dummyBills[existingCategory.id])
    billsData = dummyBills[existingCategory.id].map((item) => {
      return (
        <Item key={item.date.getMonth() - 1}>
          <DetailsItem date={item.date} paid={item.paid} value={item.value} />
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
