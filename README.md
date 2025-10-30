# HealthAI - AI-Powered Health Assistant

A modern, responsive web application that provides AI-powered health guidance and wellness tools. Built with React, TypeScript, and powered by advanced AI technology to help users understand their symptoms and get personalized health recommendations.

## 🚀 Features

### 🤖 AI Health Chat
- **Symptom Analysis**: Describe your symptoms and get instant AI-powered analysis
- **Personalized Advice**: Receive tailored health recommendations and treatment suggestions
- **Real-time Responses**: Streaming responses for immediate feedback
- **Medical Disclaimer**: Clear warnings about consulting healthcare professionals

### 🧮 Health Calculators
- **BMI Calculator**: Calculate Body Mass Index with health category indicators
- **Target Heart Rate Calculator**: Determine optimal heart rate zones for exercise
- **Coming Soon**: Water intake calculator and calorie calculator

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Smooth Navigation**: Single-page application with smooth scrolling
- **Accessible UI**: Built with shadcn/ui components for accessibility

### 🔒 Privacy & Security
- **Data Privacy**: No personal health data is stored or shared
- **Secure Communication**: All API calls are encrypted and secure
- **Professional Guidance**: Always recommends consulting healthcare professionals

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management

### Backend & AI
- **Supabase Edge Functions** - Serverless backend functions
- **Google Gemini 2.5 Flash** - Advanced AI model for health analysis
- **Lovable AI Gateway** - AI API integration

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd health-bot-solutions-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage

### Starting a Health Chat
1. Click the "Start Health Chat" button on the homepage
2. Describe your symptoms or health concerns in the chat interface
3. Receive AI-powered analysis and recommendations
4. Always consult healthcare professionals for medical advice

### Using Health Calculators
1. Navigate to the Tools section
2. Enter your measurements (height, weight, age, etc.)
3. Get instant calculations with health insights

### Navigation
- Use the navigation bar to jump to different sections
- Smooth scrolling for better user experience
- Responsive design works on all devices

## 🔧 API Reference

### Health Chat Endpoint
- **URL**: `/functions/v1/health-chat`
- **Method**: POST
- **Body**: `{ messages: Message[] }`
- **Response**: Streaming text response with health guidance

### Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase public API key
- `LOVABLE_API_KEY`: Required for Supabase Edge Function (set in Supabase dashboard)

## ⚠️ Important Disclaimer

**HealthAI is an informational tool and does not provide medical diagnosis or treatment.**

- This application is for educational and informational purposes only
- Always consult with qualified healthcare professionals for medical advice
- In case of emergency, call your local emergency services immediately
- The AI responses are generated based on general medical knowledge and may not be accurate for individual cases
- Users should not rely solely on this application for health decisions

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ToolsSection.tsx
│   ├── ContactSection.tsx
│   └── Navigation.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
│   └── supabase/
└── App.tsx             # Main application component

supabase/
└── functions/          # Edge functions
    └── health-chat/    # AI health chat function
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (via IDE)

## 🤝 Contributing

We welcome contributions to improve HealthAI! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines
- Follow the existing code style and TypeScript conventions
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the health analysis
- **Supabase** for backend infrastructure
- **shadcn/ui** for beautiful UI components
- **Lovable** for the development platform

## 📞 Support

For support or questions:
- Email: support@healthai.com
- Phone: +1 (555) 123-4567
- Location: San Francisco, CA

---

**Remember**: This application is not a substitute for professional medical advice. Always consult healthcare professionals for medical concerns.
