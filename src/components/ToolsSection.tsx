import { Calculator, Heart, Droplets, Activity } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const ToolsSection = () => {
  const [bmiData, setBmiData] = useState({ height: "", weight: "", result: "" });
  const [heartRateData, setHeartRateData] = useState({ age: "", restingHR: "", result: "" });

  const calculateBMI = () => {
    const height = parseFloat(bmiData.height) / 100; // convert cm to m
    const weight = parseFloat(bmiData.weight);
    
    if (height > 0 && weight > 0) {
      const bmi = (weight / (height * height)).toFixed(1);
      let category = "";
      
      if (parseFloat(bmi) < 18.5) category = "Underweight";
      else if (parseFloat(bmi) < 25) category = "Normal weight";
      else if (parseFloat(bmi) < 30) category = "Overweight";
      else category = "Obese";
      
      setBmiData({ ...bmiData, result: `${bmi} - ${category}` });
    }
  };

  const calculateTargetHeartRate = () => {
    const age = parseFloat(heartRateData.age);
    const resting = parseFloat(heartRateData.restingHR);
    
    if (age > 0 && resting > 0) {
      const maxHR = 220 - age;
      const reserve = maxHR - resting;
      const moderate = Math.round(resting + (reserve * 0.5));
      const vigorous = Math.round(resting + (reserve * 0.85));
      
      setHeartRateData({
        ...heartRateData,
        result: `Moderate: ${moderate} bpm, Vigorous: ${vigorous} bpm`
      });
    }
  };

  const tools = [
    {
      icon: Calculator,
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Heart Rate Zones",
      description: "Find your target heart rate for exercise",
      color: "text-secondary",
    },
    {
      icon: Droplets,
      title: "Water Intake",
      description: "Calculate daily water needs (Coming Soon)",
      color: "text-accent",
    },
    {
      icon: Activity,
      title: "Calorie Calculator",
      description: "Estimate daily caloric needs (Coming Soon)",
      color: "text-primary",
    },
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Health <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Use our health calculators to track and understand your wellness metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* BMI Calculator */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">BMI Calculator</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={bmiData.height}
                    onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                  />
                </div>
                <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
                {bmiData.result && (
                  <div className="p-4 rounded-lg bg-primary/10 text-center">
                    <p className="font-semibold text-lg">{bmiData.result}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Heart Rate Calculator */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold">Target Heart Rate</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    value={heartRateData.age}
                    onChange={(e) => setHeartRateData({ ...heartRateData, age: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="resting">Resting Heart Rate (bpm)</Label>
                  <Input
                    id="resting"
                    type="number"
                    placeholder="70"
                    value={heartRateData.restingHR}
                    onChange={(e) => setHeartRateData({ ...heartRateData, restingHR: e.target.value })}
                  />
                </div>
                <Button onClick={calculateTargetHeartRate} className="w-full bg-secondary hover:bg-secondary/90">
                  Calculate
                </Button>
                {heartRateData.result && (
                  <div className="p-4 rounded-lg bg-secondary/10 text-center">
                    <p className="font-semibold text-sm">{heartRateData.result}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Coming Soon Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.slice(2).map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={index} className="p-8 opacity-60 cursor-not-allowed">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-muted ${tool.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
