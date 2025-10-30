import { Shield, Heart, Zap, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your health data is private and secure. We never share your information with third parties.",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Our AI is trained to provide empathetic, understanding responses to your health concerns.",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get immediate analysis of your symptoms and personalized health recommendations.",
    },
    {
      icon: Users,
      title: "Professional Support",
      description: "While we provide guidance, we always recommend consulting healthcare professionals.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">HealthAI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine advanced AI technology with medical knowledge to provide you with instant health insights and guidance. Our mission is to make healthcare information more accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-destructive">Important Disclaimer</h3>
                <p className="text-foreground/90">
                  HealthAI is an informational tool and does not provide medical diagnosis or treatment. Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment. In case of emergency, call your local emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
