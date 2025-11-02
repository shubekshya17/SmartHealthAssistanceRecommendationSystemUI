import { useEffect, useState } from 'react';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { EventDtoForEventPage } from '../ViewModels/Event';
import { message } from 'antd';
import dayjs from 'dayjs';

function EventCard({eventName, eventLocation, description, eventDate, startingTime, closingTime, imageUrl, hospitalName}:any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const formattedDate = dayjs(eventDate).format("YYYY-MM-DD");

  return (
    <div 
      className="relative h-96 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-[350px] transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-blue-300 transition">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {startingTime} - {closingTime}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{eventName}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium">0rganized By: {hospitalName}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm">Location: {eventLocation}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden rotate-y-180">
          <img 
            src={imageUrl} 
            alt={eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h4 className="text-white text-2xl font-bold mb-2">{hospitalName}</h4>
            <p className="text-white/90 text-lg mb-3">{eventName}</p>
            <div className="flex items-center text-white/80 text-sm mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formattedDate} • {startingTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
const BASE_URL = import.meta.env.VITE_API_URL;
export default function Event() {
  const navigate = useNavigate();
  const [hospitalEvent, setHospitalEvent] = useState<EventDtoForEventPage[]>([]);
  const getHospitalEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Event/GetAll`);
        console.log(response.data);
        if (response.status === 200) {
          setHospitalEvent(response.data);
        } else {
          message.error(
            response.data?.message || "Failed to fetch Hospital List."
          );
        }
      } catch (error) {
        message.error("An error occurred while fetching list.");
      }
    };
  
    useEffect(() => {
      getHospitalEvents();
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="text-blue-600 w-8 h-8" />
              <span className="text-2xl font-bold text-gray-900">SmartHealth</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#eventsList" className="text-blue-600 font-semibold">Events</a>
            </div>
            <MapPin
              onClick={() => navigate("/HospitalsNearMe")}
              className="w-6 h-6 text-blue-400 hover:text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-600 mb-6 tracking-tight">
            Upcoming Hospital Events
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Join us in making a difference in community health. Participate in health camps, awareness programs, and wellness workshops.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-mt-24" id="eventsList">
          {hospitalEvent.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        {hospitalEvent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No events found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}