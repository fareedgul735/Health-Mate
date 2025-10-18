import { Link } from "react-router-dom";
import { WEBLOGO } from "../../assets/labels/logo";
import { Links } from "../../lib/constants";

const Footer = () => {
  return (
    <footer className=" w-screen text-gray-300 py-10 px-6">
      <div className="grid grid-cols-1 border-t border-gray-300 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 p-[12px]">
        <div className="flex items-start">
          <img
            src={WEBLOGO}
            alt="healthMade"
            className="h-18 w-auto md:h-10 lg:h-32 object-contain"
          />
        </div>

        <div>
          <h3 className="text-gray-900 text-base font-semibold mb-3">
            Overview
          </h3>
          <ul className="space-y-2 text-gray-900">
            {Links.map((val, index) => (
              <li key={index}>
                <Link to={val.path}>{val.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-gray-700 text-base font-semibold mb-3">
            Contact
          </h3>
          <p className="text-sm text-gray-700">
            Email:BorcelleHealthSrevice@ticketms.com
          </p>
          <p className="text-sm text-gray-700">Phone: +92 3222156119</p>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
        <p>© 2025 BorcelleHealthSrevice All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
