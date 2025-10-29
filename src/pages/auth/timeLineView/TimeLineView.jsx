import { Timeline, Card, Tag } from "antd";
import { FileText, Brain, User, HeartPulse } from "lucide-react";

const TimeLineView = () => {
  const data = [
    {
      id: 1,
      title: "Report Uploaded",
      desc: "Blood Test Report added to HealthMate records.",
      date: "2025-10-25",
      icon: <FileText className="text-blue-500 w-5 h-5" />,
      tag: "Report",
    },
    {
      id: 2,
      title: "AI Insights Generated",
      desc: "AI analyzed your latest vitals and provided recommendations.",
      date: "2025-10-26",
      icon: <Brain className="text-sky-500 w-5 h-5" />,
      tag: "AI",
    },
    {
      id: 3,
      title: "Doctor Viewed Your Report",
      desc: "Dr. Sarah reviewed your uploaded report.",
      date: "2025-10-27",
      icon: <User className="text-indigo-500 w-5 h-5" />,
      tag: "Doctor",
    },
    {
      id: 4,
      title: "Vitals Update",
      desc: "Heart rate and blood pressure synced from connected device.",
      date: "2025-10-28",
      icon: <HeartPulse className="text-blue-600 w-5 h-5" />,
      tag: "Vitals",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          🩺 Health Activity Timeline
        </h1>

        <Card className="rounded-2xl shadow-lg border-none bg-white/80 backdrop-blur-sm">
          <Timeline
            mode="left"
            items={data.map((item) => ({
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
                  <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                </div>
              ),
            }))}
          />
        </Card>
      </div>
    </div>
  );
};

export default TimeLineView;
