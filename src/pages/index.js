import { useState } from "react";
import { useUser } from "./context/userContext";

export default function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (res.status === 201) {
      login({
        email,
        name: data.userName,
        userId: data.userId,
      });
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
          placeholder="Name (optional)"
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
  className="w-full mt-3 text-sm text-green-700 underline"
  onClick={() => router.push("/signup")}
>
  Don't have an account? Sign up
</button>
      </div>

      // at the bottom of the login card



    </div>
  );
}
