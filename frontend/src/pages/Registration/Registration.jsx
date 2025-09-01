import { useNavigate } from 'react-router-dom';
import { Bed, Car, User } from 'lucide-react';

function Registration() {
  const navigate = useNavigate();

  return (
    <div className="p-0 m-0 max-w-screen">
      <div className="min-h-screen w-screen flex flex-col justify-start items-center bg-[#8dd3bb] bg-cover bg-center bg-no-repeat pt-20 px-5 pb-5 overflow-y-auto z-[1] font-[Montserrat]" style={{backgroundImage: "url('/assets/backgroundill.png')"}}>
        <div className='mb-[15px]'>
          <img src="/assets/logo.svg" alt="logo" className="h-[50px] block mb-[30px]" />
        </div>
        <p className='text-sm text-white mb-[30px]'>Welcome! Please select your category to begin the registration process.</p>

        <div className="flex justify-center gap-[60px] flex-wrap mb-[30px]">
          <div className="bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-[30px] w-[200px] text-center transition-transform duration-200 hover:scale-105">
            <div className=''>
              <div className="">
                <Bed className="h-[50px] w-[50px] mt-[10px] mx-auto text-[#1C1B1F]" />
              </div>
              <p className="text-black text-sm mb-[10px]">Hotel & Stays</p>
              <button className="bg-[#8dd3bb] mt-[10px] p-[10px] w-full border-none rounded-[5px] cursor-pointer text-white text-sm font-medium hover:bg-[#7ac8ac] whitespace-nowrap" onClick={() => navigate('/registration/hotel')}>
                Register Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-[30px] w-[200px] text-center transition-transform duration-200 hover:scale-105">
            <div className=''>
              <div className="">
                <Car className='h-[50px] w-[50px] mt-[10px] mx-auto text-[#1C1B1F] transform translate-y-[-2px]' />
              </div>
              <p className="text-black text-sm mb-[10px] mt-[5px]">Taxi & Transport</p>
              <button className="bg-[#8dd3bb] mt-[10px] p-[10px] w-full border-none rounded-[5px] cursor-pointer text-white text-sm font-medium hover:bg-[#7ac8ac] whitespace-nowrap" onClick={() => navigate('/registration/taxi')}>
                Register Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-[30px] w-[200px] text-center transition-transform duration-200 hover:scale-105">
            <div className=''>
              <div className="">
                <User className='h-[50px] w-[50px] m-[7px] mx-auto text-[#1C1B1F] transform translate-y-[6px]' />
              </div>
              <p className='text-black text-sm mb-[10px] mt-[14px]'>Tour Guide</p>
              <button className="bg-[#8dd3bb] mt-[10px] p-[10px] w-full border-none rounded-[5px] cursor-pointer text-white text-sm font-medium hover:bg-[#7ac8ac] whitespace-nowrap" onClick={() => navigate('/registration/guide')}>
                Register Now
              </button>
            </div>
          </div>
        </div>

        <div>
          <button className='bg-none border-none text-sm text-white cursor-pointer hover:text-black'>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;