import { Link } from "react-router-dom";
import { LogoIcon } from "./components/icons/Icons";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 text-center p-6">
       <div className="flex fixed top-[18px] left-[18px] items-center space-x-2 slide-up">
             <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
               <LogoIcon />
             </div>
             <h1 className="font-bold text-xl text-gray-800">
               HealthMate{" "}
               <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
             </h1>
           </div>
     
      <h1 className="text-[9vw] font-extrabold leading-none bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm animate-fadeInDown">
        404
      </h1>

      <h2 className="text-[4vw] font-semibold text-blue-800 mt-2 mb-3 animate-fadeIn">
        Page Not Found
      </h2>

      <p className="max-w-xl text-gray-600 text-lg mb-8 animate-fadeInUp">
        Oops! The page you’re looking for doesn’t exist, was removed, or is
        temporarily unavailable.
      </p>

      <Link
        to="/dashboard"
        className="px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105"
      >
        Go Back to Dashboard
      </Link>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
