import { Link } from "react-router-dom";
import Hamburger from "../UI/Hamburger";
import { categories } from "../../helpers/data";

const Navigation = () => {
  const menuItems = categories.map((item) => {
    return (
      <li key={item.id}>
        <Link to={"/details?category=" + item.id}>{item.linkLabel}</Link>
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
