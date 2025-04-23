import Button from "../../ui/Button";
import { ShopCartView1, ShopCartView2 } from "../../ui/cart/Carts";

interface filteredShopProps {
  id: number;
  detail: string;
  discount: number;
  image: string;
  images: string;
  title: string;
  rating: number;
  description: string;
  price: number;
}

const RenderCartItems = ({
  filteredShop,
  visibleCart,
  isSmallScreen,
  activeCart,
  onClick,
}: {
  filteredShop: filteredShopProps[];
  visibleCart: number;
  isSmallScreen: boolean;
  activeCart: number;
  onClick?: (id: number) => void;
}) => {
  if (!filteredShop || filteredShop.length === 0) {
    return (
      <div className="col-span-4 flex justify-center items-center h-72 text-4xl text-neutral-04">
        No shops found
      </div>
    );
  }
  return filteredShop?.slice(0, visibleCart).map((item) =>
    isSmallScreen ? (
      <ShopCartView2
        key={item.id}
        detail={item.detail}
        discount={item.discount}
        src={item.images?.[0] ? item.images?.[0] : item.image}
        title={item.title}
        rating={item.rating}
        description={item.description}
        price={item.price}
        onClick={() => onClick?.(item.id)}
      />
    ) : activeCart === 1 ? (
      <ShopCartView1
        key={item.id}
        src={item.images?.[0] ? item.images?.[0] : item.image}
        title={item.title}
        detail={item.detail}
        description={item.description}
        price={item.price}
        discount={item.discount}
        rating={item.rating}
      >
        <Button
          className="absolute w-3/4 transition-all duration-1000 transform -translate-x-1/2 translate-y-4 opacity-0 bottom-4 left-1/2 group-hover:opacity-100 group-hover:translate-y-0"
          onClick={() => onClick?.(item.id)}
        >
          See details
        </Button>
      </ShopCartView1>
    ) : (
      <ShopCartView2
        key={item.id}
        detail={item.detail}
        discount={item.discount}
        src={item.images?.[0] ? item.images?.[0] : item.image}
        title={item.title}
        rating={item.rating}
        description={item.description}
        price={item.price}
        onClick={() => onClick?.(item.id)}
      />
    )
  );
};

export default RenderCartItems;
