import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import BenefitsSection from "./sections/BenefitsSection";
import ModulesSection from "./sections/ModulesSection";
import AISection from "./sections/AISection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./components/Footer";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <ModulesSection />
        <AISection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
