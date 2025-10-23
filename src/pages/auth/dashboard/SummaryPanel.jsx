import { Card, Divider, Typography, Space } from "antd";
import { CustomButton } from "../../../components/button/Button.jsx";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SummaryPanel = ({ report }) => {
  return (
    <Card
      title={report ? report.title : "AI Summary"}
      className="shadow-sm rounded-2xl"
    >
      {report ? (
        <div>
          <Text strong>AI Summary (English)</Text>
          <p className="text-sm text-slate-700 mt-1">{report.summary_en}</p>

          <Divider />

          <Text strong>خلاصہ (Roman Urdu)</Text>
          <p className="text-sm text-slate-700 mt-1">{report.summary_ur}</p>

          <Divider />

          <Space size={12} className="mt-2">
            <CustomButton value="Download" icon={<DownloadOutlined />} />
            <CustomButton
              value="View Full"
              icon={<EyeOutlined />}
              className="!text-slate-700 !border"
            />
          </Space>

          <div className="mt-4 text-xs text-slate-500">
            Disclaimer: AI is for understanding only, not for medical advice.{" "}
            <br />
            Roman Urdu: Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.
          </div>
        </div>
      ) : (
        <Text type="secondary">
          Select a report to view the AI-generated bilingual summary and quick
          findings.
        </Text>
      )}
    </Card>
  );
};

export default SummaryPanel;
