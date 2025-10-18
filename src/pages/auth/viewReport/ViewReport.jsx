import { useState, useEffect } from "react";
import { Card, Spin, message } from "antd";
import axios from "axios";

const ViewReport = ({ reportId }) => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.ok) {
          setReport(res.data.report);
        } else {
          message.warning("⚠️ Report not found!");
        }
      } catch (err) {
        console.error(err);
        message.error("❌ Failed to load report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin tip="Loading report..." />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Report not found!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Report Preview Section */}
      <Card className="flex-1 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          {report.type || "Medical Report"}
        </h2>
        <p className="text-gray-500 mb-4">
          Date: {new Date(report.date).toLocaleDateString()}
        </p>

        {report.fileUrl?.endsWith(".pdf") ? (
          <iframe
            src={report.fileUrl}
            title="Report PDF"
            className="w-full h-[600px] rounded-lg border"
          />
        ) : (
          <img
            src={report.fileUrl}
            alt="Report"
            className="w-full h-[600px] object-contain rounded-lg border"
          />
        )}
      </Card>

      {/* AI Summary Section */}
      <Card
        title="AI Summary"
        className="flex-1 rounded-2xl shadow-md bg-white"
      >
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {report.aiSummary?.english ||
            "AI summary not available for this report."}
        </p>

        {report.aiSummary?.romanUrdu && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-semibold mb-2">Roman Urdu Explanation:</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {report.aiSummary.romanUrdu}
            </p>
          </div>
        )}

        {report.aiSummary?.doctorQuestions && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-semibold mb-2">Suggested Doctor Questions:</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {report.aiSummary.doctorQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        {report.aiSummary?.foodTips && (
          <div className="border-t pt-3 mt-3">
            <h3 className="font-semibold mb-2">Food Advice:</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {report.aiSummary.foodTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500 italic">
          ⚠️ This AI explanation is for understanding only. Always consult your
          doctor.
        </p>
      </Card>
    </div>
  );
};

export default ViewReport;
