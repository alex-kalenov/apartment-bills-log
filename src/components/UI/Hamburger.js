import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Hamburger.module.css";
import HamburgerButton from "./HamburgerButton";
import Layout from "./Layout";

const Hamburger = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleHamburgerHandler = () => {
    setVisible((state) => setVisible(!state));
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
          <button className={styles.logout}>Выйти</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Hamburger;
