import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { addItem } from "../cartPage/cartSlice";
import { useShoping } from "../shop/useShoping";
import { useDispatch } from "react-redux";
import { Loading } from "../../ui/Loading";

function AddToCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shoping, isLoading, error } = useShoping();
  const { id, title, discount, price, image, images } = shoping || {};

  const priceWithDiscount = price - (price * (discount ?? 0)) / 100;
  const handleAddToCart = () => {
    const newItem = {
      shopId: id,
      title,
      quantity: 1,
      unitPrice: priceWithDiscount,
      totalPrice: priceWithDiscount,
      image,
      images,
    };

    dispatch(addItem(newItem));
    navigate(`/cart/${shoping.id}`);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <Button className="mt-4 text-xl font-semibold" onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
}

export default AddToCart;
