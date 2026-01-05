export interface UserProfile {
  ageGroup: string;
  employmentType: string;
  incomeStability: string;
  monthlyInvestment: string;
  existingEMIs: string;
  emergencyFund: string;
  investmentHorizon: string;
  riskComfort: string;
  taxAwareness: string;
  goldPreference: string;
}

export interface PortfolioAllocation {
  equityETF: number;
  debtFunds: number;
  liquidFunds: number;
  goldETF: number;
  reits: number;
}

export interface AllocationExplanation {
  asset: string;
  allocation: number;
  reason: string;
  examples: string[];
  color: string;
}

export function calculatePortfolio(profile: UserProfile): PortfolioAllocation {
  let equity = 0;
  let debt = 0;
  let liquid = 0;
  let gold = 0;
  let reits = 0;

  // Base allocation by age
  switch (profile.ageGroup) {
    case '18-25':
      equity = 70;
      debt = 15;
      liquid = 10;
      gold = 5;
      break;
    case '26-35':
      equity = 60;
      debt = 20;
      liquid = 10;
      gold = 10;
      break;
    case '36-45':
      equity = 50;
      debt = 25;
      liquid = 10;
      gold = 10;
      reits = 5;
      break;
    case '46-55':
      equity = 35;
      debt = 35;
      liquid = 15;
      gold = 10;
      reits = 5;
      break;
    case '55+':
      equity = 20;
      debt = 40;
      liquid = 25;
      gold = 10;
      reits = 5;
      break;
    default:
      equity = 50;
      debt = 25;
      liquid = 15;
      gold = 10;
  }

  // Adjust for income stability
  if (profile.incomeStability === 'variable') {
    equity -= 10;
    liquid += 10;
  }

  // Adjust for EMI burden
  if (profile.existingEMIs === 'high') {
    equity -= 10;
    liquid += 5;
    debt += 5;
  } else if (profile.existingEMIs === 'moderate') {
    equity -= 5;
    liquid += 5;
  }

  // Adjust for emergency fund
  if (profile.emergencyFund === 'none') {
    equity -= 15;
    liquid += 15;
  } else if (profile.emergencyFund === 'partial') {
    equity -= 5;
    liquid += 5;
  }

  // Adjust for time horizon
  if (profile.investmentHorizon === 'short') {
    equity -= 20;
    debt += 10;
    liquid += 10;
  } else if (profile.investmentHorizon === 'medium') {
    equity -= 10;
    debt += 10;
  }

  // Adjust for risk comfort
  if (profile.riskComfort === 'low') {
    equity -= 15;
    debt += 10;
    gold += 5;
  } else if (profile.riskComfort === 'high') {
    equity += 10;
    debt -= 10;
  }

  // Adjust for gold preference
  if (profile.goldPreference === 'yes') {
    gold += 5;
    equity -= 5;
  }

  // Ensure minimums and normalize
  equity = Math.max(equity, 5);
  debt = Math.max(debt, 5);
  liquid = Math.max(liquid, 5);
  gold = Math.max(gold, 0);
  reits = Math.max(reits, 0);

  // Normalize to 100%
  const total = equity + debt + liquid + gold + reits;
  const factor = 100 / total;

  return {
    equityETF: Math.round(equity * factor),
    debtFunds: Math.round(debt * factor),
    liquidFunds: Math.round(liquid * factor),
    goldETF: Math.round(gold * factor),
    reits: Math.round(reits * factor),
  };
}

