import Comment from "../components/product/Comment";
import ProductDetail from "../components/product/ProductDetail";
import ProductPicture from "../components/product/ProductPicture";
import BreadCrumb from "../ui/BreadCrumb";
import MainContainer from "../ui/MainContainer";

export default function ProductPage() {
  return (
    <MainContainer className="~pt-20/24">
      <div className="mb-4 ~text-xs/base text-neutral-04">
        <BreadCrumb />
      </div>

      <div className="flex flex-col xl:flex-row ~gap-8/14 mb-10">
        <ProductPicture />

        <ProductDetail />
      </div>

      <Comment />
    </MainContainer>
  );
}
