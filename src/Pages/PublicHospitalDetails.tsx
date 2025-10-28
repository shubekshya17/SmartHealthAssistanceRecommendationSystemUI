import { useState } from "react";

// Dummy Data
const dummyHospital = {
  hospitalId: 1,
  hospitalName: "City General Hospital",
  address: "123 Medical Center Drive, Downtown, Kathmandu",
  latitude: 27.7172,
  longitude: 85.3240,
  phone: "+977-1-4123456",
  email: "info@citygeneralhospital.com",
  description: "City General Hospital is a premier healthcare facility dedicated to providing exceptional medical care to our community. With state-of-the-art equipment, experienced medical professionals, and a patient-centered approach, we offer comprehensive healthcare services across multiple specialties. Our commitment to excellence in healthcare delivery has made us a trusted name in the region for over 25 years.",
  imagePath: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
  type: 1,
  openingTime: "24/7",
  closingTime: "Open",
  specialities: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency Care", "Surgery", "Radiology", "Oncology"]
};

const dummyDepartments = [
  { departmentId: 1, departmentName: "Cardiology", icon: "❤️" },
  { departmentId: 2, departmentName: "Neurology", icon: "🧠" },
  { departmentId: 3, departmentName: "Orthopedics", icon: "🦴" },
  { departmentId: 4, departmentName: "Pediatrics", icon: "👶" },
  { departmentId: 5, departmentName: "Emergency", icon: "🚑" },
  { departmentId: 6, departmentName: "Surgery", icon: "⚕️" },
  { departmentId: 7, departmentName: "Radiology", icon: "📡" },
  { departmentId: 8, departmentName: "Oncology", icon: "🎗️" }
];

const dummyDoctors = [
  {
    doctorId: 1,
    fullName: "Dr. Sarah Mitchell",
    specialization: "Cardiologist",
    qualification: "MD, FACC",
    experienceYear: 15,
    profileImagePath: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    description: "Specialized in interventional cardiology with expertise in complex cardiac procedures.",
    email: "sarah.mitchell@cityhospital.com",
    phone: "+977-1-4123457",
    departmentId: 1,
    department: { departmentName: "Cardiology" }
  },
  {
    doctorId: 2,
    fullName: "Dr. James Anderson",
    specialization: "Neurologist",
    qualification: "MD, PhD",
    experienceYear: 12,
    profileImagePath: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    description: "Expert in treating neurological disorders including stroke, epilepsy, and movement disorders.",
    email: "james.anderson@cityhospital.com",
    phone: "+977-1-4123458",
    departmentId: 2,
    department: { departmentName: "Neurology" }
  },
  {
    doctorId: 3,
    fullName: "Dr. Emily Chen",
    specialization: "Orthopedic Surgeon",
    qualification: "MS, FRCS",
    experienceYear: 10,
    profileImagePath: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    description: "Specializes in joint replacement and sports medicine for mobility restoration.",
    email: "emily.chen@cityhospital.com",
    phone: "+977-1-4123459",
    departmentId: 3,
    department: { departmentName: "Orthopedics" }
  },
  {
    doctorId: 4,
    fullName: "Dr. Michael Roberts",
    specialization: "Pediatrician",
    qualification: "MD, FAAP",
    experienceYear: 18,
    profileImagePath: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    description: "Dedicated to child health and development with preventive pediatrics focus.",
    email: "michael.roberts@cityhospital.com",
    phone: "+977-1-4123460",
    departmentId: 4,
    department: { departmentName: "Pediatrics" }
  },
  {
    doctorId: 5,
    fullName: "Dr. Lisa Thompson",
    specialization: "Emergency Medicine",
    qualification: "MD, FACEP",
    experienceYear: 8,
    profileImagePath: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
    description: "Board-certified emergency medicine physician with trauma care expertise.",
    email: "lisa.thompson@cityhospital.com",
    phone: "+977-1-4123461",
    departmentId: 5,
    department: { departmentName: "Emergency" }
  },
  {
    doctorId: 6,
    fullName: "Dr. David Kumar",
    specialization: "General Surgeon",
    qualification: "MS, FACS",
    experienceYear: 14,
    profileImagePath: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
    description: "Experienced in laparoscopic and minimally invasive surgical procedures.",
    email: "david.kumar@cityhospital.com",
    phone: "+977-1-4123462",
    departmentId: 6,
    department: { departmentName: "Surgery" }
  }
];

const dummyEvents = [
  {
    eventId: 1,
    eventName: "Free Health Screening Camp",
    eventDate: "2025-11-15",
    description: "Comprehensive health screening offering free blood pressure checks and diabetes screening.",
    location: "Hospital Main Lobby",
    imagePath: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600"
  },
  {
    eventId: 2,
    eventName: "World Heart Day Awareness",
    eventDate: "2025-11-20",
    description: "Special awareness program on cardiovascular health with expert talks and ECG screening.",
    location: "Conference Hall A",
    imagePath: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600"
  },
  {
    eventId: 3,
    eventName: "Diabetes Management Workshop",
    eventDate: "2025-11-25",
    description: "Interactive workshop covering diet planning, medication management, and lifestyle modifications.",
    location: "Community Center",
    imagePath: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600"
  }
];

