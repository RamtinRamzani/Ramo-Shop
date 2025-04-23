import {
  DeliveryIcon,
  LockIcon,
  PaymentIcon,
  PhoneIcon,
} from "../../../assets/icons";
import { BenefitCart } from "../../../ui/cart/Carts";
import MainContainer from "../../../ui/MainContainer";

export default function BenefitsCards() {
  const benefits = [
    {
      id: 1,
      icon: <DeliveryIcon />,
      title: "free shipping",
      text: "order above $200",
    },
    {
      id: 2,
      icon: <PaymentIcon />,
      title: "money back",
      text: "30 days guarantee",
    },
    {
      id: 3,
      icon: <LockIcon />,
      title: "secure payments",
      text: "Secured by Stripe",
    },
    {
      id: 4,
      icon: <PhoneIcon />,
      title: "24/7 Support",
      text: "phone & email support",
    },
  ];

  return (
    <section className="~mt-6/10">
      <MainContainer className="grid grid-cols-2 ~gap-y-6/8 lg:grid-cols-4 ~gap-x-2/8">
        {benefits.map((item) => (
          <BenefitCart
            title={item.title}
            text={item.text}
            icon={item.icon}
            key={item.id}
          />
        ))}
      </MainContainer>
    </section>
  );
}