export function generateExplanations(
  profile: UserProfile,
  allocation: PortfolioAllocation
): AllocationExplanation[] {
  const explanations: AllocationExplanation[] = [];

  // Equity explanation
  let equityReason = "Equity ETFs provide long-term wealth creation through market participation. ";
  if (profile.ageGroup === '18-25' || profile.ageGroup === '26-35') {
    equityReason += "Your young age gives you time to ride out market volatility.";
  } else if (profile.riskComfort === 'high') {
    equityReason += "Your higher risk appetite supports equity exposure for growth.";
  } else {
    equityReason += "A moderate equity allocation balances growth potential with stability.";
  }

  if (allocation.equityETF > 0) {
    explanations.push({
      asset: "Equity ETFs",
      allocation: allocation.equityETF,
      reason: equityReason,
      examples: ["Nifty 50 ETF", "Nifty Next 50 ETF", "Sensex ETF", "Nifty Midcap 150 ETF"],
      color: "hsl(173, 58%, 39%)",
    });
  }

  // Debt explanation
  let debtReason = "Debt funds provide stable returns with lower volatility. ";
  if (profile.emergencyFund === 'none' || profile.emergencyFund === 'partial') {
    debtReason += "Important for building stability before aggressive growth.";
  } else if (profile.investmentHorizon === 'short' || profile.investmentHorizon === 'medium') {
    debtReason += "Your shorter horizon makes stable returns a priority.";
  } else {
    debtReason += "Acts as portfolio ballast during market corrections.";
  }

  if (allocation.debtFunds > 0) {
    explanations.push({
      asset: "Debt Funds",
      allocation: allocation.debtFunds,
      reason: debtReason,
      examples: ["Corporate Bond Funds", "Gilt Funds", "Short Duration Funds", "Banking & PSU Funds"],
      color: "hsl(210, 70%, 55%)",
    });
  }

  // Liquid explanation
  let liquidReason = "Liquid funds provide instant liquidity with minimal risk. ";
  if (profile.emergencyFund === 'none') {
    liquidReason += "Critical for building your emergency fund first.";
  } else if (profile.incomeStability === 'variable') {
    liquidReason += "Your variable income needs higher liquidity buffer.";
  } else {
    liquidReason += "Useful for rebalancing and opportunistic investments.";
  }

  if (allocation.liquidFunds > 0) {
    explanations.push({
      asset: "Liquid Funds",
      allocation: allocation.liquidFunds,
      reason: liquidReason,
      examples: ["Overnight Funds", "Liquid Funds", "Money Market Funds", "Ultra Short Duration Funds"],
      color: "hsl(200, 40%, 70%)",
    });
  }

  // Gold explanation
  let goldReason = "Gold provides portfolio diversification and inflation hedge. ";
  if (profile.goldPreference === 'yes') {
    goldReason += "Aligned with your preference for this traditional safe asset.";
  } else {
    goldReason += "A small allocation adds diversification without currency risk.";
  }

  if (allocation.goldETF > 0) {
    explanations.push({
      asset: "Gold ETFs / SGBs",
      allocation: allocation.goldETF,
      reason: goldReason,
      examples: ["Sovereign Gold Bonds (SGBs)", "Gold ETFs", "Gold Mutual Funds"],
      color: "hsl(43, 96%, 56%)",
    });
  }

  // REITs explanation
  if (allocation.reits > 0) {
    explanations.push({
      asset: "REITs",
      allocation: allocation.reits,
      reason: "REITs provide exposure to real estate through regulated instruments with regular income potential.",
      examples: ["Embassy Office Parks REIT", "Mindspace REIT", "Brookfield India REIT"],
      color: "hsl(280, 60%, 55%)",
    });
  }

  return explanations;
}

export const ageOptions = [
  { value: '18-25', label: '18-25 years' },
  { value: '26-35', label: '26-35 years' },
  { value: '36-45', label: '36-45 years' },
  { value: '46-55', label: '46-55 years' },
  { value: '55+', label: '55+ years' },
];

export const employmentOptions = [
  { value: 'salaried', label: 'Salaried', description: 'Regular monthly salary' },
  { value: 'self-employed', label: 'Self-employed', description: 'Business or freelance income' },
  { value: 'student', label: 'Student', description: 'Currently studying' },
  { value: 'retired', label: 'Retired', description: 'Pension or savings based' },
];

export const incomeStabilityOptions = [
  { value: 'stable', label: 'Stable', description: 'Consistent monthly income' },
  { value: 'variable', label: 'Variable', description: 'Income fluctuates month-to-month' },
];

export const monthlyIncomeOptions = [
  { value: 'below-25k', label: 'Below ₹25,000' },
  { value: '25k-50k', label: '₹25,000 - ₹50,000' },
  { value: '50k-1L', label: '₹50,000 - ₹1,00,000' },
  { value: '1L-2L', label: '₹1,00,000 - ₹2,00,000' },
  { value: '2L-5L', label: '₹2,00,000 - ₹5,00,000' },
  { value: 'above-5L', label: 'Above ₹5,00,000' },
];

export const emiOptions = [
  { value: 'none', label: 'No EMIs', description: 'No ongoing loan obligations' },
  { value: 'low', label: 'Low EMIs', description: 'Less than 20% of income' },
  { value: 'moderate', label: 'Moderate EMIs', description: '20-40% of income' },
  { value: 'high', label: 'High EMIs', description: 'More than 40% of income' },
];

export const emergencyFundOptions = [
  { value: 'none', label: 'Not yet built', description: 'Less than 1 month expenses' },
  { value: 'partial', label: 'Partially built', description: '1-3 months expenses covered' },
  { value: 'adequate', label: 'Adequately built', description: '3-6 months expenses covered' },
  { value: 'strong', label: 'Strongly built', description: 'More than 6 months expenses' },
];

export const horizonOptions = [
  { value: 'short', label: 'Short-term', description: 'Less than 3 years' },
  { value: 'medium', label: 'Medium-term', description: '3-7 years' },
  { value: 'long', label: 'Long-term', description: 'More than 7 years' },
];

export const riskOptions = [
  { value: 'low', label: 'Low Risk', description: 'Prefer stability, okay with lower returns' },
  { value: 'medium', label: 'Medium Risk', description: 'Balance between growth and safety' },
  { value: 'high', label: 'High Risk', description: 'Accept volatility for higher returns' },
];

export const taxOptions = [
  { value: 'yes', label: 'Yes', description: 'Aware of Section 80C, ELSS, etc.' },
  { value: 'no', label: 'No', description: 'Not familiar with tax-saving options' },
];

export const goldOptions = [
  { value: 'yes', label: 'Yes', description: 'Value gold as a safe asset' },
  { value: 'no', label: 'No', description: 'Not particularly interested in gold' },
];
