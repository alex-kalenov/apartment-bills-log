import Card from "../UI/Card";
import styles from "./DetailsItem.module.css";
import { months } from "../../helpers/data";

const DetailsItem = (props) => {
  const digitalMonth = props.date.getMonth();
  const date = months[digitalMonth] + " " + props.date.getFullYear();

  return (
    <Card className={styles["bills-item"]}>
      <span>{date}</span>
      <form>
        <div>
          <label htmlFor="value">Показатели</label>
          <input type="number" id="value" defaultValue={props.value} />
        </div>
        <div>
          <label htmlFor="paid">Сумма</label>
          <input type="number" id="paid" defaultValue={props.paid} />
        </div>
        <div>
          <button type="submit">Изменить</button>
        </div>
      </form>
    </Card>
  );
};

export default DetailsItem;
