import { motion } from "framer-motion";
import { Shield, RefreshCw, PiggyBank, AlertCircle } from "lucide-react";

const reminders = [
  {
    icon: PiggyBank,
    title: "Emergency Fund First",
    description: "Build 3-6 months of expenses before aggressive investing",
    color: "hsl(43, 96%, 56%)",
  },
  {
    icon: RefreshCw,
    title: "Annual Rebalancing",
    description: "Review and rebalance your portfolio once a year",
    color: "hsl(173, 58%, 39%)",
  },
  {
    icon: Shield,
    title: "Low Expense Ratios",
    description: "Prefer funds with expense ratios below 0.5%",
    color: "hsl(210, 70%, 55%)",
  },
  {
    icon: AlertCircle,
    title: "Stay the Course",
    description: "Avoid panic selling during market downturns",
    color: "hsl(280, 60%, 55%)",
  },
];

const ReminderSection = () => {
  return (
    <motion.div
      className="glass-card rounded-2xl p-5 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="font-semibold text-foreground mb-4">Investment Reminders</h3>

      <div className="grid gap-3">
        {reminders.map((reminder, index) => (
          <motion.div
            key={reminder.title}
            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${reminder.color}20` }}
            >
              <reminder.icon
                className="w-4 h-4"
                style={{ color: reminder.color }}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                {reminder.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {reminder.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReminderSection;
