"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all fields",
      });
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
      icon: "success",
      title: "Signup Successful",
      text: "Account created successfully",
    }).then(() => {
      window.location.href = "/login";
    });
  };
const handleGoogleSuccess = (
  credentialResponse: CredentialResponse
) => {
  try {
    if (!credentialResponse.credential) return;

    const token = credentialResponse.credential;

    const payload = JSON.parse(
      atob(
        token
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    const user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      password: "google-auth",
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    Swal.fire({
      icon: "success",
      title: "Google Signup Successful",
      text: `Welcome ${payload.name}!`,
    }).then(() => {
      window.location.href = "/dashboard";
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Google Signup Failed",
    });
  }
};
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side */}
<img
  src="/logos/logo.png"
  alt="FlowixPro Logo"
  className="absolute md:top-8 md:left-8 top-3 left-3 w-24 md:w-40 h-auto z-10"
/>
      <div className="hidden md:flex flex-col justify-center bg-[#EAF8FB] px-16">
        <h1 className="text-5xl font-bold text-[#0F172A] leading-tight">
          Welcome to <br />
          <span className="text-[#1698AC]">FlówixPro.</span>
        </h1>

        <p className="mt-6 max-w-md text-lg text-gray-600">
         Transform messy client requirements into clear project scopes, identify missing details, and generate smart follow-up questions in seconds with AI.
        </p>
 <div className="mt-10 flex gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]">30</h2>
              <p className="text-3xl font-bold text-[#0F172A]">seconds</p>
              <p className="text-sm text-gray-500">Average Analysis <br /> Time</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]">6 AI</h2>
              <p className="text-3xl font-bold text-[#0F172A]">Insights</p>
              <p className="text-gray-500">Generated Per <br /> Analysis</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]">24/7</h2>
              <p className="text-gray-500">AI Account  <br />Available</p>
            </div>
          </div>
        </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-2 text-3xl font-bold text-[#0F172A]">
            Create Account
          </h2>

          <p className="mb-6 text-gray-500">
            Enter your details to create your account
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-black"
          />

          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-black"
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-black"
          />

          <button
            onClick={handleSignup}
            className="mb-4 w-full rounded-lg bg-[#1698AC] py-3 text-white"
          >
            Create Account
          </button>

          <div className="mb-4 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span className="text-gray-600">OR</span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>
      <div className="mb-6 w-full flex justify-center">
     <GoogleLogin
       size="large"
       text="continue_with"
       shape="rectangular"
       theme="outline"
       onSuccess={handleGoogleSuccess}
       onError={() =>
         Swal.fire({
           icon: "error",
           title: "Google Login Failed",
         })
       }
     />
   </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1698AC]"
            >
              Sign In
            </Link>
          </p>
          
        </div>
  </div>
</div>
     
   
    
  );
}
