import { Card, List, Typography } from "antd";

const { Text } = Typography;

const TimelineView = ({ items = [] }) => {
  const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Card title="Timeline" className="shadow-sm rounded-2xl">
      <List
        dataSource={sorted}
        renderItem={(item) => (
          <List.Item>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div>
                <Text strong>{item.title || item.type}</Text>
                {item.note && (
                  <div className="text-xs text-slate-500">{item.note}</div>
                )}
              </div>
              <Text type="secondary" className="text-sm">
                {new Date(item.date).toLocaleDateString()}{" "}
                {item.value ? `- ${item.value}` : ""}
              </Text>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TimelineView;
