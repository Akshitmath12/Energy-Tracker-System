import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import Link from "next/link";

export default function History() {
  const { user, logout } = useUser();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchLogs = async () => {
      const res = await fetch("/api/getEnergyLogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, user }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setLogs(data.content);
      }
    };
    fetchLogs();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-900">History 📅</h1>
          <div className="flex gap-3">
            <Link href="/EnergyForm">
              <button className="bg-white text-green-700 px-4 py-2 rounded-xl shadow" style={{cursor: "pointer"}}>
                Back to Log
              </button>
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
              style={{cursor: "pointer"}}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          {logs.length === 0 && (
            <p className="text-gray-500">No entries yet. Go log your first day!</p>
          )}
          <ul className="space-y-4">
            {logs.map((log) => (
              <li
                key={log.id}
                className="border rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <p className="font-semibold">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Energy: {log.energy} | Motivation: {log.motivation} | Stress:{" "}
                    {log.stress}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Sleep: {log.sleep_hours}h | Water: {log.water_liters}L | Caffeine:{" "}
                    {log.caffeine_mg}mg | Exercise: {log.exercise_mins}min
                  </p>
                  {log.notes && (
                    <p className="mt-2 text-gray-700 text-sm">Notes: {log.notes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
