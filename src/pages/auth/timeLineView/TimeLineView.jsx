import { useEffect, useState } from "react";
import { Timeline, Card, Tag, Spin } from "antd";
import { FileText, Brain, HeartPulse } from "lucide-react";
import { getReportsWithAiSummary } from "../../../utils/helpers/helpers.js";

const TimeLineView = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const response = await getReportsWithAiSummary();

        if (response?.success) {
          const { tableData, chartData } = response;

          const reportAndAiEvents = (tableData || []).flatMap((item, i) => {
            const reportEvent = {
              id: `r${i}`,
              title: "Report Uploaded",
              desc: `${item.title || "New report"} was uploaded.`,
              date: item.date || "—",
              icon: <FileText className="text-blue-500 w-5 h-5" />,
              tag: "Report",
            };

            let aiEvent = null;
            if (item.aiResponse && typeof item.aiResponse === "object") {
              aiEvent = {
                id: `ai${i}`,
                title: `AI Insights for ${item.title || "Report"}`,
                desc:
                  item.aiResponse.summary ||
                  "AI generated insights for this report.",
                date: item.date || "—",
                icon: <Brain className="text-sky-500 w-5 h-5" />,
                tag: "AI",
                details: {
                  keyFindings: item.aiResponse.keyFindings || [],
                  recommendations: item.aiResponse.recommendations || [],
                  riskFactors: item.aiResponse.riskFactors || [],
                  urgencyLevel: item.aiResponse.urgencyLevel || "",
                },
              };
            }

            return aiEvent ? [reportEvent, aiEvent] : [reportEvent];
          });

          const vitalsEvents = (chartData || []).slice(-2).map((vital, i) => ({
            id: `v${i}`,
            title: "Vitals Updated",
            desc: `BP: ${vital.Systolic}/${vital.Diastolic} • Sugar: ${vital.Sugar}`,
            date: vital.date,
            icon: <HeartPulse className="text-blue-600 w-5 h-5" />,
            tag: "Vitals",
          }));

          const combined = [...reportAndAiEvents, ...vitalsEvents].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          setTimelineData(combined);
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          🩺 Health Activity Timeline
        </h1>
        <Card className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Spin size="large" />
            </div>
          ) : (
            <Timeline
              mode="left"
              items={timelineData.map((item) => ({
                dot: item.icon,
                children: (
                  <div className="p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <Tag color="blue">{item.tag}</Tag>
                    </div>
                    <p className="text-gray-600 text-sm">{item.desc}</p>

                    {item.tag === "AI" && item.details && (
                      <div className="mt-3 text-sm text-gray-700 space-y-2">
                        {item.details.keyFindings.length > 0 && (
                          <div>
                            <strong>Key Findings:</strong>
                            <ul className="list-disc ml-5">
                              {item.details.keyFindings.map((k, i) => (
                                <li key={i}>{k}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.details.recommendations.length > 0 && (
                          <div>
                            <strong>Recommendations:</strong>
                            <ul className="list-disc ml-5">
                              {item.details.recommendations.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.details.riskFactors.length > 0 && (
                          <div>
                            <strong>Risk Factors:</strong>
                            <ul className="list-disc ml-5">
                              {item.details.riskFactors.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.details.urgencyLevel && (
                          <p>
                            <strong>Urgency:</strong>{" "}
                            <Tag
                              color={
                                item.details.urgencyLevel === "high"
                                  ? "red"
                                  : item.details.urgencyLevel === "attention"
                                  ? "orange"
                                  : "green"
                              }
                            >
                              {item.details.urgencyLevel.toUpperCase()}
                            </Tag>
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                ),
              }))}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default TimeLineView;
