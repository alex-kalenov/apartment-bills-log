import styles from "./DetailsAdd.module.css";

const DetailsAdd = () => {
  return (
    <button className={styles["add-button"]}>
      <div className={styles["add-button__inner"]}></div>
    </button>
  );
};

export default DetailsAdd;
