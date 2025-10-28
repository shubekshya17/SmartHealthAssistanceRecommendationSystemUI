import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./Layout/Layout";
import FindHospitals from "./Pages/FindHospital";
import HospitalList from "./Pages/Hospital/HospitalList";
import CreateHospital from "./Pages/Hospital/CreateHospital";
import HospitalDetails from "./Pages/Hospital/HopsitalDetails";
import EmergencyNumbersPage from "./Pages/EmergencyNumPage";
import Event from "./Pages/Event";
import HomePage from "./Pages/TrialHomePage";
import PublicHospitalDetails from "./Pages/PublicHospitalDetails";
import AuthComponent from "./Pages/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/HospitalsNearMe" element={<FindHospitals />} />
        <Route path="/HospitalList" element={<HospitalList />} />
        <Route path="/CreateHospital" element={<CreateHospital />} />
        <Route path="/HospitalDetails/:id" element={<HospitalDetails />} />
        <Route path="/EmergencyNumber" element={<EmergencyNumbersPage />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/PublicHospitalDetails" element={<PublicHospitalDetails />} />
        <Route path="/LoginSignUp" element={<AuthComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;


