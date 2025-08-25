import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./Layout/Layout";
import FindHospitals from "./Components/FindHospitals";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
        <Route path="/HospitalsNearMe" element={<FindHospitals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;


