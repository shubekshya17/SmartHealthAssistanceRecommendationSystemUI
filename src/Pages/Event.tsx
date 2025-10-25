import { useState } from 'react';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EventCard({ date, title, description, hospital, hospitalImage, time, location}:any) {
  const [isFlipped, setIsFlipped] = useState(false);

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
                {date}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {time}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium">{hospital}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden rotate-y-180">
          <img 
            src={hospitalImage} 
            alt={hospital}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h4 className="text-white text-2xl font-bold mb-2">{hospital}</h4>
            <p className="text-white/90 text-lg mb-3">{title}</p>
            <div className="flex items-center text-white/80 text-sm mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{date} • {time}</span>
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

export default function Event() {
  const navigate = useNavigate();
  const events = [
    {
      date: "Nov 5, 2025",
      time: "9:00 AM - 3:00 PM",
      title: "Blood Donation Drive",
      description: "Join our lifesaving blood donation campaign. Your donation can save up to 3 lives. Free health checkup included for all donors.",
      hospital: "City General Hospital",
      location: "Kathmandu, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      category: "Health Campaign"
    },
    {
      date: "Nov 12, 2025",
      time: "10:00 AM - 4:00 PM",
      title: "Free Eye Care Campaign",
      description: "Complimentary eye checkups and vision screening for all age groups. Free reading glasses for those in need.",
      hospital: "Vision Care Center",
      location: "Pokhara, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
      category: "Medical Camp"
    },
    {
      date: "Nov 18, 2025",
      time: "2:00 PM - 5:00 PM",
      title: "Health Awareness Workshop",
      description: "Learn about preventive healthcare, nutrition, and wellness strategies from expert doctors and nutritionists.",
      hospital: "Community Health Center",
      location: "Lalitpur, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
      category: "Workshop"
    },
    {
      date: "Nov 25, 2025",
      time: "8:00 AM - 12:00 PM",
      title: "Diabetes Screening Camp",
      description: "Free diabetes screening and consultation. Learn about managing blood sugar levels and healthy lifestyle choices.",
      hospital: "Metropol Hospital",
      location: "Bhaktapur, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      category: "Medical Camp"
    },
    {
      date: "Dec 2, 2025",
      time: "1:00 PM - 4:00 PM",
      title: "Mental Health Awareness Seminar",
      description: "Breaking the stigma around mental health. Interactive session with psychiatrists and counselors.",
      hospital: "Mindcare Wellness Center",
      location: "Kathmandu, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
      category: "Workshop"
    },
    {
      date: "Dec 10, 2025",
      time: "9:00 AM - 2:00 PM",
      title: "Vaccination Drive for Children",
      description: "Free vaccination camp for children under 5 years. Covering all essential vaccines recommended by WHO.",
      hospital: "Children's Healthcare Center",
      location: "Chitwan, Nepal",
      hospitalImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
      category: "Health Campaign"
    }
  ];

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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition" onClick={() => navigate("/HospitalsNearMe")}>
              Find Hospitals
            </button>
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
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No events found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}