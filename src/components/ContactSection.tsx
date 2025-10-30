import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "./ui/card";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "me@gmail.com",
      link: "mailto:ahadabdul9976@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8826324062",
      link: "tel:+918826324062",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Uttar Pradesh",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 text-center hover:shadow-lg transition-all duration-300 ${
                    info.link ? "cursor-pointer hover:border-primary/50" : ""
                  }`}
                  onClick={() => info.link && window.open(info.link, "_blank")}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="text-2xl font-semibold mb-4">24/7 AI Health Assistant</h3>
            <p className="text-muted-foreground mb-6">
              Our AI-powered health assistant is always available to help you with your health concerns. Start a conversation anytime to get instant guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Always Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Instant Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Confidential & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
