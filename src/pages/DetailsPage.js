import styles from "./DetailsPage.module.css";
import Card from "../components/UI/Card";
import { useLocation } from "react-router-dom";
import { categories, dummyBills, months } from "../helpers/data";

const DetailsPage = () => {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  let existingCategory = categories.find((items) => items.id === category);
  if (!existingCategory) existingCategory = categories[0];

  let billsData;

  if (dummyBills[existingCategory.id])
    billsData = dummyBills[existingCategory.id].map((item) => {
      const digitalMonth = item.date.getMonth() - 1;
      const verbalMonth = months[digitalMonth] + " " + item.date.getFullYear();

      return (
        <div key={digitalMonth} className="col-xxl-3 col-xl-4 col-md-6 col-12">
          <Card className={styles["bills-item"]}>
            <span>{verbalMonth}</span>
            <form>
              <div>
                <label htmlFor="value">Показатели</label>
                <input type="number" id="value" />
              </div>
              <div>
                <label htmlFor="paid">Сумма</label>
                <input type="number" id="paid" />
              </div>
              <div>
                <button type="submit">Изменить</button>
              </div>
            </form>
          </Card>
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
