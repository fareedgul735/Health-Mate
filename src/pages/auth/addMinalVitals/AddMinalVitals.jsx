import { useState } from "react";
import { Form, Input, Button, DatePicker, message, Card } from "antd";
import axios from "axios";

const AddVitals = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(token);

      const data = {
        date: values.date.format("YYYY-MM-DD"),
        bp: values.bp,
        sugar: values.sugar,
        weight: values.weight,
        notes: values.notes || "",
      };

      const res = await axios.post("/api/vitals", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.ok) {
        message.success("✅ Vitals added successfully!");
      } else {
        message.warning("⚠️ Failed to add vitals. Try again!");
      }
    } catch (err) {
      console.error(err);
      message.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Add Manual Vitals
        </h1>

        <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Blood Pressure (BP)" name="bp">
            <Input placeholder="e.g. 120/80 mmHg" />
          </Form.Item>

          <Form.Item label="Blood Sugar (mg/dL)" name="sugar">
            <Input placeholder="e.g. 95" />
          </Form.Item>

          <Form.Item label="Weight (kg)" name="weight">
            <Input placeholder="e.g. 70" />
          </Form.Item>

          <Form.Item label="Notes (Optional)" name="notes">
            <Input.TextArea
              rows={2}
              placeholder="e.g. Fasting sugar reading, after breakfast, etc."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              {loading ? "Saving..." : "Add Vitals"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddVitals;
