import { useEffect, useState } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Bell,
  MapPin,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import type { HospitalDropdownDto } from "../ViewModels/HospitalDropdownDto";
import axios from "axios";
import { message, Select } from "antd";
import "../index.css";

export default function HomePage() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
    });
  }, []);

  const faqs = [
    {
      question: "What is the Smart Health Assistance Recommendation System?",
      answer:
        "Smart Health Assistance is a web platform that helps users easily find nearby hospitals and clinics based on their location. It also allows users to book doctor appointments online and receive timely health-related updates.",
    },
    {
      question: "How does the hospital recommendation system work?",
      answer:
        "Our system uses geolocation and smart algorithms to suggest hospitals and clinics closest to your current location. It takes into account availability, services offered, and user preferences to give you the best recommendations.",
    },
    {
      question: "Can I book doctor appointments through the system?",
      answer:
        "Yes! You can view available doctors, check their schedules, and book appointments directly through our platform without any hassle.",
    },
    {
      question: "Is my personal and location data secure?",
      answer:
        "Absolutely. Your data is protected using modern encryption standards and is never shared without your consent. We value your privacy and ensure a safe user experience.",
    },
    {
      question:
        "What makes this system different from other hospital-finding apps?",
      answer:
        "Unlike traditional hospital directories, our platform offers real-time recommendations, appointment booking, and personalized suggestions — all in one place. It bridges the gap between patients and hospitals for a smoother healthcare experience.",
    },
  ];

  const news = [
    {
      date: "Oct 22, 2025",
      title: "Nearby Hospital Recommendation Feature Released",
      description:
        "Users can now view and navigate to the nearest hospitals and clinics using real-time location tracking.",
    },
    {
      date: "Oct 18, 2025",
      title: "Online Appointment Booking Now Live",
      description:
        "Patients can directly book doctor appointments from our platform without visiting hospitals in person.",
    },
    {
      date: "Oct 10, 2025",
      title: "Health Notices and Emergency Alerts Added",
      description:
        "Stay informed with the latest public health updates, vaccination drives, and emergency alerts in your area.",
    },
  ];

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const [hospitalDropdownList, setHospitalDropdownList] = useState<
    HospitalDropdownDto[]
  >([]);

  const getHospitalDropdown = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Hospitals/GetAll`);
      if (response.status === 200 && response?.data) {
        setHospitalDropdownList(response.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Hospital Dropdown List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getHospitalDropdown();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

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
              <a href="#about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600">
                FAQ
              </a>
              <a href="#news" className="text-gray-700 hover:text-blue-600">
                News
              </a>
              <Link to="/Event" className="text-gray-700 hover:text-blue-600">
                Events
              </Link>
              <Link
                to="/EmergencyNumber"
                className="text-gray-700 hover:text-blue-600"
              >
                Emergency
              </Link>
              <Select
                showSearch
                placeholder="Search hospitals..."
                optionFilterProp="label"
                options={hospitalDropdownList.map((h) => ({
                  label: h.hospitalName,
                  value: h.hospitalId,
                }))}
                onSelect={(value) =>
                  navigate(`/PublicHospitalDetails/${value}`)
                }
                filterOption={(input, option) => {
                  const label = (option?.label ?? "")
                    .toLowerCase()
                    .replace(/\s+/g, "");
                  const searchValue = input.toLowerCase().replace(/\s+/g, "");
                  return label.includes(searchValue);
                }}
                suffixIcon={null}
                className="custom-select"
              />
            </div>

            <div className="flex items-center space-x-4">
              <MapPin
                onClick={() => navigate("/HospitalsNearMe")}
                className="w-6 h-6 text-blue-400 hover:text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
              />
              <User
                onClick={() => navigate("/LoginSignup")}
                className="w-6 h-6 text-blue-400 hover:text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Know How You Feel. Find The Right Care.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get intelligent health recommendations, track your wellness
              journey, and stay connected with healthcare professionals—all in
              one place.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToAbout}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition flex items-center"
              >
                Discover More
              </button>
              <div
                className="animate-bounce cursor-pointer"
                onClick={scrollToAbout}
              >
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="./Doctor1.png" alt="Doctor" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
              💡 About Our Application 🏥
            </span>

            {/* Marquee */}
            <div className="overflow-hidden mb-6">
              <div className="animate-marquee whitespace-nowrap inline-block">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 tracking-tight mx-8">
                  Healthcare with Intelligence
                </span>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 tracking-tight mx-8">
                  Healthcare with Intelligence
                </span>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 tracking-tight mx-8">
                  Healthcare with Intelligence
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 border border-white">
            <p className="text-lg text-gray-800 leading-relaxed mb-6 font-light">
              <span className="font-semibold text-xl text-blue-600">
                Smart Health Assistance Recommendation System
              </span>{" "}
              is an intelligent web platform designed to simplify healthcare
              access for everyone. Using{" "}
              <span className="font-medium text-purple-600">
                geolocation and smart recommendation algorithms
              </span>
              , it helps users easily discover nearby hospitals, clinics, and
              healthcare centers based on their current location and needs.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6 font-light">
              With an intuitive interface, users can{" "}
              <span className="font-medium text-pink-600">
                book doctor appointments online
              </span>
              , check hospital details, and view available services in just a
              few clicks. Our system bridges the gap between patients and
              hospitals, making the process of finding the right care provider
              fast and reliable.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed font-light">
              Beyond location-based hospital suggestions, the platform also
              includes{" "}
              <span className="font-medium text-blue-600">
                real-time updates, health notices, and emergency contact
                features
              </span>
              . Our goal is to create a seamless healthcare experience — one
              where users can make informed choices, manage appointments
              efficiently, and stay updated on essential health-related
              information. Join{" "}
              <span className="font-semibold text-purple-600">
                thousands of users
              </span>{" "}
              taking control of their well-being with Smart Health Assistance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold text-center text-gray-900 mb-12"
            data-aos="fade-up"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                data-aos="fade-up"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-semibold text-gray-900 text-left">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Bell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stay Updated on Our Latest News & Notices
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss out on new features, updates, and health insights
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition"
              >
                <p className="text-sm text-blue-600 font-semibold mb-2">
                  {item.date}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            {/* Left Side - Contact Form */}
            <div>
              <h3 className="text-3xl font-bold mb-2">We would love</h3>
              <h3 className="text-3xl font-bold mb-4">to hear from you.</h3>
              <p className="text-gray-400 mb-6">
                Feel free to reach out if you want to collaborate with us, or
                simply have a chat.
              </p>
            </div>

            {/* Right Side - Contact Info & Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Contact us</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Our Email</li>
                  <li>hello@smarthealth.com</li>
                  <li className="pt-2">Our Phone</li>
                  <li>+977 1234567890</li>
                  <li className="pt-2">Our Address</li>
                  <li>Kathmandu, Nepal</li>
                </ul>
              </div>
              <div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-3 text-gray-400 text-sm">
                    <a href="#" className="hover:text-white">
                      Instagram
                    </a>
                    <a href="#" className="hover:text-white">
                      Facebook
                    </a>
                    <a href="#" className="hover:text-white">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
