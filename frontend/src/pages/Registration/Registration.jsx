import { useNavigate } from 'react-router-dom';
import { Bed, Car, User } from 'lucide-react';

function Registration() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-start items-center bg-[#8dd3bb] bg-cover bg-center bg-no-repeat font-[Montserrat]"
      style={{ backgroundImage: "url('/assets/backgroundill.png')" }}
    >
      {/* Logo and intro */}
      <div className="pt-28 px-5 text-center w-full max-w-6xl">
        <p className="text-sm text-white mb-10">
          Welcome! Please select your category to begin the registration process.
        </p>
      </div>

      {/* Registration cards */}
      <div className="flex flex-wrap justify-center gap-8 px-5 w-full max-w-6xl">
        {/* Hotel & Stays */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <Bed className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Hotel & Stays</p>
          <button
            className="bg-[#8dd3bb] w-full py-2 rounded-md text-white text-sm font-medium hover:bg-[#7ac8ac]"
            onClick={() => navigate('/registration/hotel')}
          >
            Register Now
          </button>
        </div>

        {/* Taxi & Transport */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <Car className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Taxi & Transport</p>
          <button
            className="bg-[#8dd3bb] w-full py-2 rounded-md text-white text-sm font-medium hover:bg-[#7ac8ac]"
            onClick={() => navigate('/registration/taxi')}
          >
            Register Now
          </button>
        </div>

        {/* Tour Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-[200px] text-center transition-transform duration-200 hover:scale-105">
          <User className="h-[50px] w-[50px] mx-auto text-[#1C1B1F] mb-3" />
          <p className="text-black text-sm mb-4">Tour Guide</p>
          <button
            className="bg-[#8dd3bb] w-full py-2 rounded-md text-white text-sm font-medium hover:bg-[#7ac8ac]"
            onClick={() => navigate('/registration/guide')}
          >
            Register Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default Registration;
