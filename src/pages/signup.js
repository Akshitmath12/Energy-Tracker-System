import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.status === 201) {
      alert("Signup successful! You can now log in.");
      router.push("/");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create your EnergyTracker account ⚡
        </h1>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-3"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <button
          className="w-full text-sm text-green-700 underline"
          onClick={() => router.push("/")}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
