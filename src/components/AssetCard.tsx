import { motion } from "framer-motion";
import { AllocationExplanation } from "@/lib/portfolioLogic";
import { TrendingUp, Shield, Droplets, Coins, Building2 } from "lucide-react";

interface AssetCardProps {
  explanation: AllocationExplanation;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  "Equity ETFs": TrendingUp,
  "Debt Funds": Shield,
  "Liquid Funds": Droplets,
  "Gold ETFs / SGBs": Coins,
  "REITs": Building2,
};

const AssetCard = ({ explanation, index }: AssetCardProps) => {
  const Icon = iconMap[explanation.asset] || TrendingUp;

  return (
    <motion.div
      className="glass-card rounded-2xl p-5 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${explanation.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: explanation.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{explanation.asset}</h3>
            <span
              className="text-lg font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${explanation.color}15`,
                color: explanation.color,
              }}
            >
              {explanation.allocation}%
            </span>
          </div>

          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
            {explanation.reason}
          </p>

          <div className="flex flex-wrap gap-2">
            {explanation.examples.slice(0, 3).map((example) => (
              <span
                key={example}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssetCard;
