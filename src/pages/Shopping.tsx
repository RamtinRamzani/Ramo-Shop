import MainShop from "../components/shop/MainShop";
import ShopHeader from "../components/shop/ShopHeader";
import MainContainer from "../ui/MainContainer";

export default function Shopping() {
  return (
    <MainContainer className="~pt-20/24 dark:bg-grey-900">
      <ShopHeader />
      <MainShop />
    </MainContainer>
  );
}
