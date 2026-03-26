import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BAR_COLORS = [
  "rgba(37, 99, 235, 0.88)",
  "rgba(59, 130, 246, 0.88)",
  "rgba(96, 165, 250, 0.88)",
  "rgba(147, 197, 253, 0.92)",
  "rgba(30, 64, 175, 0.85)",
  "rgba(29, 78, 216, 0.85)",
];

export function FeeBreakdownChart({ feeItems, formatAmount }) {
  const items = (feeItems ?? []).filter((x) => x.category !== "合计");
  const data = {
    labels: items.map((i) => i.category),
    datasets: [
      {
        label: "金额（元）",
        data: items.map((i) => i.amount),
        backgroundColor: items.map((_, idx) => BAR_COLORS[idx % BAR_COLORS.length]),
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (ctx) => {
            const i = ctx[0]?.dataIndex;
            return typeof i === "number" ? items[i]?.category ?? "" : "";
          },
          label: (ctx) => {
            const v = ctx.parsed?.y;
            return typeof v === "number" ? `金额：${formatAmount(v)}` : String(v ?? "");
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 40,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          callback(value, index) {
            const label = items[index]?.category ?? "";
            return label.length > 8 ? `${label.slice(0, 8)}…` : label;
          },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback(v) {
            return typeof v === "number" ? v.toLocaleString("zh-CN") : v;
          },
        },
      },
    },
  };

  if (items.length === 0) return null;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-extrabold">费用构成（Chart.js）</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full min-h-[16rem]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
