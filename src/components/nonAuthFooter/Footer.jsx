import { CheckCircle } from "lucide-react";
import { features } from "../../lib/constants";
import ScrollReveal from "../../lib/ScrolReveal";

const Footer = () => {
  return (
    <ScrollReveal>
      <footer className="bg-gradient-to-b from-sky-50 via-blue-50 to-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-md p-10 flex flex-col md:flex-row justify-between items-start gap-10 border border-blue-100">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Start managing your health smarter
            </h2>
            <p className="text-gray-600 mb-6">
              All your reports, vitals, and AI insights — one place, one click.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-sky-700 mb-4">
              What you get
            </h3>
            <ul className="space-y-3">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-sky-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} HealthMate — Sehat ka Smart Dost
        </div>
      </footer>
    </ScrollReveal>
  );
};

export default Footer;
