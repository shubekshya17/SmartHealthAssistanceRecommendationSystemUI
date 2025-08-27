import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./Layout/Layout";
import FindHospitals from "./Pages/FindHospital";
import Home from "./Pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/HospitalsNearMe" element={<FindHospitals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;


