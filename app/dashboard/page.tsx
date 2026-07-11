"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Bell,
  Settings,
  Search,
  Copy,
  RefreshCw,
  FileText,
  AlertTriangle,
  CircleOff,
  Lightbulb,
  Target,
   Rocket,
} from "lucide-react";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState<any>(null);
const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
const [profileImage, setProfileImage] = useState<string | null>(null);

const fileInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  const savedImage = localStorage.getItem("profileImage");

  if (savedImage) {
    setProfileImage(savedImage);
    return;
  }

  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);

    if (user.picture) {
      setProfileImage(user.picture);
    }
  }
}, []);
const handleProfileImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  }
};
  const scopeText = `
• User Authentication
• Admin Dashboard
• User Profiles
• Payment Integration
• Reporting System
`;

  const questionsText = `
• What user roles are required?
• Is payment gateway needed?
• Do you need mobile responsiveness?
• Expected launch date?
`;

  // const handleGenerate = () => {
  //   if (!requirements.trim()) {
  //     alert("Please enter project requirements");
  //     return;
  //   }

  //   setShowAnalysis(true);
  // };
const handleGenerate = async () => {
  if (!requirements.trim()) {
    alert("Please enter project requirements");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requirements,
      }),
    });

    const data = await response.json();

    setAnalysis(data);
    setShowAnalysis(true);
  } catch (error) {
    console.error(error);
    alert("Failed to generate analysis");
  } finally {
    setLoading(false);
  }
};
  const copyScope = () => {
    navigator.clipboard.writeText(scopeText);
    alert("Scope copied!");
  };

  const copyQuestions = () => {
    navigator.clipboard.writeText(questionsText);
    alert("Questions copied!");
  };

  const regenerate = () => {
    alert("Analysis regenerated!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
     <nav className="flex items-center justify-between border-b bg-white px-6 py-4">
  <img
    src="/logos/logo.png"
    alt="FlowixPro Logo"
    width={160}
    height={50}
    className="h-10 w-auto"
  />
        {/* Search */}
        <div className="hidden md:flex items-center w-[450px] rounded-xl border border-gray-300 px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search project history..."
            className="ml-2 w-full outline-none text-sm text-gray-600"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Bell
            size={22}
            className="cursor-pointer text-gray-500 hover:text-[#1698AC]"
          />

          <Settings
            size={22}
            className="cursor-pointer text-gray-500 hover:text-[#1698AC]"
          />
          <div
  onClick={() => fileInputRef.current?.click()}
  className="cursor-pointer"
>
  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      className="h-10 w-10 rounded-full border-2 border-[#1698AC] object-cover"
    />
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1698AC] font-semibold text-white">
      Z
    </div>
  )}
</div>

<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleProfileImage}
  className="hidden"
/>
        </div>
      </nav>

      {/* Trial Banner */}
      <div className="flex flex-col gap-3 border-b bg-[#EAF8FB] px-6 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#1698AC]">
          🎉 You are currently using the 14-Day Free Trial.
          You have{" "}
          <span className="font-semibold">
            10 days remaining
          </span>{" "}
          before your trial expires. Upgrade now to continue
          enjoying uninterrupted AI features.
        </p>

        <button className="rounded-lg bg-[#1698AC] px-5 py-2 text-sm font-medium text-white hover:bg-[#127f91]">
          Upgrade Now
        </button>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-6xl p-6 md:p-8">
        <h2 className="text-center text-4xl font-bold text-gray-800">
          AI Scope Generator
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Paste your client requirements below and let AI
          generate a complete project scope.
        </p>

        {/* Input Card */}
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <textarea
            value={requirements}
            onChange={(e) =>
              setRequirements(e.target.value)
            }
            placeholder="Paste your client's project requirements here (WhatsApp transcript, email, brief)..."
            className="h-64 w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-700 outline-none focus:border-[#1698AC]"
          />

          <div className="mt-6 flex justify-center">
<button
  onClick={handleGenerate}
  disabled={loading}
  className="flex items-center gap-2 rounded-xl bg-[#1698AC] px-8 py-3 font-medium text-white hover:bg-[#127f91] disabled:opacity-50"
>
  <Rocket size={18} />
  {loading ? "Generating..." : "Generate Scope"}
</button>
          </div>
        </div>

        {/* Analysis */}
        {showAnalysis && (
          <div className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">
                Generated Analysis
              </h3>

              <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700">
                ✓ READY TO REVIEW
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {/* Summary */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <FileText
                    size={18}
                    className="text-[#1698AC]"
                  />
                  <h4 className="font-semibold text-black">
                    Project Summary
                  </h4>
                </div>

                <p className="text-sm text-gray-600">
                  Comprehensive web-based platform for
                  managing users, authentication,
                  dashboards, payments and reporting
                  systems.
                </p>
              </div>

              {/* Scope */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Target
                    size={18}
                    className="text-green-600"
                  />
                  <h4 className="font-semibold text-black">
                    Project Scope
                  </h4>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✔ User Authentication</li>
                  <li>✔ Admin Dashboard</li>
                  <li>✔ User Profiles</li>
                  <li>✔ Payment Integration</li>
                  <li>✔ Reporting System</li>
                </ul>
              </div>

              {/* Not Included */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <CircleOff
                    size={18}
                    className="text-red-500"
                  />
                  <h4 className="font-semibold text-black">
                    Not Included
                  </h4>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>SEO Services</li>
                  <li>Content Creation</li>
                  <li>Marketing Campaigns</li>
                  <li>Server Maintenance</li>
                </ul>
              </div>

              {/* Missing */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle
                    size={18}
                    className="text-yellow-500"
                  />
                  <h4 className="font-semibold text-black">
                    Missing Information
                  </h4>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Target Audience</li>
                  <li>Preferred Tech Stack</li>
                  <li>Project Timeline</li>
                  <li>Budget Range</li>
                </ul>
              </div>

              {/* Risk */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle
                    size={18}
                    className="text-orange-500"
                  />
                  <h4 className="font-semibold text-black">
                    Risk Alerts
                  </h4>
                </div>

                <p className="text-sm text-gray-600">
                  Third-party API integration
                  requirements are not fully specified and
                  may impact development timeline.
                </p>
              </div>

              {/* Questions */}
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Lightbulb
                    size={18}
                    className="text-purple-500"
                  />
                  <h4 className="font-semibold text-black">
                    Suggested Questions
                  </h4>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>What user roles are required?</li>
                  <li>Is payment gateway needed?</li>
                  <li>Do you need mobile responsiveness?</li>
                  <li>Expected launch date?</li>
                </ul>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={copyScope}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2 text-black hover:bg-gray-100"
              >
                <Copy size={16} />
                Copy Scope
              </button>

              <button
                onClick={copyQuestions}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2 text-black hover:bg-gray-100"
              >
                <Copy size={16} />
                Copy Questions
              </button>

              <button
                onClick={regenerate}
                className="flex items-center gap-2 rounded-lg bg-[#1698AC] px-5 py-2 text-white hover:bg-[#127f91]"
              >
                <RefreshCw size={16} />
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}