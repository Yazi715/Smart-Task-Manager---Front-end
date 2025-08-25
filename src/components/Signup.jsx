import React, { useState } from "react";
import bgWhite from "../assets/imgs/bg_white.png";

export default function Signup({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      setMessage("Registered! Please sign in.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#d7195c] flex flex-col items-center justify-center">
      <img
        src={bgWhite}
        alt="Decorative"
        className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
        style={{ opacity: 0.18 }}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#d7195c] mb-2">Sign Up</h2>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d7195c]"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d7195c]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {message && (
          <div className="text-green-600 text-sm text-center">{message}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-[#d7195c] text-white rounded-lg font-semibold shadow hover:bg-rose-700 transition z-10"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="w-full text-[#d7195c] hover:underline text-sm"
        >
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}
