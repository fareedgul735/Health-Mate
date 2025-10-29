import { Card, Table } from "antd";
import {
  HeartPulse,
  Activity,
  ThermometerSun,
  Droplets,
  BarChart3,
} from "lucide-react";

const AddVitals = () => {
  const vitals = [
    {
      key: 1,
      date: "2025-10-25",
      heartRate: "76 bpm",
      bp: "118/79 mmHg",
      temperature: "98.4°F",
      oxygen: "97%",
    },
    {
      key: 2,
      date: "2025-10-26",
      heartRate: "80 bpm",
      bp: "121/82 mmHg",
      temperature: "98.9°F",
      oxygen: "98%",
    },
    {
      key: 3,
      date: "2025-10-27",
      heartRate: "79 bpm",
      bp: "119/80 mmHg",
      temperature: "98.6°F",
      oxygen: "97%",
    },
  ];

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Heart Rate", dataIndex: "heartRate", key: "heartRate" },
    { title: "Blood Pressure", dataIndex: "bp", key: "bp" },
    { title: "Temperature", dataIndex: "temperature", key: "temperature" },
    { title: "Oxygen Level", dataIndex: "oxygen", key: "oxygen" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🩺 Health Vitals Overview
          </h1>
          <div className="flex items-center gap-2 text-blue-600">
            <BarChart3 className="w-6 h-6" />
            <span className="font-semibold">Synced from Reports</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="rounded-2xl shadow-md border-none bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <HeartPulse className="w-6 h-6 text-red-500 mb-2" />
              <p className="font-semibold text-gray-700">Heart Rate</p>
              <h2 className="text-xl font-bold text-gray-900">79 bpm</h2>
            </div>
          </Card>

          <Card className="rounded-2xl shadow-md border-none bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <Activity className="w-6 h-6 text-blue-500 mb-2" />
              <p className="font-semibold text-gray-700">Blood Pressure</p>
              <h2 className="text-xl font-bold text-gray-900">120/81 mmHg</h2>
            </div>
          </Card>

          <Card className="rounded-2xl shadow-md border-none bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <ThermometerSun className="w-6 h-6 text-amber-500 mb-2" />
              <p className="font-semibold text-gray-700">Temperature</p>
              <h2 className="text-xl font-bold text-gray-900">98.6°F</h2>
            </div>
          </Card>

          <Card className="rounded-2xl shadow-md border-none bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <Droplets className="w-6 h-6 text-sky-500 mb-2" />
              <p className="font-semibold text-gray-700">Oxygen Level</p>
              <h2 className="text-xl font-bold text-gray-900">97%</h2>
            </div>
          </Card>
        </div>

        <Card
          title="Recent Synced Vitals"
          className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm"
        >
          <Table
            dataSource={vitals}
            columns={columns}
            bordered={true}
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            size="middle"
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AddVitals;
