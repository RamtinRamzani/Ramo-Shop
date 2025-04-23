import { useState } from "react";

type TabData = {
  id: number;
};

export function useStepNavigation(tabs: TabData[]) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 0);

  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const goToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const isAtFirstTab = tabs.findIndex((tab) => tab.id === activeTab) === 0;
  const isAtLastTab =
    tabs.findIndex((tab) => tab.id === activeTab) === tabs.length - 1;

  return {
    activeTab,
    setActiveTab,
    goToPreviousTab,
    goToNextTab,
    isAtFirstTab,
    isAtLastTab,
  };
}
