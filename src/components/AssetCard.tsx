import { motion } from "framer-motion";
import { ExternalLink, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AllocationExplanation } from "@/lib/portfolioLogic";

interface AssetCardProps {
  explanation: AllocationExplanation;
  index: number;
  monthlyAmount: number;
}

const getInvestmentGuide = (asset: string) => {
  const guides = {
    "Equity ETFs": {
      platforms: ["Zerodha Coin", "Groww", "ET Money", "Paytm Money"],
      steps: [
        "Open account on any platform above",
        "Complete KYC verification online",
        "Search for 'Nifty 50 ETF' or 'NIFTYBEES'",
        "Set up monthly SIP for your allocated amount",
        "Review once a year, avoid frequent changes"
      ],
      action: "Set up equity SIP today",
      link: "https://groww.in/mutual-funds"
    },
    "Debt Funds": {
      platforms: ["Groww", "ET Money", "Paytm Money", "Zerodha Coin"],
      steps: [
        "Use same platform as equity for simplicity",
        "Look for 'Short Duration' or 'Corporate Bond' funds",
        "Choose direct plans (lower fees)",
        "Start SIP for your debt allocation",
        "Perfect for stability in your portfolio"
      ],
      action: "Browse debt funds",
      link: "https://groww.in/mutual-funds/category/debt-funds"
    },
    "Liquid Funds": {
      platforms: ["Any mutual fund platform", "Bank apps"],
      steps: [
        "Choose 'Liquid' or 'Overnight' funds",
        "These are like better savings accounts",
        "Keep for emergencies and rebalancing",
        "Can withdraw anytime (T+1 day)",
        "Start with lump sum, then add monthly"
      ],
      action: "Start liquid fund",
      link: "https://groww.in/mutual-funds/category/liquid-funds"
    },
    "Gold ETFs / SGBs": {
      platforms: ["Zerodha", "Groww", "Banks (for SGBs)"],
      steps: [
        "For ETFs: Use your existing demat account",
        "For SGBs: Apply through bank during issue window",
        "SGBs are better (tax benefits + interest)",
        "Gold is for diversification, not quick profits",
        "Small monthly SIP in Gold ETF works well"
      ],
      action: "Explore gold options",
      link: "https://groww.in/gold"
    },
    "REITs": {
      platforms: ["Zerodha", "Groww", "Angel One"],
      steps: [
        "Need demat account for REIT investing",
        "Look for Embassy REIT, Mindspace REIT",
        "Higher minimum investment (₹10,000+)",
        "Good for real estate exposure",
        "Consider only after other allocations"
      ],
      action: "Learn about REITs",
      link: "https://groww.in/reits"
    }
  };
  
  return guides[asset as keyof typeof guides] || guides["Equity ETFs"];
};

const AssetCard = ({ explanation, index, monthlyAmount }: AssetCardProps) => {
  const guide = getInvestmentGuide(explanation.asset);
  const allocatedAmount = Math.round((explanation.allocation / 100) * monthlyAmount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: explanation.color }}
              />
              <h3 className="text-lg font-semibold text-foreground">
                {explanation.asset}
              </h3>
              <span className="text-2xl font-bold text-primary">
                {explanation.allocation}%
              </span>
            </div>
            <div className="bg-primary/5 px-3 py-1 rounded-full inline-block mb-3">
              <span className="text-sm font-medium text-primary">
                ₹{allocatedAmount.toLocaleString('en-IN')}/month
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {explanation.reason}
        </p>

        {/* How to Invest Section */}
        <div className="bg-card border rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            How to Invest
          </h4>
          
          <div className="space-y-2 mb-3">
            {guide.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Recommended platforms:</p>
              <p className="text-sm font-medium">{guide.platforms.join(", ")}</p>
            </div>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => window.open(guide.link, '_blank')}
            >
              {guide.action}
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Examples */}
        {explanation.examples && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Popular options:</p>
            <div className="flex flex-wrap gap-2">
              {explanation.examples.map((example, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default AssetCard;