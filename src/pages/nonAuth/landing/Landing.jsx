import ScrollReveal from "../../../lib/ScrolReveal";
import FAQSection from "../faq/Faq";
import FeaturesSection from "../features/Features";
import HeroSection from "../heroSection/HeroSection";
import GetStartedSection from "../started/Started";
import HowItWorks from "../works/Works";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-4">
      <div>
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
      </div>
      <div>
        <ScrollReveal>
          <FeaturesSection />
        </ScrollReveal>
      </div>
      <div>
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
      </div>
      <div>
        <ScrollReveal>
          <FAQSection />
        </ScrollReveal>
      </div>
      <div>
        <ScrollReveal>
          <GetStartedSection />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default LandingPage;
