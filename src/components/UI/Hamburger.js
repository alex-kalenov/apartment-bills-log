import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import styles from "./Hamburger.module.css";
import HamburgerButton from "./HamburgerButton";
import Layout from "./Layout";

const Hamburger = (props) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const toggleHamburgerHandler = () => {
    setVisible((state) => setVisible(!state));
  };

  const logoutHandler = () => {
    history.push("/");
  };

  const hamburgerClass = `${styles.menuToggle} ${
    visible ? styles.visible : ""
  }`;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Layout isVisible={visible} onClick={toggleHamburgerHandler} />,
        document.getElementById("layouts")
      )}
      <HamburgerButton
        onToggle={toggleHamburgerHandler}
        className={styles["hamburger-button"]}
        isVisible={visible}
      />
      <div className={hamburgerClass}>
        <nav>{props.children}</nav>
        <div className={styles["logout-wrapper"]}>
          <Button className={styles.logout} onClick={logoutHandler}>
            Выйти
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Hamburger;
