import { Card, List, Typography } from "antd";

const { Text } = Typography;

const ReportList = ({ reports = [], selectedId, onSelect = () => {} }) => {
  return (
    <Card title="Reports" className="shadow-sm p-[12px] rounded-2xl">
      <List
        dataSource={reports}
        locale={{ emptyText: "No reports yet" }}
        renderItem={(r) => (
          <List.Item
            onClick={() => onSelect(r)}
            className={`cursor-pointer rounded-md p-2 hover:bg-emerald-50 ${
              selectedId === r.id ? "bg-emerald-100" : ""
            }`}
          >
            <div>
              <Text strong>{r.title}</Text>
              <div className="text-xs text-slate-500">
                {r.type} • {new Date(r.date).toDateString()}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ReportList;
