import Featured from "../components/featured";
import Hero from "../components/landing/hero";
import ShopCollection from "../components/landing/shopCollection";
import BestSeller from "../components/landing/bestSellers";
import Promotion from "../components/landing/promotion";
import BenefitsCards from "../components/landing/benefitsCards";
import Instagram from "../components/landing/instagram";
import ScrollToTop from "../ui/ScrollToTop";

function Landing() {
  return (
    <>
      <Hero />
      <Featured />
      <ShopCollection />
      <BestSeller />
      <Promotion />
      <BenefitsCards />
      <Instagram />
      <ScrollToTop />
    </>
  );
}

export default Landing;
