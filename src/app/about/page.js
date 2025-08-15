export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-white mb-3">About MediMind</h1>
      <p className="text-gray-300 max-w-3xl">
        MediMind is an AI-powered health guidance assistant. Our goal is to help people make informed decisions about
        what to do next when they feel unwell. We provide general guidance, education, and tips on when to seek care.
        MediMind does not provide medical diagnoses and is not a substitute for professional medical advice.
      </p>

      {/* New Our Story Section */}
      <div className="mt-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-white mb-2">Our Story</h2>
        <p className="text-gray-300">
          MediMind was born from a simple idea: healthcare information should be clear, accessible, and available
          anytime — without confusion or overwhelming jargon. Our team combines medical expertise with cutting-edge
          AI to create a platform that guides you in plain language and helps you take the right next step for your
          health.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-gray-600 font-semibold mb-1">Our Mission</h3>
          <p className="text-sm text-gray-600">
            To empower individuals with trustworthy, easy-to-understand health guidance, ensuring that no one feels
            lost when it comes to their wellbeing.
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold mb-1">Our Vision</h3>
          <p className="text-sm text-gray-600">
            A world where everyone — regardless of location, language, or background — can access reliable health
            information in seconds.
          </p>
        </div>
      </div>

      {/* Original Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card">
          <h3 className="text-gray-600 font-semibold mb-1">Careful by design</h3>
          <p className="text-sm text-gray-600">We emphasize safety, clarity, and privacy in every response.</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold mb-1">Language support</h3>
          <p className="text-sm text-gray-600">Use MediMind in multiple languages to reach more people.</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 font-semibold mb-1">Built for learning</h3>
          <p className="text-sm text-gray-600">We iteratively improve guidance quality with user feedback.</p>
        </div>
      </div>

      {/* Closing Call-to-Action */}
      <div className="mt-12 p-6 bg-blue-600 rounded-lg text-white text-center">
        <h3 className="text-xl font-semibold mb-2">Join Us on This Journey</h3>
        <p className="mb-4">
          Whether you’re here to learn, get guidance, or help us improve, MediMind grows with your participation.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
