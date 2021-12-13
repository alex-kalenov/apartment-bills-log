import styles from "./DetailsPage.module.css";
import DetailsItem from "./DetailsItem";
import { useLocation } from "react-router-dom";
import { categories, dummyBills } from "../helpers/data";

const DetailsPage = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  let billsData;

  if (dummyBills[existingCategory.id])
    billsData = dummyBills[existingCategory.id].map((item) => {
      return (
        <div
          key={item.date.getMonth() - 1}
          className="col-xxl-3 col-xl-4 col-md-6 col-12"
        >
          <DetailsItem date={item.date} paid={item.paid} value={item.value} />
        </div>
      );
    });

  return (
    <div>
      <div className={styles["header-wrapper"]}>
        <h2>
          Отчетные данные по <span>{existingCategory.detailLabel}</span>
        </h2>
      </div>
      <div className="row">{billsData}</div>
    </div>
  );
};

export default DetailsPage;
