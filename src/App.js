"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./Layout/Layout");
var FindHospital_1 = require("./Pages/FindHospital");
var Home_1 = require("./Pages/Home");
var HospitalList_1 = require("./Pages/Hospital/HospitalList");
var CreateHospital_1 = require("./Pages/Hospital/CreateHospital");
var HopsitalDetails_1 = require("./Pages/Hospital/HopsitalDetails");
var EmergencyNumPage_1 = require("./Pages/EmergencyNumPage");
var Event_1 = require("./Pages/Event");
var TrialHomePage_1 = require("./Pages/TrialHomePage");
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Layout_1.default />}>
        <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
        <react_router_dom_1.Route path="/TrialHomePage" element={<TrialHomePage_1.default />}/>
        <react_router_dom_1.Route path="/HospitalsNearMe" element={<FindHospital_1.default />}/>
        <react_router_dom_1.Route path="/HospitalList" element={<HospitalList_1.default />}/>
        <react_router_dom_1.Route path="/CreateHospital" element={<CreateHospital_1.default />}/>
        <react_router_dom_1.Route path="/HospitalDetails/:id" element={<HopsitalDetails_1.default />}/>
        <react_router_dom_1.Route path="/EmergencyNumber" element={<EmergencyNumPage_1.default />}/>
        <react_router_dom_1.Route path="/Event" element={<Event_1.default />}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
