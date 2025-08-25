import { Link } from "react-router-dom";

const WebsiteMenuItems = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
    name: "/",
  },
  {
    key: "2",
    label: <Link to="/HospitalsNearMe">Find Hospitals</Link>,
    name: "/HospitalsNearMe",
  },
];
export { WebsiteMenuItems };
