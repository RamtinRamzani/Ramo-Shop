import { CartCol, CartRow } from "../../../ui/cart/Carts";
import CartHeader from "../../../ui/cart/CartHeader";
import MainContainer from "../../../ui/MainContainer";
import { useNavigate } from "react-router-dom";

export default function ShopCollection() {
  const navigate = useNavigate();
  return (
    <section>
      <MainContainer className="~mt-12/24">
        <CartHeader title="shop collection" />

        <div className="flex flex-col grid-rows-2 sm:h-[400px] md:h-[500px] xl:h-[600px] ~gap-6/8 mb-20 sm:grid sm:grid-cols-2">
          <CartCol
            src="/images/headphone-01.png"
            title="mobile"
            onClick={() => navigate("/shop")}
          />
          <CartRow
            src="/images/headphone-03.png"
            title="headphone"
            onClick={() => navigate("/shop")}
          />
          <CartRow
            src="/images/airpod-02.png"
            title="headphone"
            onClick={() => navigate("/shop")}
          />
        </div>
      </MainContainer>
    </section>
  );
}
