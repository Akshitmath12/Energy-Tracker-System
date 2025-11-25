import { useState } from "react";
import Link from "next/link";
import { useUser } from "./context/userContext";
import { useRouter } from "next/router";

export default function EnergyForm() {
  const [formData, setFormData] = useState({
    energy: 5,
    motivation: 5,
    stress: 5,
    sleep_hours: 7,
    water_liters: 2,
    caffeine_mg: 0,
    exercise_mins: 0,
    notes: "",
  });

  const { logout, user } = useUser();
  const router = useRouter();

  const saveEnergyLog = async () => {
    try {
      const { email } = user;
      const res = await fetch("/api/addEnergyLog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user, ...formData }),
      });

      if (res.status === 201) {
        alert("Energy log saved!");
        router.push("/Analytics");
      } else {
        const data = await res.json();
        alert(data.message || "Error saving log");
      }
    } catch (e) {
      console.log("Error in saving energy log!", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 p-6 bg-opacity-50">
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-green-900">EnergyTracker ⚡</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Link href="/History">
            <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded-xl hover:bg-green-100 shadow">
              History
            </button>
          </Link>

          <Link href="/Analytics">
            <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded-xl hover:bg-green-100 shadow">
              Analytics
            </button>
          </Link>
        </div>

        <div className="bg-white bg-opacity-70 rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Hi {user?.name || "there"}! Log your daily energy metrics:
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Energy (1–10)</label>
              <input
                type="number"
                name="energy"
                min="1"
                max="10"
                className="w-full p-2 border rounded"
                value={formData.energy}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Motivation (1–10)</label>
              <input
                type="number"
                name="motivation"
                min="1"
                max="10"
                className="w-full p-2 border rounded"
                value={formData.motivation}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Stress (1–10)</label>
              <input
                type="number"
                name="stress"
                min="1"
                max="10"
                className="w-full p-2 border rounded"
                value={formData.stress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Sleep (hours)</label>
              <input
                type="number"
                step="0.1"
                name="sleep_hours"
                className="w-full p-2 border rounded"
                value={formData.sleep_hours}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Water (liters)</label>
              <input
                type="number"
                step="0.1"
                name="water_liters"
                className="w-full p-2 border rounded"
                value={formData.water_liters}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Caffeine (mg)</label>
              <input
                type="number"
                name="caffeine_mg"
                className="w-full p-2 border rounded"
                value={formData.caffeine_mg}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Exercise (minutes)</label>
              <input
                type="number"
                name="exercise_mins"
                className="w-full p-2 border rounded"
                value={formData.exercise_mins}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="mt-4 block">Notes</label>
          <textarea
            name="notes"
            className="w-full p-4 border border-gray-300 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={handleChange}
            value={formData.notes}
          ></textarea>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            onClick={saveEnergyLog}
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}
