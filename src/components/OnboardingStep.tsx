import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IndianRupee } from "lucide-react";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface OnboardingStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  stepNumber: number;
  totalSteps: number;
}

const OnboardingStep = ({
  question,
  subtitle,
  options,
  selectedValue,
  onSelect,
  stepNumber,
  totalSteps,
}: OnboardingStepProps) => {
  const [customAmount, setCustomAmount] = useState("");
  const isCustomSelected = selectedValue === "custom" || (selectedValue && !options.find(opt => opt.value === selectedValue));
  const isMonthlyInvestmentStep = question.includes("comfortable for you to invest");

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value && parseInt(value) >= 500) {
      onSelect(value);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((stepNumber / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          {question}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            className={cn(
              "w-full p-4 rounded-xl text-left transition-all duration-200",
              "border-2 hover:border-primary/50",
              selectedValue === option.value || (option.value === "custom" && isCustomSelected)
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:bg-secondary/50"
            )}
            onClick={() => {
              if (option.value === "custom") {
                onSelect("custom");
              } else {
                onSelect(option.value);
              }
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedValue === option.value || (option.value === "custom" && isCustomSelected)
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )}
              >
                {(selectedValue === option.value || (option.value === "custom" && isCustomSelected)) && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </div>
              <div className="flex-1">
                <span className="font-medium text-foreground">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
        
        {/* Custom Amount Input */}
        {isMonthlyInvestmentStep && isCustomSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 border-2 border-primary bg-primary/5 rounded-xl"
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter your monthly investment amount
            </label>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="5000"
                min="500"
                step="500"
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Minimum ₹500. Choose an amount you can invest consistently.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OnboardingStep;
