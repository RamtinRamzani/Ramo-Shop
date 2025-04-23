import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../cartPage/cartSlice";

export default function Orders() {
  const navigate = useNavigate();
  const orders = useSelector(getOrders);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-500 dark:text-gray-400 text-base">
          You have no orders yet.
        </p>
        <button
          className="mt-4 inline-block px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => navigate("/shop")}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pm-6 ~px-2/4 space-y-8">
      {orders.map((order) => (
        <div
          key={order.code}
          className="border border-gray-200 dark:border-gray-700 w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          {/* Order Header */}
          <div className="text-center mb-6 pt-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-base font-medium mb-1">
              Order #{order.code}
            </h3>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              Placed on {order.date}
            </p>
          </div>

          {/* Ordered Products Preview */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center px-4">
            {order.items.slice(0, 3).map((item) => (
              <div key={item.shopId} className="w-20 flex-shrink-0">
                <img
                  src={
                    item.image ||
                    (item.images && typeof item.images === "string"
                      ? item.images
                      : item.images && item.images.length > 0
                      ? item.images[0]
                      : "/images/placeholder.png")
                  }
                  className="w-full h-4/5 rounded-md border border-gray-200 dark:border-gray-600 object-cover"
                  alt={item.title}
                />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg ~p-3/6 mb-6 mx-4">
            <h4 className="text-base font-medium text-gray-800 dark:text-white mb-3">
              Order Summary
            </h4>
            <div className="space-y-3 ~text-xs/lg">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Order code:
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {order.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {order.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Subtotal:
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Shipping:
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {order.shippingCost === 0
                    ? "FREE"
                    : formatCurrency(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total:</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(order.total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Shipping method:
                </span>
                <span className="font-medium text-gray-800 dark:text-white text-right">
                  {order.shippingMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Payment method:
                </span>
                <span className="font-medium text-gray-800 dark:text-white text-right">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Estimated delivery:
                </span>
                <span className="font-medium text-gray-800 dark:text-white text-right">
                  {order.estimatedDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-6 px-4">
            <h4 className="text-base font-medium text-gray-800 dark:text-white mb-3">
              Ordered Items
            </h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.shopId} className="flex items-center gap-3">
                  <img
                    src={
                      item.image ||
                      (item.images && typeof item.images === "string"
                        ? item.images
                        : item.images && item.images.length > 0
                        ? item.images[0]
                        : "/images/placeholder.png")
                    }
                    className="w-14 h-14 rounded-md object-cover border border-gray-200 dark:border-gray-600 text-xs"
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} @ {formatCurrency(item.unitPrice)}{" "}
                      each
                    </p>
                  </div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
