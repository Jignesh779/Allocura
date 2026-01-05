import { useState } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import PortfolioChart from "./PortfolioChart";
import AssetCard from "./AssetCard";
import TimelineChart from "./TimelineChart";
import ReminderSection from "./ReminderSection";
import {
  UserProfile,
  PortfolioAllocation,
  AllocationExplanation,
  calculatePortfolio,
  generateExplanations,
} from "@/lib/portfolioLogic";

interface DashboardProps {
  profile: UserProfile;
  onReset: () => void;
}

const Dashboard = ({ profile, onReset }: DashboardProps) => {
  const [allocation] = useState<PortfolioAllocation>(() =>
    calculatePortfolio(profile)
  );
  const [explanations] = useState<AllocationExplanation[]>(() =>
    generateExplanations(profile, allocation)
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(31, 100, 88);
    doc.text("Allocura", 20, 25);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Your Personalized Investment Portfolio", 20, 35);

    // Profile Summary
    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text("Profile Summary", 20, 55);

    doc.setFontSize(10);
    doc.setTextColor(80);
    const profileLines = [
      `Age Group: ${profile.ageGroup}`,
      `Employment: ${profile.employmentType}`,
      `Income Stability: ${profile.incomeStability}`,
      `Risk Comfort: ${profile.riskComfort}`,
      `Investment Horizon: ${profile.investmentHorizon}`,
    ];
    profileLines.forEach((line, i) => {
      doc.text(line, 20, 65 + i * 7);
    });

    // Allocation
    doc.setFontSize(14);
    doc.setTextColor(30);
    doc.text("Recommended Allocation", 20, 110);

    doc.setFontSize(10);
    doc.setTextColor(80);
    explanations.forEach((exp, i) => {
      doc.setTextColor(30);
      doc.text(`${exp.asset}: ${exp.allocation}%`, 20, 120 + i * 20);
      doc.setTextColor(80);
      const reasonLines = doc.splitTextToSize(exp.reason, 170);
      doc.text(reasonLines, 20, 127 + i * 20);
    });

    // Disclaimer
    const disclaimerY = 130 + explanations.length * 20;
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      "Disclaimer: This is for educational purposes only. Consult a SEBI-registered advisor before investing.",
      20,
      disclaimerY
    );

    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, disclaimerY + 8);

    doc.save("Allocura-Portfolio.pdf");
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="py-4 px-4 md:px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Allocura</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Start Over</span>
            </Button>
            <Button size="sm" onClick={downloadPDF} className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        {/* Hero */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Personalized Portfolio
          </h1>
          <p className="text-muted-foreground">
            Based on your profile, here's a balanced allocation strategy
          </p>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          className="glass-card rounded-2xl p-6 border border-border/50 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            Asset Allocation
          </h2>
          <PortfolioChart allocation={allocation} />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Asset Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Allocation Breakdown
            </h2>
            {explanations.map((exp, index) => (
              <AssetCard key={exp.asset} explanation={exp} index={index} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TimelineChart equityPercentage={allocation.equityETF} />
            <ReminderSection />
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                Educational Disclaimer
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This tool is for educational purposes only and does not constitute financial advice. 
                The suggested allocation is based on general principles and may not suit your specific circumstances. 
                Please consult a SEBI-registered investment advisor before making any investment decisions. 
                Past performance does not guarantee future returns. Investments are subject to market risks.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
