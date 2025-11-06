import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteLayout from "./Layout/Layout";
import FindHospitals from "./Pages/FindHospital";
import HospitalList from "./Pages/AdminPages/Hospital/HospitalList";
import CreateHospital from "./Pages/AdminPages/Hospital/CreateHospital";
import HospitalDetails from "./Pages/AdminPages/Hospital/HospitalDetails";
import EmergencyNumbersPage from "./Pages/EmergencyNumPage";
import Event from "./Pages/Event";
import HomePage from "./Pages/TrialHomePage";
import PublicHospitalDetails from "./Pages/PublicHospitalDetails";
import AuthComponent from "./Pages/Auth";
import DashboardLayout from "./Pages/AdminPages/Dashboard";
import DashboardPage from "./Pages/AdminPages/DashboardPage";
import AdminCreateSlot from "./Pages/Adminappointment";
import Booking from "./Pages/Booking";
import BookingTemp from "./Pages/temp.tsx/temp";
import DashboardDoctor from "./Pages/dashboarddoctor";
import DepartmentList from "./Pages/AdminPages/Department/DepartmentList";
import EventList from "./Pages/AdminPages/Event/EventList";
import DoctorList from "./Pages/AdminPages/Doctor/DoctorList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="HospitalsNearMe" element={<FindHospitals />} />
          <Route path="EmergencyNumber" element={<EmergencyNumbersPage />} />
          <Route path="Event" element={<Event />} />
          <Route path="PublicHospitalDetails/:id" element={<PublicHospitalDetails />} />
          <Route path="LoginSignUp" element={<AuthComponent />} />
          <Route path="AdminCreateSlot" element={<AdminCreateSlot />} />
          <Route path="Booking/:id" element={<Booking />} />
          <Route path="BookingTemp" element={<BookingTemp />} />
          <Route path="DashboardDoctor" element={<DashboardDoctor />} />
        </Route>

        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="HospitalList" element={<HospitalList />} />
          <Route path="CreateHospital" element={<CreateHospital />} />
          <Route path="HospitalDetails/:id" element={<HospitalDetails />} />
          <Route path="DepartmentList" element={<DepartmentList />} />
          <Route path="EventList" element={<EventList />} />
          <Route path="DoctorList" element={<DoctorList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
