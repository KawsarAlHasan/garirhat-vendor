import { Card, Statistic, Table } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const DashboardTwo = () => {
  const [listings, setListings] = useState({ active: 120, pending: 30, sold: 50 });
  const [revenue, setRevenue] = useState({ daily: 5000, weekly: 35000, monthly: 150000 });
  const [leads, setLeads] = useState({ new: 25, pending: 10, converted: 15 });

  const performanceData = [
    { name: "Model A", value: 40 },
    { name: "Model B", value: 30 },
    { name: "Model C", value: 20 },
    { name: "Model D", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentActivity = [
    { key: 1, type: "Inquiry", detail: "New inquiry on Model A", date: "2025-02-17" },
    { key: 2, type: "Message", detail: "Customer sent a message", date: "2025-02-16" },
    { key: 3, type: "Sale", detail: "Model B was sold", date: "2025-02-15" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {/* Total Listings */}
      <Card title="Total Listings">
        <Statistic title="Active" value={listings.active} />
        <Statistic title="Pending" value={listings.pending} />
        <Statistic title="Sold" value={listings.sold} />
      </Card>

      {/* Revenue Overview */}
      <Card title="Revenue Overview">
        <Statistic title="Daily" prefix="$" value={revenue.daily} />
        <Statistic title="Weekly" prefix="$" value={revenue.weekly} />
        <Statistic title="Monthly" prefix="$" value={revenue.monthly} />
      </Card>

      {/* Leads & Inquiries */}
      <Card title="Leads & Inquiries">
        <Statistic title="New" value={leads.new} />
        <Statistic title="Pending" value={leads.pending} />
        <Statistic title="Converted" value={leads.converted} />
      </Card>

      {/* Performance Metrics (Pie Chart) */}
      <Card title="Performance Metrics" className="col-span-1 md:col-span-2">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={performanceData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity Feed */}
      <Card title="Recent Activity" className="col-span-1 md:col-span-3">
        <Table columns={[{ title: "Type", dataIndex: "type" }, { title: "Detail", dataIndex: "detail" }, { title: "Date", dataIndex: "date" }]} dataSource={recentActivity} pagination={false} />
      </Card>
    </div>
  );
};

export default DashboardTwo;
