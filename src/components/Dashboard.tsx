import { useState } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import PortfolioChart from "./PortfolioChart";
import AssetCard from "./AssetCard";
import TimelineChart from "./TimelineChart";
import ReminderSection from "./ReminderSection";
import Footer from "./Footer";
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
    let yPosition = 20;

    // Header with logo area
    doc.setFillColor(31, 100, 88);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Allocura", 20, 20);
    doc.setFontSize(12);
    doc.text("Your Personalized Investment Portfolio", 20, 26);
    
    yPosition = 45;
    doc.setTextColor(0, 0, 0);

    // Profile Summary Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text("Profile Summary", 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const profileData = [
      `Age Group: ${profile.ageGroup}`,
      `Employment: ${profile.employmentType}`,
      `Income Stability: ${profile.incomeStability}`,
      `Monthly Income: ${profile.monthlyIncome}`,
      `Existing EMIs: ${profile.existingEMIs}`,
      `Emergency Fund: ${profile.emergencyFund}`,
      `Investment Horizon: ${profile.investmentHorizon}`,
      `Risk Comfort: ${profile.riskComfort}`,
      `Tax Awareness: ${profile.taxAwareness}`,
      `Gold Preference: ${profile.goldPreference}`
    ];
    
    profileData.forEach((line) => {
      doc.text(line, 25, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;

    // Asset Allocation Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text("Recommended Asset Allocation", 20, yPosition);
    yPosition += 15;

    // Create a simple pie chart representation
    const centerX = 105;
    const centerY = yPosition + 30;
    const radius = 25;
    let currentAngle = 0;
    
    const colors = [
      [31, 100, 88],   // Equity - Green
      [33, 112, 184],  // Debt - Blue  
      [128, 128, 128], // Liquid - Gray
      [255, 193, 7],   // Gold - Yellow
      [156, 39, 176]   // REITs - Purple
    ];
    
    explanations.forEach((exp, index) => {
      const angle = (exp.allocation / 100) * 360;
      const color = colors[index] || [100, 100, 100];
      
      doc.setFillColor(color[0], color[1], color[2]);
      // Simple rectangle representation instead of pie slice
      doc.rect(20, yPosition + (index * 8), (exp.allocation / 100) * 80, 6, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`${exp.asset}: ${exp.allocation}%`, 110, yPosition + (index * 8) + 4);
    });
    
    yPosition += (explanations.length * 8) + 20;

    // Detailed Allocation Breakdown
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("Allocation Breakdown & Rationale", 20, yPosition);
    yPosition += 10;
    
    explanations.forEach((exp) => {
      // Asset name and percentage
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${exp.asset}: ${exp.allocation}%`, 20, yPosition);
      yPosition += 8;
      
      // Reasoning
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const reasonLines = doc.splitTextToSize(exp.reason, 170);
      reasonLines.forEach((line) => {
        doc.text(line, 25, yPosition);
        yPosition += 5;
      });
      
      yPosition += 5;
      
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    // Investment Guidelines
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("Investment Guidelines", 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    const guidelines = [
      "• Start with building an emergency fund before aggressive investing",
      "• Invest regularly through SIP to benefit from rupee cost averaging",
      "• Review and rebalance your portfolio annually",
      "• Don't panic during market volatility - stay invested for long term",
      "• Consider tax-saving instruments like ELSS for Section 80C benefits",
      "• Diversify across asset classes to reduce overall portfolio risk"
    ];
    
    guidelines.forEach((guideline) => {
      doc.text(guideline, 20, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;

    // Important Disclaimers
    doc.setFillColor(255, 248, 220);
    doc.rect(15, yPosition - 5, 180, 35, 'F');
    doc.setDrawColor(255, 193, 7);
    doc.rect(15, yPosition - 5, 180, 35, 'S');
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(184, 134, 11);
    doc.text("⚠️ Important Disclaimers", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const disclaimers = [
      "• This is for educational purposes only and does not constitute financial advice",
      "• Past performance does not guarantee future returns",
      "• All investments are subject to market risks",
      "• Please consult a SEBI-registered investment advisor before investing",
      "• The allocation is based on general principles and may not suit your specific needs"
    ];
    
    disclaimers.forEach((disclaimer) => {
      doc.text(disclaimer, 20, yPosition);
      yPosition += 4;
    });
    
    // Footer
    yPosition = 280;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, yPosition);
    doc.text("Allocura - Simple, Sensible Investing for India | https://allocura.vercel.app", 20, yPosition + 5);
    doc.text("For educational purposes only. Consult SEBI-registered advisors before investing.", 20, yPosition + 10);

    doc.save("Allocura-Complete-Portfolio-Report.pdf");
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
      
      <Footer />
    </div>
  );
};

export default Dashboard;
