import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import ShoppingRow from "./ShoppingRow";
import CartSummary from "./CartSummary";
import { getCart } from "./cartSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TabData {
  id: number;
  label: string;
  content: string;
  title: string;
}

interface ShoppingCartProps {
  setActiveTab?: (id: number) => void;
  tabs?: TabData[];
}

export default function ShoppingCart({
  setActiveTab,
  tabs,
}: ShoppingCartProps) {
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const [couponCode, setCouponCode] = useState("");

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Coupon code submitted:", couponCode);
    setCouponCode("");
  };

  const handleProceed = () => {
    if (setActiveTab && tabs) {
      const currentTab = tabs.find((tab) => tab.content === "ShoppingCart");
      const nextTab = tabs.find((tab) => tab.id === (currentTab?.id || 0) + 1);
      if (nextTab) {
        setActiveTab(nextTab.id);
      }
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          Your cart is empty.
        </p>
        <Button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-6 py-3 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="flex max-xl:flex-col items-start gap-8 max-w-[1200px] mx-auto">
      <div className="xl:w-2/3 w-full">
        <Button
          onClick={() => navigate("/shop")}
          className="bg-gray-300 text-grey-700 text-sm mb-6 px-4 py-2 hover:bg-gray-200 dark:bg-gray-700 dark:text-grey-400 dark:hover:bg-gray-600"
        >
          ← Back to Shop
        </Button>

        <Table columns="2fr 1fr 0.8fr 0.8fr">
          <Table.Header>
            <p>Product</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Price</p>
            <p className="text-center">Total</p>
          </Table.Header>
          <Table.Body
            data={cart}
            render={(item) => <ShoppingRow key={item.shopId} shop={item} />}
          />
        </Table>

        <div className="flex flex-col gap-3 md:w-1/2 border-2 rounded-md p-4 mt-10">
          <p className="font-semibold text-sm md:text-lg">Have a coupon?</p>
          <span className="text-gray-400 text-xs md:text-base">
            Add your code for an instant cart discount
          </span>
          <form onSubmit={handleCouponSubmit} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Apply
            </Button>
          </form>
        </div>
      </div>

      <div className="xl:w-1/3 w-full max-w-[500px] border-2 ~p-1/6 border-gray-200 rounded-lg dark:border-gray-700">
        <CartSummary shops={cart} onProceed={handleProceed} />
      </div>
    </div>
  );
}
