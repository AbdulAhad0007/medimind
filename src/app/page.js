"use client";
import { useI18n } from "../components/LanguageProvider";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Home() {
  const { t } = useI18n();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_en29j5o", // replace with your EmailJS service ID
        "template_kxfhvzq", // replace with your EmailJS template ID
        form.current,
        "drH9w5shVR5S0Ko1P" // replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          alert("Your enquiry has been sent successfully!");
        },
        (error) => {
          console.error("Email sending error:", error.text);
          alert("There was an error sending your enquiry.");
        }
      );
  };

  return (
    <div className="container-page flex flex-col items-center justify-center text-center py-16">
      {/* Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        {t.welcome}
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl text-gray-300">
        {t.heroSubtitle}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-3 mb-8">
        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
          {t.freeToTry}
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
          Easy chat support
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
          {t.multilingual}
        </span>
      </div>

      {/* CTA Button */}
      <div className="flex gap-3">
        <a
          href="/chat"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          {t.ctaStart}
        </a>
      </div>

      {/* Three Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 w-full">
        <div className="card flex flex-col justify-center items-center text-center h-full animate-fadeInUp">
          <img
            src="/images/doctor.svg"
            alt="Doctor icon"
            className="w-10 h-10 mb-3"
          />
          <h3 className="text-gray-600 text-lg font-semibold mb-1">{t.card1Title}</h3>
          <p className="text-sm text-gray-600">{t.card1Desc}</p>
        </div>

        <div className="card flex flex-col justify-center items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '120ms' }}>
          <img
            src="/images/secure.svg"
            alt="Secure icon"
            className="w-10 h-10 mb-3"
          />
          <h3 className="text-gray-600 text-lg font-semibold mb-1">{t.card2Title}</h3>
          <p className="text-sm text-gray-600">{t.card2Desc}</p>
        </div>

        <div className="card flex flex-col justify-center items-center text-center h-full animate-fadeInUp" style={{ animationDelay: '240ms' }}>
          <img src="/images/typing.svg" alt="Chat icon" className="w-10 h-10 mb-3" />
          <h3 className="text-gray-600 text-lg font-semibold mb-1">{t.card3Title}</h3>
          <p className="text-sm text-gray-600">{t.card3Desc}</p>
        </div>
      </div>

      {/* Goal & Purpose */}
      <div className="mt-10 max-w-2xl text-left animate-fadeInUp">
        <h3 className="text-gray-400 new text-xl font-semibold">{t.goalTitle}</h3>
        <p className="text-gray-500 mb-4">{t.goalDescription}</p>

        <h3 className="text-gray-400 new text-xl font-semibold">{t.goalTitle}</h3>
        <p className="text-gray-500 mb-6">{t.goalDescription}</p>
      </div>

      {/* Enquiry Form */}
      <div className="mt-8 p-4 border rounded-lg shadow-md  w-full max-w-md">
        <h3 className="text-gray-500 text-lg font-semibold mb-4">Enquiry Form</h3>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className=" block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select name="gender" required className="w-full p-2 border rounded bg-gray-700">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Comments</label>
            <textarea
              name="comments"
              rows="4"
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
