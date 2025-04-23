import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { HeartIcon } from "../../assets/icons";
import { Loading } from "../../ui/Loading";
import { useShoping } from "../shop/useShoping";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlistSlice";

export default function AddToWishlist() {
  const dispatch = useDispatch();
  const { shoping, isLoading, error } = useShoping();
  const wishlist = useSelector((state: RootState) => getWishlist(state) || []);

  const { id, title, discount, price, image, images } = shoping || {};
  const priceWithDiscount = price ? price - (price * (discount ?? 0)) / 100 : 0;
  const isWishlisted = wishlist.some((item) => item.shopId === id);

  const handleWishlistToggle = () => {
    if (!id) return;
    const wishlistItem = {
      shopId: id,
      title: title || "Untitled",
      unitPrice: priceWithDiscount,
      image,
      images,
    };

    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(wishlistItem));
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <button
      className={`flex items-center justify-center w-full gap-2 px-4 py-2 mt-2 font-semibold text-black transition-all rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-grey-300 dark:hover:bg-grey-400 ${
        isWishlisted
          ? "bg-red-100 hover:bg-red-200"
          : "bg-white hover:bg-gray-100"
      }`}
      aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      onClick={handleWishlistToggle}
      disabled={!id}
    >
      <HeartIcon
        className={`w-6 h-6 transition-transform hover:scale-125 ~text-sm/md md:text-md ${
          isWishlisted ? "text-red-700" : "text-red-500"
        }`}
      />
      <span className="~text-sm/md md:text-md">
        {isWishlisted ? "Wishlisted" : "Wishlist"}
      </span>
    </button>
  );
}
