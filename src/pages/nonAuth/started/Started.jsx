import { Link } from "react-router-dom";
import { CustomButton } from "../../../components/button/Button";

const GetStartedSection = () => {
  return (
    <section id="getstarted" className="mt-24 mb-16 text-center px-6">
      <h3 className="text-3xl font-bold mb-4 text-gray-900">
        Get Started Today
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Begin your smart health journey in just a few clicks — no doctor visit
        needed.
      </p>
      <div className="flex justify-center">
        <Link to={"/signup"}>
          <CustomButton
            value={"Create Your Account"}
            className="hover:!scale-95 active:!scale-90"
          />
        </Link>
      </div>
    </section>
  );
};

export default GetStartedSection;
