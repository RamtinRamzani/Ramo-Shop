import { useDispatch } from "react-redux";
import Table from "../../ui/Table";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} from "./cartSlice";
import { formatCurrency } from "../../utils/helper";

interface CartItem {
  shopId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  title: string;
  image?: string;
  images?: string | string[];
}

function ShoppingRow({ shop }: { shop: CartItem }) {
  const { shopId, title, quantity, unitPrice, totalPrice, image, images } =
    shop;
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseItemQuantity(shopId));
  };

  const handleDecrease = () => {
    dispatch(decreaseItemQuantity(shopId));
  };

  const handleRemove = () => {
    dispatch(deleteItem(shopId));
  };

  const displayImage =
    image ||
    (images && images.length > 0
      ? images[0]
      : "../../../public/images/airpod-01.jpg");

  return (
    <Table.Row>
      <div className="flex gap-4 h-20 items-center">
        <img
          src={displayImage}
          className="object-cover w-20 h-full rounded-md"
          alt={title}
        />
        <div className="flex flex-col justify-between flex-1">
          <h3 className="capitalize font-semibold text-sm md:text-base">
            {title}
          </h3>
          <button
            onClick={handleRemove}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
          >
            <span className="text-lg">☓</span>
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex border-2 border-gray-300 rounded-md">
          <button
            className="text-lg font-semibold ~px-1/3 py-1 hover:bg-gray-100"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="w-12 text-center flex items-center justify-center">
            {quantity}
          </span>
          <button
            className="text-lg font-semibold ~px-1/3 py-1 hover:bg-gray-100"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-center">{formatCurrency(unitPrice)}</div>
      <div className="text-center">{formatCurrency(totalPrice)}</div>
    </Table.Row>
  );
}

export default ShoppingRow;
