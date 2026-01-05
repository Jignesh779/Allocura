import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Database, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  useEffect(() => {
    document.title = "Privacy Policy - Allocura";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="py-4 px-4 md:px-8 border-b">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Allocura</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-gray max-w-none"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold m-0">Your Privacy Matters</h2>
            </div>
            <p className="text-sm text-muted-foreground m-0">
              Allocura is committed to protecting your privacy. This policy explains how we handle your information.
            </p>
          </div>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Information We Collect</h2>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-medium mb-2">Personal Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Age group and employment type</li>
                <li>• Income stability and monthly income range</li>
                <li>• Investment preferences and risk tolerance</li>
                <li>• Emergency fund status and existing EMIs</li>
              </ul>
              
              <h3 className="font-medium mb-2 mt-4">Technical Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Browser type and device information</li>
                <li>• Usage patterns and interaction data</li>
                <li>• IP address and general location</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">How We Use Your Information</h2>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Portfolio Generation:</strong> To create personalized investment recommendations</li>
                <li>• <strong>User Experience:</strong> To improve our service and user interface</li>
                <li>• <strong>Analytics:</strong> To understand usage patterns and optimize performance</li>
                <li>• <strong>Communication:</strong> To provide updates and educational content (if opted in)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Data Storage & Security</h2>
            <div className="bg-card border rounded-lg p-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• All data is stored locally in your browser by default</li>
                <li>• No personal financial information is transmitted to external servers</li>
                <li>• We use industry-standard security measures to protect any data we collect</li>
                <li>• Data is encrypted in transit and at rest</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Your Rights</h2>
            <div className="bg-card border rounded-lg p-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Access:</strong> Request access to your personal data</li>
                <li>• <strong>Correction:</strong> Request correction of inaccurate data</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                <li>• <strong>Portability:</strong> Request transfer of your data</li>
                <li>• <strong>Opt-out:</strong> Withdraw consent for data processing</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Third-Party Services</h2>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                We may use third-party services for analytics and performance monitoring:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vercel (hosting and performance)</li>
                <li>• Analytics services (usage tracking)</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                These services have their own privacy policies and data handling practices.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Important Disclaimers</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Educational Purpose:</strong> Allocura is for educational purposes only</li>
                <li>• <strong>Not Financial Advice:</strong> We do not provide personalized financial advice</li>
                <li>• <strong>SEBI Compliance:</strong> Consult SEBI-registered advisors before investing</li>
                <li>• <strong>Market Risks:</strong> All investments are subject to market risks</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                If you have questions about this Privacy Policy or your data:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email: privacy@allocura.app</li>
                <li>• Website: https://allocura.vercel.app</li>
              </ul>
            </div>
          </section>

          <div className="text-center py-6 border-t">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This policy may be updated periodically. Please review it regularly.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;