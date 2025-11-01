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
import DashboardLayout from "./Pages/AdminPages/Dashboard";
import DashboardPage from "./Pages/AdminPages/DashboardPage";
import DashboardPage1 from "./Pages/AdminPages/DashboardPage1";
import AdminCreateSlot from "./Pages/Adminappointment";
import Booking from "./Pages/Booking";
import BookingTemp from "./Pages/temp.tsx/temp";
import DashboardDoctor from "./Pages/dashboarddoctor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="HospitalsNearMe" element={<FindHospitals />} />
          <Route path="HospitalList" element={<HospitalList />} />
          <Route path="CreateHospital" element={<CreateHospital />} />
          <Route path="HospitalDetails/:id" element={<HospitalDetails />} />
          <Route path="EmergencyNumber" element={<EmergencyNumbersPage />} />
          <Route path="Event" element={<Event />} />
          <Route path="PublicHospitalDetails/:id" element={<PublicHospitalDetails />} />
          <Route path="LoginSignUp" element={<AuthComponent />} />
          <Route path="AdminCreateSlot" element={<AdminCreateSlot />} />
          <Route path="Booking" element={<Booking />} />
          <Route path="BookingTemp" element={<BookingTemp />} />
          <Route path="DashboardDoctor" element={<DashboardDoctor />} />
        </Route>

        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="DashboardPage1" element={<DashboardPage1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
