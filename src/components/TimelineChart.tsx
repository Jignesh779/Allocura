import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface TimelineChartProps {
  equityPercentage: number;
}

const TimelineChart = ({ equityPercentage }: TimelineChartProps) => {
  // Generate illustrative data based on portfolio risk (more equity = more growth + volatility)
  const baseGrowth = 1.06 + (equityPercentage / 100) * 0.04; // 6-10% base
  const volatility = 0.02 + (equityPercentage / 100) * 0.03;

  const data = Array.from({ length: 16 }, (_, i) => {
    const year = 2024 + i;
    const trend = Math.pow(baseGrowth, i) * 100;
    const noise = Math.sin(i * 1.5) * volatility * 100;
    return {
      year,
      value: Math.round(trend + noise),
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-card">
          <p className="text-sm text-muted-foreground">Year {label}</p>
          <p className="text-primary font-semibold">₹{payload[0].value}*</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-5 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-1">
          Illustrative Growth Trajectory
        </h3>
        <p className="text-sm text-muted-foreground">
          Based on historical averages (₹100 initial investment)
        </p>
      </div>

      <div className="h-[200px] md:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 15%, 90%)" />
            <XAxis
              dataKey="year"
              tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(200, 15%, 45%)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(173, 58%, 39%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        *For educational purposes only. Past performance ≠ future returns.
      </p>
    </motion.div>
  );
};

export default TimelineChart;
