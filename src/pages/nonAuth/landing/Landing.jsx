import FAQSection from "../faq/Faq";
import FeaturesSection from "../features/Features";
import HeroSection from "../heroSection/HeroSection";
import GetStartedSection from "../started/Started";
import HowItWorks from "../works/Works";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-4">
      <div>
        <HeroSection />
      </div>
      <div>
        <FeaturesSection />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <FAQSection />
      </div>
      <div>
        <GetStartedSection />
      </div>
    </div>
  );
};

export default LandingPage;
