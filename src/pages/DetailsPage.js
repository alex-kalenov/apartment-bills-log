import { useLocation } from "react-router-dom";
import { bills } from "../helpers/data";

const DetailsPage = () => {
  const location = useLocation();
  const bill = new URLSearchParams(location.search).get("bill");
  const isBillExists = bills.find((items) => items.id === bill);
  const finalBill = isBillExists ? bill : "gas";

  return <div>THIS IS DETAILSPAGE for ({finalBill})</div>;
};

export default DetailsPage;
