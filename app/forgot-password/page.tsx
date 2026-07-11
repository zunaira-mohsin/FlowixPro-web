"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      Swal.fire("Error", "No account found", "error");
      return;
    }

    const user = JSON.parse(userData);

    if (user.email !== email) {
      Swal.fire("Error", "Email not found", "error");
      return;
    }

    Swal.fire({
      title: "Password Found",
      text: `Your password is: ${user.password}`,
      icon: "success",
       confirmButtonText: "OK",
}).then(() => {
  window.location.href = "/login";
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-[#1698AC] text-2xl font-bold mb-4">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className=" text-gray-500 w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-[#1698AC] text-white p-3 rounded"
        >
          Recover Password
        </button>
      </div>
    </div>
  );
}