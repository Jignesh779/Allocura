import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OnboardingStep from "./OnboardingStep";
import {
  UserProfile,
  ageOptions,
  employmentOptions,
  incomeStabilityOptions,
  monthlyIncomeOptions,
  emiOptions,
  emergencyFundOptions,
  horizonOptions,
  riskOptions,
  taxOptions,
  goldOptions,
} from "@/lib/portfolioLogic";

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
}

const steps = [
  {
    key: "ageGroup",
    question: "What's your age group?",
    subtitle: "This helps us understand your investment timeline",
    options: ageOptions,
  },
  {
    key: "employmentType",
    question: "What's your employment type?",
    subtitle: "Understanding your income source",
    options: employmentOptions,
  },
  {
    key: "incomeStability",
    question: "How stable is your income?",
    subtitle: "This affects how much liquidity you need",
    options: incomeStabilityOptions,
  },
  {
    key: "monthlyInvestment",
    question: "What amount is comfortable for you to invest each month?",
    subtitle: "Choose what feels affordable - you can always adjust this later",
    options: [
      { value: "1000", label: "₹1,000", description: "Good starting point" },
      { value: "2500", label: "₹2,500", description: "Popular choice" },
      { value: "5000", label: "₹5,000", description: "Solid commitment" },
      { value: "10000", label: "₹10,000", description: "Serious investor" },
      { value: "15000", label: "₹15,000", description: "High commitment" },
      { value: "custom", label: "Custom Amount", description: "Enter your own amount" }
    ],
  },
  {
    key: "existingEMIs",
    question: "Do you have existing EMIs?",
    subtitle: "Loan obligations impact investable surplus",
    options: emiOptions,
  },
  {
    key: "emergencyFund",
    question: "How's your emergency fund?",
    subtitle: "Financial safety net before investing",
    options: emergencyFundOptions,
  },
  {
    key: "investmentHorizon",
    question: "What's your investment horizon?",
    subtitle: "How long can you stay invested?",
    options: horizonOptions,
  },
  {
    key: "riskComfort",
    question: "What's your risk comfort level?",
    subtitle: "How do you feel about market ups and downs?",
    options: riskOptions,
  },
  {
    key: "taxAwareness",
    question: "Are you aware of tax-saving investments?",
    subtitle: "ELSS, 80C benefits, etc.",
    options: taxOptions,
  },
  {
    key: "goldPreference",
    question: "Do you prefer gold in your portfolio?",
    subtitle: "Traditional safe-haven asset",
    options: goldOptions,
  },
];

const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  const currentStepData = steps[currentStep];
  const currentValue = profile[currentStepData.key as keyof UserProfile] || "";

  const handleSelect = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      [currentStepData.key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = !!currentValue;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-foreground">Allocura</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <OnboardingStep
            key={currentStep}
            question={currentStepData.question}
            subtitle={currentStepData.subtitle}
            options={currentStepData.options}
            selectedValue={currentValue}
            onSelect={handleSelect}
            stepNumber={currentStep + 1}
            totalSteps={steps.length}
          />
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="py-6 px-4 md:px-8">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={canProceed ? "enabled" : "disabled"}
          >
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="gap-2 min-w-[140px]"
              size="lg"
            >
              {currentStep === steps.length - 1 ? "See My Portfolio" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingWizard;
