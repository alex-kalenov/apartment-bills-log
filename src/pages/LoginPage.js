import Card from "../components/UI/Card";
import styles from "./LoginPage.module.css";
import Button from "../components/UI/Button";

const LoginPage = () => {
  return (
    <div>
      <Card className={styles["form-wrapper"]}>
        <form>
          <div className={styles["form-row"]}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>
          <div className={styles["form-row"]}>
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" />
          </div>
          <div className={styles["form-row"]}>
            <Button type="submit">Войти</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
