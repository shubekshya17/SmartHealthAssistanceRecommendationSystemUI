import { useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../Components/Navbar';
import Bigpicture from '../Components/BigPicture';
import HospitalCard from '../Components/HospitalCard';
import ChatBot from '../Components/Chatbot';

type Hospital = {
    id:number,
    name:string,
    address:string,
    image:string,
}
function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    fetch("/hospitals.json")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched hospitals:", data);
        setHospitals(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div>
        <Bigpicture src="/Doctor.png" alt="Health care" />
         {/*photo tala walla line */}
        <nav className="h-16 bg-[#DBEBF1]"></nav>

        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          {/*side walla line */}
          <nav className="w-full md:w-16 h-screen pl-0 md:pl-10 bg-[#DBEBF1]"></nav>

          {/* Main content below picture*/}
          <div className="flex-1 pt-8 md:pt-20 relative">
            {/* Blue circle/shape */}
            {/* <div 
              className="bg-[#DBEBF1] w-40 h-40 md:w-64 md:h-64 rounded-bl-xl ml-auto -mt-20 md:-mt-32"
            ></div>
             <div 
              className="bg-[#DBEBF1] w-32 h-40 md:w-64 md:h-64 rounded- ml-auto -mt-20 md:-mt-32"
            ></div> */}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6  pr-4 md:pr-20">
              {hospitals.map(h => (
                <HospitalCard
                  key={h.id}
                  name={h.name}
                  address={h.address}
                  image={h.image}
                />
              ))}
            </div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
}

export default Home;
