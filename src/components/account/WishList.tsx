import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "./wishlistSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import { addItem } from "../cartPage/cartSlice";
import { RootState } from "../../app/store";

interface TabData {
  id: number;
  label: string;
  content: string;
}

function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state: RootState) => getWishlist(state) || []);

  // Define tabs without title property
  const tabs: TabData[] = [
    { id: 1, label: "View Wishlist", content: "ViewWishlist" },
    { id: 2, label: "Manage Wishlist", content: "ManageWishlist" },
  ];

  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  // View Wishlist Component
  const ViewWishlist = () => {
    if (wishlist.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Your wishlist is empty.
          </p>
          <Button
            variant="outline"
            className="mt-4 px-6 py-3 rounded-full border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate("/shop")}
          >
            Start Shopping
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item.shopId}
            className="flex items-center ~gap-2/4 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <img
              src={
                item.image ||
                (item.images
                  ? typeof item.images === "string"
                    ? item.images
                    : item.images[0]
                  : "/images/placeholder.png")
              }
              className="w-16 h-16 rounded-md object-cover border border-gray-200 dark:border-gray-600 text-xs"
              alt={item.title}
            />
            <div className="flex-1">
              <p className="font-medium ~text-xs/xl text-gray-800 dark:text-white">
                {item.title}
              </p>
              <p className="~text-xs/lg text-gray-500 dark:text-gray-400">
                {formatCurrency(item.unitPrice)}
              </p>
            </div>
            <Button
              className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={() =>
                dispatch(
                  addItem({
                    shopId: item.shopId,
                    title: item.title,
                    unitPrice: item.unitPrice,
                    quantity: 1,
                    totalPrice: item.unitPrice,
                    image: item.image,
                    images: item.images,
                  })
                )
              }
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    );
  };

  // Manage Wishlist Component
  const ManageWishlist = () => {
    if (wishlist.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Your wishlist is empty.
          </p>
          <Button
            variant="outline"
            className="mt-4 px-6 py-3 rounded-full border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate("/shop")}
          >
            Start Shopping
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item.shopId}
            className="flex items-center ~gap-2/4 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <img
              src={
                item.image ||
                (item.images
                  ? typeof item.images === "string"
                    ? item.images
                    : item.images[0]
                  : "/images/placeholder.png")
              }
              className="w-16 h-16 rounded-md object-cover border border-gray-200 dark:border-gray-600 text-xs"
              alt={item.title}
            />
            <div className="flex-1">
              <p className="~text-xs/xl text-gray-800 dark:text-white">
                {item.title}
              </p>
              <p className="~text-xs/lg text-gray-500 dark:text-gray-400">
                {formatCurrency(item.unitPrice)}
              </p>
            </div>
            <Button
              variant="outline"
              className="px-4 py-2 text-sm rounded-full border-gray-300 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => dispatch(removeFromWishlist(item.shopId))}
            >
              Remove
            </Button>
          </div>
        ))}
        <div className="text-center">
          <Button
            className="px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear Wishlist
          </Button>
        </div>
      </div>
    );
  };

  const componentMap: { [key: string]: React.ReactNode } = {
    ViewWishlist: <ViewWishlist />,
    ManageWishlist: <ManageWishlist />,
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const activeContent = activeTabData
    ? componentMap[activeTabData.content]
    : componentMap["ViewWishlist"];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="w-full max-w-[800px] mx-auto px-4 md:px-10 flex justify-between">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex max-lg:flex-col items-center space-x-1 md:space-x-3 space-y-1 cursor-pointer ${
              activeTab === tab.id
                ? "font-semibold text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.id)}
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
          </div>
        ))}
      </div>

      <div className="w-full max-w-[1200px] mx-auto rounded-md p-4">
        {activeContent || <p>No content available for this tab.</p>}
      </div>
    </div>
  );
}

export default WishList;
