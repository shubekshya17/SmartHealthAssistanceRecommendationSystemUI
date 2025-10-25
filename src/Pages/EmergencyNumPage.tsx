import { useState } from "react";
import {
  Heart,
  Phone,
  AlertCircle,
  Shield,
  Siren,
  Flame,
  Ambulance,
  Car,
  Baby,
  Users,
  PhoneCall,
  Search,
} from "lucide-react";

export default function EmergencyNumbersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const emergencyData = [
    {
      purpose: "Disaster Emergency Helpline",
      number: "1149",
      type: "Disaster",
      icon: AlertCircle,
    },
    {
      purpose: "Flood and Landslide Helpline",
      number: "1141",
      type: "Disaster",
      icon: AlertCircle,
    },
    {
      purpose: "Flood and Landslide Infoline",
      number: "1155",
      type: "Disaster",
      icon: AlertCircle,
    },
    {
      purpose: "Nepal Electricity Authority Helpline",
      number: "1150",
      type: "Support/Report",
      icon: Phone,
    },
    {
      purpose: "Nepal Police",
      number: "100",
      type: "Support/Report",
      icon: Shield,
    },
    { purpose: "Fire Service", number: "101", type: "Emergency", icon: Flame },
    {
      purpose: "Ambulance Service",
      number: "102",
      type: "Emergency",
      icon: Ambulance,
    },
    {
      purpose: "Traffic Police",
      number: "103",
      type: "Support/Report",
      icon: Car,
    },
    {
      purpose: "Child Missing Emergency Number",
      number: "104",
      type: "Emergency",
      icon: Baby,
    },
    {
      purpose: "Missing Child Response",
      number: "1098",
      type: "Emergency",
      icon: Baby,
    },
    {
      purpose: "Women Helpline",
      number: "1145",
      type: "Support/Report",
      icon: Users,
    },
    {
      purpose: "Nepal Red Cross HotLine",
      number: "1130",
      type: "Emergency",
      icon: PhoneCall,
    },
    {
      purpose: "Armed Police Force Support",
      number: "1114",
      type: "Support/Report",
      icon: Shield,
    },
  ];

  const types = ["All", "Emergency", "Disaster", "Support/Report"];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-red-100 text-red-700 border-red-300";
      case "Disaster":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "Support/Report":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const filteredData = emergencyData.filter((item) => {
    const matchesSearch =
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number.includes(searchTerm);
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="text-blue-600 w-8 h-8" />
              <span className="text-2xl font-bold text-gray-900">
                SmartHealth
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#emergencynum" className="text-blue-600 font-semibold">
                Emergency Numbers
              </a>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition flex items-center">
              <Siren className="w-4 h-4 mr-2" />
              Emergency
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <Siren className="w-10 h-10 text-red-600 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Emergency Contact Numbers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick access to all essential emergency services in Nepal. Save
            these numbers for urgent situations.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by service name or number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-3 rounded-xl font-semibold transition ${
                      selectedType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Numbers Table */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden scroll-mt-24"
          id="emergencynum"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Toll Free Number
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                    Service Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <tr
                      key={index}
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              getTypeColor(item.type).split(" ")[0]
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                getTypeColor(item.type).split(" ")[1]
                              }`}
                            />
                          </div>
                          <span className="text-gray-900 font-semibold">
                            {item.purpose}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-1xl font-bold text-gray-900">
                          {item.number}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold border inline-block ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No emergency numbers found matching your search.
            </p>
          </div>
        )}
      </section>

      {/* Important Notice */}
      <section className="bg-red-50 border-t-4 border-red-600 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Important Notice
          </h3>
          <p className="text-gray-700 leading-relaxed">
            These emergency numbers are for urgent situations only. Please use
            them responsibly. For non-emergency inquiries, consider contacting
            the relevant department directly during business hours. Keep these
            numbers saved in your phone for quick access during emergencies.
          </p>
        </div>
      </section>
    </div>
  );
}
