import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import Link from "next/link";
import {
  Line,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { user, logout } = useUser();
  const [logs, setLogs] = useState([]);
  const [averages, setAverages] = useState({});
  const [insight, setInsight] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const body = JSON.stringify({ email: user.email, user });

      const [logsRes, avgRes, insightRes] = await Promise.all([
        fetch("/api/getEnergyLogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }),
        fetch("/api/getAverages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }),
        fetch("/api/getInsight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }),
      ]);

      const logsData = await logsRes.json();
      const avgData = await avgRes.json();
      const insightData = await insightRes.json();

      if (logsRes.status === 200) setLogs(logsData.content);
      if (avgRes.status === 200) setAverages(avgData.averages || {});
      if (insightRes.status === 200) setInsight(insightData.insight || "");
    };

    fetchData();
  }, [user]);

  if (!user) return null;

  const labels = logs
    .slice()
    .reverse()
    .map((l) => new Date(l.createdAt).toLocaleDateString());

  const energyData = logs.slice().reverse().map((l) => l.energy);
  const sleepData = logs.slice().reverse().map((l) => l.sleep_hours);
  const stressData = logs.slice().reverse().map((l) => l.stress);

  const energyLineConfig = {
    labels,
    datasets: [
      {
        label: "Energy",
        data: energyData,
      },
    ],
  };

  const sleepBarConfig = {
    labels,
    datasets: [
      {
        label: "Sleep (hours)",
        data: sleepData,
      },
    ],
  };

  const stressLineConfig = {
    labels,
    datasets: [
      {
        label: "Stress",
        data: stressData,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-900">Analytics 📊</h1>
          <div className="flex gap-3">
            <Link href="/EnergyForm">
              <button className="bg-white text-green-700 px-4 py-2 rounded-xl shadow">
                Back to Log
              </button>
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

    
        <div className="bg-white rounded-2xl shadow p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Avg Energy" value={averages.avgEnergy} />
          <StatCard label="Avg Motivation" value={averages.avgMotivation} />
          <StatCard label="Avg Stress" value={averages.avgStress} />
          <StatCard label="Avg Sleep (h)" value={averages.avgSleep} />
          <StatCard label="Avg Water (L)" value={averages.avgWater} />
          <StatCard label="Avg Caffeine (mg)" value={averages.avgCaffeine} />
          <StatCard label="Avg Exercise (min)" value={averages.avgExercise} />
        </div>

       
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">Energy Over Time</h2>
            {energyData.length ? <Line data={energyLineConfig} /> : <p>No data</p>}
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-2">Sleep Over Time</h2>
            {sleepData.length ? <Bar data={sleepBarConfig} /> : <p>No data</p>}
          </div>

          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <h2 className="font-semibold mb-2">Stress Over Time</h2>
            {stressData.length ? <Line data={stressLineConfig} /> : <p>No data</p>}
          </div>
        </div>

  
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-2">AI Insight 🤖</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {insight || "Not enough data yet. Log a few days first."}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  if (value === undefined || value === null) return null;
  return (
    <div className="border rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold">
        {typeof value === "number" ? value.toFixed(1) : "-"}
      </p>
    </div>
  );
}
