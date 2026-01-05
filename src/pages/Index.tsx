import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import OnboardingWizard from "@/components/OnboardingWizard";
import Dashboard from "@/components/Dashboard";
import { UserProfile } from "@/lib/portfolioLogic";

type AppState = "splash" | "onboarding" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("splash");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleSplashComplete = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState("dashboard");
  };

  const handleReset = () => {
    setUserProfile(null);
    setAppState("onboarding");
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {appState === "splash" && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {appState === "onboarding" && (
          <OnboardingWizard key="onboarding" onComplete={handleOnboardingComplete} />
        )}

        {appState === "dashboard" && userProfile && (
          <Dashboard key="dashboard" profile={userProfile} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
