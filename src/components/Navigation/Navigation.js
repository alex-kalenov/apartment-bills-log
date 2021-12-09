import { Link } from "react-router-dom";
import Hamburger from "../UI/Hamburger";
import { bills } from "../../helpers/data";

const Navigation = () => {
  const menuItems = bills.map((item) => {
    return (
      <li>
        <Link to={"/details?bill=" + item.id}>{item.label}</Link>
      </li>
    );
  });

  return (
    <Hamburger>
      <ul>{menuItems}</ul>
    </Hamburger>
  );
};

export default Navigation;
