import { useEffect, useState } from "react";
import { Layout } from "antd";
import DashboardHeader from "./DashboardHeader";
import ReportList from "./ReportList";
import SummaryPanel from "./SummaryPanel";
import TimelineView from "./TimelineView";

const { Content } = Layout;

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const demoReports = [
      {
        id: "r-1",
        title: "Blood Test • Nov 2, 2025",
        date: "2025-11-02",
        type: "Lab",
        summary_en:
          "Cholesterol mildly elevated. Consider lifestyle changes and follow-up in 3 months.",
        summary_ur:
          "Cholesterol thoda zyada hai. Life-style aur follow-up 3 months mein recommended hai.",
      },
      {
        id: "r-2",
        title: "ECG • Oct 28, 2025",
        date: "2025-10-28",
        type: "Scan",
        summary_en: "ECG shows normal sinus rhythm with no acute changes.",
        summary_ur:
          "ECG normal sinus rhythm dikhata hai, koi acute changes nahi.",
      },
    ];

    const demoVitals = [
      {
        id: "v-1",
        type: "BP",
        value: "120/78",
        date: "2025-10-20",
        note: "Morning",
      },
      {
        id: "v-2",
        type: "Sugar",
        value: "95 mg/dL",
        date: "2025-10-18",
        note: "Fasting",
      },
      {
        id: "v-3",
        type: "Weight",
        value: "72 kg",
        date: "2025-10-10",
        note: "Weekly",
      },
    ];

    setReports(demoReports);
    setVitals(demoVitals);
    setSelectedReport(demoReports[0]);
  }, []);

  const combined = [...reports, ...vitals];

  const handleSearch = (q) => {
    if (!q) {
      return;
    }
    console.log("search:", q);
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <DashboardHeader onSearch={handleSearch} />

      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ReportList
              reports={reports}
              selectedId={selectedReport?.id}
              onSelect={(r) => setSelectedReport(r)}
            />
          </div>

          <div className="lg:col-span-6">
            <SummaryPanel report={selectedReport} />
          </div>

          <div className="lg:col-span-3">
            <TimelineView items={combined} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
