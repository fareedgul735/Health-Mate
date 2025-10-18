import { useEffect, useState } from "react";
import { Card, Table, Button, message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.ok) {
          setReports(res.data.reports || []);
          setVitals(res.data.vitals || []);
        } else {
          message.warning("⚠️ Failed to load dashboard data!");
        }
      } catch (err) {
        console.error(err);
        message.error("❌ Error loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin tip="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">My Health Dashboard</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Recent Reports"
          className="rounded-2xl shadow-md bg-white"
          extra={
            <Button type="primary" onClick={() => navigate("/uploadReports")}>
              + Upload New
            </Button>
          }
        >
          <Table
            dataSource={reports}
            pagination={false}
            rowKey="_id"
            columns={[
              { title: "Type", dataIndex: "type", key: "type" },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                render: (d) => new Date(d).toLocaleDateString(),
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="link"
                    onClick={() => navigate(`/report/${record._id}`)}
                  >
                    View
                  </Button>
                ),
              },
            ]}
          />
          {reports.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              No reports uploaded yet.
            </p>
          )}
        </Card>

        <Card
          title="Recent Vitals"
          className="rounded-2xl shadow-md bg-white"
          extra={
            <Button onClick={() => navigate("/add-vitals")}>
              + Add Vitals
            </Button>
          }
        >
          <Table
            dataSource={vitals}
            pagination={false}
            rowKey="_id"
            columns={[
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                render: (d) => new Date(d).toLocaleDateString(),
              },
              { title: "BP", dataIndex: "bp", key: "bp" },
              { title: "Sugar", dataIndex: "sugar", key: "sugar" },
              { title: "Weight", dataIndex: "weight", key: "weight" },
            ]}
          />
          {vitals.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              No vitals added yet.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
