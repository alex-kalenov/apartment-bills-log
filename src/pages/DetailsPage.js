import styles from "./DetailsPage.module.css";
import Card from "../components/UI/Card";
import { useLocation } from "react-router-dom";
import { categories, dummyBills, months } from "../helpers/data";

const DetailsPage = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  return (
    <div>
      <div className={styles["header-wrapper"]}>
        <h2>
          Отчетные данные по <span>{existingCategory.detailLabel}</span>
        </h2>
      </div>
      <div className="row">
        {dummyBills[existingCategory.id].map((item) => {
          return (
            <div className="col-4">
              <Card>
                {months[item.date.getMonth()] + " " + item.date.getFullYear()}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsPage;
