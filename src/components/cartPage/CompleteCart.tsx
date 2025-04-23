import { useSelector, useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { getCart, getShippingOption, saveOrder } from "./cartSlice";
import { formatCurrency } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const generateOrderCode = () => {
  const prefix = "ORD";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `#${prefix}-${randomNum}`;
};

export default function CompleteCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const shippingOption = useSelector(getShippingOption);

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No items in your order.
        </p>
        <Button
          variant="outline"
          className="mt-4 px-6 py-3 rounded-full border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingCost = shippingOption?.cost || 0;
  const total = subtotal + shippingCost;

  const orderDetails = {
    code: generateOrderCode(),
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    total,
    paymentMethod: "Credit Card (****4242)",
    shippingMethod: shippingOption?.name || "Standard Shipping",
    estimatedDelivery:
      shippingOption?.estimatedDelivery ||
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      ),
  };

  const handleConfirmOrder = () => {
    dispatch(saveOrder());
    navigate("/account/orders");
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 w-full xl:w-3/5 md:w-4/5 mx-auto px-6 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <div className="text-center ~mb-4/8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h3 className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium mb-2">
          Thank you for your order!
        </h3>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
          Your order has been received
        </p>
      </div>

      <div className="flex ~gap-1/4 ~mb-2/8 justify-center">
        {cart.slice(0, 3).map((item) => (
          <div key={item.shopId} className="w-1/4 max-w-[120px]">
            <img
              src={
                item.image ||
                (item.images
                  ? typeof item.images === "string"
                    ? item.images
                    : item.images[0]
                  : "/images/placeholder.png") // Test picture
              }
              className="w-full h-4/5 rounded-lg border border-gray-200 dark:border-gray-600 text-xs text-center"
              alt={item.title}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg ~p-2/6 mb-8">
        <h4 className="~text-base/lg font-medium text-gray-800 dark:text-white mb-4">
          Order Summary
        </h4>
        <div className="space-y-3 ~text-xs/lg">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Order code:
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {orderDetails.code}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {orderDetails.date}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Shipping:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Total:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formatCurrency(orderDetails.total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Shipping method:
            </span>
            <span className="font-medium text-gray-800 dark:text-white text-right">
              {orderDetails.shippingMethod}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Payment method:
            </span>
            <span className="font-medium text-gray-800 dark:text-white text-right">
              {orderDetails.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Estimated delivery:
            </span>
            <span className="font-medium text-gray-800 dark:text-white text-right">
              {orderDetails.estimatedDelivery}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Ordered Items
        </h4>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.shopId} className="flex items-center gap-4">
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
              <div className="flex-1 ~text-xs/lg">
                <p className="font-medium text-gray-800 dark:text-white">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.quantity} @ {formatCurrency(item.unitPrice)} each
                </p>
              </div>
              <p className="font-medium text-gray-800 dark:text-white">
                {formatCurrency(item.totalPrice)}
                {/* {formatCurrency(orderDetails.total)} */}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
        <Button
          variant="outline"
          className="px-6 py-3 rounded-full border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
