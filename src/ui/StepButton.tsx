import Button from "./Button";

type TabData = {
  id: number;
};

type StepButtonProps = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  tabs: TabData[];
};

export default function StepButton({
  activeTab,
  setActiveTab,
  tabs,
}: StepButtonProps) {
  return (
    <div className="flex justify-between p-2">
      {tabs.findIndex((tab) => tab.id === activeTab) > 0 && (
        <Button
          onClick={() => {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1].id);
            }
          }}
          size="md"
          className="~text-xs/base"
        >
          Prev
        </Button>
      )}
      {tabs.findIndex((tab) => tab.id === activeTab) < tabs.length - 1 && (
        <Button
          onClick={() => {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1].id);
            }
          }}
          size="md"
          className="~text-xs/base"
        >
          Next
        </Button>
      )}
      {tabs.findIndex((tab) => tab.id === activeTab) === tabs.length - 1 && (
        <Button
          onClick={() => {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1].id);
            }
          }}
        >
          Finish
        </Button>
      )}
    </div>
  );
}
