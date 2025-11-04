import { Link } from "react-router-dom";
import { CustomButton } from "../../../components/button/Button";
import { BiArrowFromLeft } from "react-icons/bi";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center mt-10 md:mt-20 max-w-3xl">
      <span className="bg-blue-100 text-sky-700 text-sm px-4 py-1 rounded-full mb-4 font-medium">
        🤖 AI-powered Health Companion
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Manage your <span className="text-sky-600">health, reports &</span>{" "}
        <span className="text-blue-700">vitals</span> — beautifully
      </h2>

      <p className="text-gray-600 mt-4 text-lg">
        Upload your medical reports, get AI-powered explanations, and track your
        vitals — all in one colorful, easy experience.
      </p>
      <p className="mt-2 text-sky-600 italic">
        “HealthMate — Sehat ka smart dost.”
      </p>
      <div className="p-[12px]">
        <Link to={"/login"}>
          <CustomButton
            value={"Signin"}
            className="hover:!scale-95 active:!scale-90 slide-up !flex lg:!hidden"
          />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
