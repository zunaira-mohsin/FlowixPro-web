"use client";
  import { useState } from "react";
  import Link from "next/link";
  import Swal from "sweetalert2";
  import Image from "next/image";
  import { useRouter } from "next/navigation";
  import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleGoogleSuccess = (
  credentialResponse: CredentialResponse
) => {
  try {
    if (!credentialResponse.credential) return;

    const token = credentialResponse.credential;

    const payload = JSON.parse(
      atob(
        token.split(".")[1]
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
      title: "Google Login Successful",
      text: `Welcome ${payload.name}!`,
    }).then(() => {
      router.push("/dashboard");
    });

  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: "Please try again.",
    });
  }
};

    // Normal Login
    const handleLogin = () => {
      const userData = localStorage.getItem("user");

      if (!userData) {
        Swal.fire({
          icon: "error",
          title: "No Account Found",
          text: "Please create an account first.",
        });
        return;
      }

      const user = JSON.parse(userData);

      if (email === user.email && password === user.password) {
        localStorage.setItem("isLoggedIn", "true");

        // Swal.fire({
        //   icon: "success",
        //   title: "Login Successful",
        //   text: `Welcome ${user.name}!`,
        // });

        // setEmail("");
        // setPassword("");
        Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: `Welcome ${user.name}!`,
}).then(() => {
  router.push("/dashboard");
});

setEmail("");
setPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Email or Password",
        });
      }
    };

    return (
      <div className="min-h-screen grid md:grid-cols-2">
        {/* Left Side */}
             {/* Left Side */}
<img
  src="/logos/logo.png"
  alt="FlowixPro Logo"
  className="absolute md:top-8 md:left-8 top-3 left-3 w-24 md:w-40 h-auto z-10"
/>
        <div className="hidden md:flex flex-col justify-center bg-[#EAF8FB] px-16">
          <h1 className="text-5xl font-bold text-[#0F172A] leading-tight">
            Welcome to <br />
            <span className="text-[#1698AC]">FlowixPro.</span>
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
              <h2 className="text-3xl font-bold text-[#0F172A]">24/7</h2>br
              <p className="text-gray-500">AI Account  <br />Available</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-white p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-2 text-3xl font-bold text-[#0F172A]">
              Sign In
            </h2>

            <p className="mb-6 text-gray-500">
              Enter your details to access your account
            </p>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-500 mb-4 w-full rounded-lg border px-4 py-3"
            />

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-500 mb-4 w-full rounded-lg border px-4 py-3"
            />

            {/* Remember Me + Forgot Password */}
            <div className="mb-6 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#1698AC]"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#1698AC] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-[#1698AC] py-3 text-white hover:bg-[#127f91]"
            >
              Sign In
            </button>

            {/* OR */}
            <div className="my-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-300"></div>
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
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1698AC]"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }