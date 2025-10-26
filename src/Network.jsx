import { useEffect, useState } from "react";
import { CustomButton } from "../src/components/button/Button.jsx";
import { LogoIcon } from "./components/icons/Icons.jsx";

const Network = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 text-center p-6 z-[9999999999]">
      <div className="flex fixed top-[18px] left-[18px] items-center space-x-2 slide-up">
        <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          <LogoIcon />
        </div>
        <h1 className="font-bold text-xl text-gray-800">
          HealthMate{" "}
          <span className="text-sky-600 text-sm">Sehat ka Smart Dost</span>
        </h1>
      </div>
      <div className="mb-8">
        <div className="relative w-24 h-24 rounded-full border-[6px] border-sky-400 animate-pulseCustom">
          <div className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full shadow-md"></div>
        </div>
      </div>

      <h1 className="text-[6vw] font-bold text-blue-800 animate-fadeInDown drop-shadow-sm">
        You’re Offline
      </h1>

      <p className="max-w-lg text-gray-600 text-lg mt-2 mb-8 animate-fadeInUp">
        Oops! It seems your internet connection is lost. Don’t worry — once
        you’re back online, we’ll reconnect automatically.
      </p>

      <CustomButton
        onClick={() => window.location.reload()}
        className="!bg-gradient-to-r from-sky-400 to-blue-600 !text-white !px-8 !py-3 !rounded-full !font-semibold !transition-all !duration-300 hover:scale-105 shadow-lg"
        value={"Retry Connection"}
      />

      <style>{`
        @keyframes pulseCustom {
          0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.6); }
          70% { box-shadow: 0 0 0 25px rgba(56, 189, 248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }
        .animate-pulseCustom {
          animation: pulseCustom 2s infinite;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1.2s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease;
        }
      `}</style>
    </div>
  );
};

export default Network;
