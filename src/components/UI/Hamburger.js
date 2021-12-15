import styles from "./Hamburger.module.css";

import { Fragment, useState, useContext } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";
import HamburgerButton from "./HamburgerButton";
import Layout from "./Layout";

import AuthContext from "../../store/auth-context";

const Hamburger = (props) => {
  const [visible, setVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  const toggleHamburgerHandler = () => {
    setVisible((state) => setVisible(!state));
  };

  const logoutHandler = () => {
    authCtx.logout();
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
      <HamburgerButton onToggle={toggleHamburgerHandler} isVisible={visible} />
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
