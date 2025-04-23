import React from "react";
import { cn } from "@heroui/react";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { setShippingOption } from "./cartSlice";

interface ShippingOption {
  id: number;
  name: string;
  cost: number;
  estimatedDelivery: string;
}

interface CartItem {
  shopId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  title: string;
  image?: string;
  images?: string | string[];
}

interface CartSummaryProps {
  shops: CartItem[];
  onProceed?: () => void;
}

export default function CartSummary({ shops, onProceed }: CartSummaryProps) {
  const dispatch = useDispatch();
  const shippingOptions: ShippingOption[] = [
    {
      id: 1,
      name: "Standard Shipping",
      cost: 0,
      estimatedDelivery: "3-5 business days",
    },
    {
      id: 2,
      name: "Express Shipping",
      cost: 15,
      estimatedDelivery: "1-2 business days",
    },
    {
      id: 3,
      name: "Premium Shipping",
      cost: 25,
      estimatedDelivery: "Next business day",
    },
  ];

  const [selectedShippingId, setSelectedShippingId] = React.useState<number>(1);

  const subtotal = shops.reduce((sum, shop) => sum + shop.totalPrice, 0);
  const shippingCost =
    shippingOptions.find((o) => o.id === selectedShippingId)?.cost || 0;
  const total = subtotal + shippingCost;

  const handleShippingChange = (option: ShippingOption) => {
    setSelectedShippingId(option.id);
    dispatch(setShippingOption(option));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h3>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Shipping Method
        </h4>
        <div className="space-y-2">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors",
                selectedShippingId === option.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              )}
            >
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShippingId === option.id}
                onChange={() => handleShippingChange(option)}
                className="sr-only"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {option.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {option.estimatedDelivery}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.cost === 0 ? "FREE" : formatCurrency(option.cost)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Subtotal ({shops.length} {shops.length === 1 ? "item" : "items"})
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Shipping
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
          </span>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={onProceed}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
