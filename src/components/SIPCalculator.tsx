import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SIPCalculatorProps {
  onClose: () => void;
}

const SIPCalculator = ({ onClose }: SIPCalculatorProps) => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = monthlyAmount * months;
    const returns = futureValue - totalInvested;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvested,
      returns: Math.round(returns)
    };
  };

  const result = calculateSIP();

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">SIP Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Monthly Investment</label>
            <div className="flex items-center gap-2 mt-1">
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
              <input
                type="number"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="500"
                step="500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Investment Period</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="30"
              />
              <span className="text-sm text-muted-foreground">years</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Expected Annual Return</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="25"
                step="0.5"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </div>

        <Card className="mt-6 p-4 bg-primary/5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Invested</span>
              <span className="font-medium">₹{result.totalInvested.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Returns</span>
              <span className="font-medium text-green-600">₹{result.returns.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Future Value</span>
                <span className="text-lg font-bold text-primary">₹{result.futureValue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button className="flex-1 gap-2">
            <TrendingUp className="w-4 h-4" />
            Start SIP
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          *This is an estimate. Actual returns may vary based on market conditions.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SIPCalculator;