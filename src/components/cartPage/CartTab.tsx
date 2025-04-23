import React, { useState } from "react";
import data from "../../../data/cartV2.json";
import ShoppingCart from "./ShoppingCart";
import CheckOutCart from "./Dashboard"; // Verify if correct
import CompleteCart from "./CompleteCart";
import StepButton from "../../ui/StepButton";
import { useSelector } from "react-redux";
import { getCart } from "./cartSlice";

type TabData = {
  id: number;
  label: string;
  content: string;
  title: string;
};

function CartTab() {
  const tabs: TabData[] = data.cartV2;
  const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id ?? 1);
  const cart = useSelector(getCart);

  const componentMap: { [key: string]: React.ReactNode } = {
    ShoppingCart: <ShoppingCart setActiveTab={setActiveTab} tabs={tabs} />,
    CheckOutCart: <CheckOutCart />,
    CompleteCart:
      cart.length > 0 ? (
        <CompleteCart />
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Your cart is empty.
          </p>
          <button
            className="mt-4 inline-block px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setActiveTab(tabs[0].id)}
          >
            Return to Cart
          </button>
        </div>
      ),
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const activeContent = activeTabData
    ? componentMap[activeTabData.content]
    : componentMap["ShoppingCart"];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="w-full max-w-[800px] mx-auto px-4 md:px-10 flex justify-between relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex max-lg:flex-col items-center space-x-1 md:space-x-3 space-y-1 cursor-pointer ${
              activeTab === tab.id
                ? "font-semibold text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => {
              // Prevent navigating to CompleteCart if cart is empty
              if (tab.content === "CompleteCart" && cart.length === 0) {
                return;
              }
              setActiveTab(tab.id);
            }}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeTab === tab.id
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-300"
              }`}
            >
              {tab.id}
            </div>
            <span
              className={`text-xs md:text-base text-center ${
                activeTab === tab.id
                  ? "font-semibold dark:text-white"
                  : "font-light dark:text-gray-400"
              }`}
            >
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <h2 className="absolute left-1/2 -translate-x-1/2 -top-16 md:-top-20 text-center font-semibold dark:text-gray-300 text-2xl md:text-4xl">
                {tab.title}
              </h2>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-[1200px] mx-auto rounded-md p-4">
        {activeContent || <p>No content available for this tab.</p>}
      </div>

      <StepButton
        activeTab={activeTab}
        setActiveTab={(id) => {
          // Prevent navigating to CompleteCart if cart is empty
          if (
            tabs.find((tab) => tab.id === id)?.content === "CompleteCart" &&
            cart.length === 0
          ) {
            return;
          }
          setActiveTab(id);
        }}
        tabs={tabs}
      />
    </div>
  );
}

export default CartTab;
