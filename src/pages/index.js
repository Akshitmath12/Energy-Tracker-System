import { useState } from "react";
import { useUser } from "./context/userContext";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { login } = useUser();
  const router = useRouter(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      login({
        email,
        userId: data.userId,
        name: data.userName,
      });
      router.push("/EnergyForm"); // redirect after login
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">EnergyTracker ⚡</h1>

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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogin}
          style={{cursor: "pointer"}}
        >
          Login
        </button>

        <button
          className="w-full mt-3 text-sm text-green-700 underline"
          onClick={() => router.push("/signup")}
          style={{cursor: "pointer"}}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}