const PublicHospitalDetails = () => {
  const [hospital] = useState(dummyHospital);
  const [departments] = useState(dummyDepartments);
  const [doctors] = useState(dummyDoctors);
  const [events] = useState(dummyEvents);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>
      
      {/* Content Wrapper */}
      <div className="relative z-10">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold transition-all duration-200 hover:gap-3"
        >
          <span className="text-xl">←</span>
          Back to List
        </button>
      </div>

      {/* Hero Section - Compact Image with Overlay */}
      <div className="relative h-80 md:h-96 overflow-hidden mt-6">
        <div className="absolute inset-0">
          <img
            src={hospital.imagePath}
            alt={hospital.hospitalName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-4 py-1.5 rounded-full font-bold text-xs mb-3 shadow-xl">
              🏥 {hospital.type === 1 ? "HOSPITAL" : hospital.type === 2 ? "CLINIC" : "HEALTH POST"}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 drop-shadow-2xl">
              {hospital.hospitalName}
            </h1>
            <div className="flex items-center gap-2 text-white/95 text-sm md:text-base mb-4">
              <span className="text-lg">📍</span>
              <p className="font-medium drop-shadow-lg">{hospital.address}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg text-sm">
                <span className="text-lg">📞</span>
                <span className="font-semibold text-gray-800">{hospital.phone}</span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg text-sm">
                <span className="text-lg">🕐</span>
                <span className="font-semibold text-gray-800">{hospital.openingTime}</span>
              </div>
              <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm flex items-center gap-2">
                <span className="text-lg">📅</span>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* About & Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* About - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">ℹ️</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                About Us
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {hospital.description}
            </p>
            
            {/* Specialities */}
            <h3 className="text-base font-bold text-teal-700 mb-3">Medical Specialities</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.specialities.map((spec, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full font-semibold text-white text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer ${
                    index % 5 === 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                    index % 5 === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                    index % 5 === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    index % 5 === 3 ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                    'bg-gradient-to-r from-teal-500 to-cyan-500'
                  }`}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info - 1 column */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="text-teal-100 text-xs font-semibold uppercase mb-1">Email</p>
                  <p className="font-semibold text-sm break-all">{hospital.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="text-teal-100 text-xs font-semibold uppercase mb-1">Coordinates</p>
                  <p className="font-semibold text-sm">
                    {hospital.latitude}°N, {hospital.longitude}°E
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-teal-700 font-bold py-3 rounded-lg hover:bg-teal-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm">
                Get Directions →
              </button>
              <button className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold py-3 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg text-sm flex items-center justify-center gap-2">
                <span className="text-lg">📅</span>
                Book Appointment Now
              </button>
            </div>
          </div>
        </div>

        {/* Departments Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Our Departments
            </h2>
            <p className="text-gray-600 text-sm">Scroll to explore all specialties →</p>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 w-max">
              {departments.map((dept, index) => (
                <div
                  key={dept.departmentId}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-center cursor-pointer hover:-translate-y-1 w-32"
                >
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 ${
                    index % 4 === 0 ? 'bg-gradient-to-br from-teal-400 to-cyan-500' :
                    index % 4 === 1 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                    index % 4 === 2 ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                    'bg-gradient-to-br from-cyan-400 to-blue-500'
                  }`}>
                    {dept.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                    {dept.departmentName}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Meet Our Doctors
            </h2>
            <p className="text-gray-600 text-sm">Expert care from experienced professionals →</p>
          </div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-5 w-max">
              {doctors.map((doctor) => (
                <div
                  key={doctor.doctorId}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group w-72"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={doctor.profileImagePath}
                      alt={doctor.fullName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white mb-1">{doctor.fullName}</h3>
                      <span className="inline-block bg-cyan-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-600">{doctor.qualification}</span>
                      <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold">
                        {doctor.experienceYear} yrs
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {doctor.description}
                    </p>
                    
                    <div className="pt-3 border-t border-gray-100 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-teal-600">🏥</span>
                        <span className="font-medium">{doctor.department?.departmentName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-cyan-600">📞</span>
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events Section - Horizontal Scroll */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-sm">Join us for health awareness programs →</p>
          </div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-5 w-max">
              {events.map((event) => (
                <div
                  key={event.eventId}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer w-80"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={event.imagePath}
                      alt={event.eventName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-lg">
                      <p className="text-xl font-black text-teal-600">
                        {new Date(event.eventDate).getDate()}
                      </p>
                      <p className="text-xs font-bold text-gray-600 uppercase leading-none">
                        {new Date(event.eventDate).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                      {event.eventName}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-teal-600 font-semibold">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default PublicHospitalDetails;