import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ToolsSection from "@/components/ToolsSection";
import ContactSection from "@/components/ContactSection";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigate = (section: string) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} />
      <HeroSection onChatOpen={() => setIsChatOpen(true)} />
      <AboutSection />
      <ToolsSection />
      <ContactSection />
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 HealthAI. For informational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
