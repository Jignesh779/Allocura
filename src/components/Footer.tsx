import { motion } from "framer-motion";
import { ExternalLink, Shield, BookOpen, AlertTriangle, Calculator, FileText } from "lucide-react";

interface FooterProps {
  onSIPCalculator: () => void;
  onPrivacyPolicy: () => void;
}

const Footer = ({ onSIPCalculator, onPrivacyPolicy }: FooterProps) => {
  return (
    <motion.footer 
      className="bg-secondary/30 border-t border-border/50 py-8 px-4 md:px-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              About Allocura
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Educational investment portfolio planner using transparent, rule-based logic. 
              Designed for Indian investors seeking sensible long-term allocation guidance.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tools
            </h3>
            <div className="space-y-2">
              <button 
                onClick={onSIPCalculator}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 w-full text-left"
              >
                SIP Calculator <Calculator className="w-3 h-3" />
              </button>
              <button 
                onClick={onPrivacyPolicy}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 w-full text-left"
              >
                Privacy Policy <FileText className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learn More
            </h3>
            <div className="space-y-2">
              <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                SEBI Guidelines <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.amfiindia.com/" target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                AMFI Resources <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                NSE Education <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Important Notice
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This tool is for educational purposes only. Not financial advice. 
              Consult SEBI-registered advisors before investing. 
              Market risks apply to all investments.
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Allocura. Made with ❤️ for Indian investors. 
            <span className="mx-2">•</span>
            Educational tool, not investment advice.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;