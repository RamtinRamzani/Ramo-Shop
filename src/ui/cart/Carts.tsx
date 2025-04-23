import Button from "../Button";
import CartTitle from "./CartTitle";
import StarsRating from "../Star";
import { formatCurrency } from "../../utils/helper";
import AddToWishlist from "../../components/account/AddToWishlists";

export function CartCol({
  className,
  src,
  title,
  onClick,
}: {
  className?: string;
  src?: string;
  title?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-col col-span-1 row-span-2 shadow-sm ~px-6/14 rounded-sm bg-[#F3F5F7] dark:bg-grey-800 pt-8 ${className}`}
      onClick={onClick}
    >
      <img src={src} title={title} className="w-5/6 mx-auto h-5/6" />
      <CartTitle title={title} className="h-1/6 dark:text-grey-200" />
    </div>
  );
}

export function CartRow({
  className,
  src,
  title,
  onClick,
}: {
  className?: string;
  src?: string;
  title?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-row-reverse rounded-sm col-span-1 row-span-1 shadow-sm ~px-4/8 bg-[#F3F5F7] dark:bg-grey-800 pt-6 ${className} `}
      onClick={onClick}
    >
      <img src={src} title={title} className="w-1/2 " />
      <CartTitle
        title={title}
        className="self-end w-1/2 ~mb-6/14 dark:text-grey-200 "
      />
    </div>
  );
}

export function ShopCartView1({
  src,
  title,
  detail,
  description,
  price,
  discount,
  rating,
  children,
}: {
  src: string;
  title: string;
  detail?: string;
  description: string;
  price: number;
  discount?: number;
  rating: number;
  children?: React.ReactNode;
}) {
  const priceWithDiscount = price - (price * (discount ?? 0)) / 100;

  return (
    <div className="sm:h-[350px] h-[350px] flex flex-col gap-4 border dark:border-grey-700 border-grey-200 rounded-md">
      <div className="bg-[#F3F5F7] dark:bg-grey-800 relative rounded-sm p-4 shadow-sm h-3/4 cursor-pointer group">
        <span className="absolute px-4 font-semibold ~text-xs/sm uppercase bg-grey-200 rounded-sm shadow-sm left-4 dark:text-grey-700">
          {detail}
        </span>
        <span className="absolute px-4 font-semibold ~text-xs/sm uppercase bg-green-300 dark:bg-green-700 rounded-sm shadow-sm left-4 top-11">
          {discount && discount < 100 ? `${discount}%` : null}
        </span>
        <div className="h-full flex justify-center items-center">
          {/* <img src={src} title={title} className="w-4/5 mx-auto mt-6 h-5/6" /> */}
          <img src={src} title={title} className="h-full pt-7" loading="lazy" />
        </div>

        {children}
      </div>
      <div className="flex flex-col gap-1 font-semibold pl-2">
        <div className="h-1/4">
          <StarsRating rating={rating} />
        </div>
        <div className="pr-4 text-sm line-clamp-1 h-1/3">{description}</div>
        <div className="flex items-center gap-4 text-xs font-bold h-1/4">
          <span>{formatCurrency(priceWithDiscount)}</span>
          <span className="line-through text-neutral-04 decoration-black">
            {priceWithDiscount === price ? "" : formatCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ShopCartView2({
  detail,
  discount,
  src,
  title,
  rating,
  description,
  price,
  onClick,
}: {
  detail?: string;
  discount?: number;
  src: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  onClick?: () => void;
}) {
  const priceWithDiscount = price - (price * (discount ?? 0)) / 100;

  return (
    <div className="flex flex-col sm:flex-row border-1 dark:border-grey-700 h-[500px] sm:h-full rounded-sm shadow-sm cursor-pointer">
      <div className="bg-[#F3F5F7] dark:bg-grey-800 relative h-1/2 sm:h-full sm:w-1/2 w-full dark:text-grey-500">
        <span className="absolute px-4 font-semibold ~text-xs/sm uppercase bg-white rounded-sm shadow-sm left-5 top-6">
          {detail}
        </span>
        <span className="absolute px-4 font-semibold ~text-xs/sm uppercase bg-green-300 rounded-sm shadow-sm left-5 top-12">
          {discount}%
        </span>
        <div className="h-full flex justify-center items-center">
          <img src={src} title={title} className="h-full p-4" loading="lazy" />
        </div>
      </div>
      <div className="flex flex-col ~px-3/6 overflow-hidden ~py-2/7 h-1/2 sm:h-full sm:w-1/2 w-full">
        <StarsRating rating={rating} />
        <h2 className="~mt-1/4 ~text-lg/xl font-semibold capitalize line-clamp-2 max-h-7">
          {title}
        </h2>
        <div className="flex items-center gap-4 ~mt-1/2 ~mb-2/6 text-sm font-bold">
          <span>{formatCurrency(priceWithDiscount)}</span>
          <span className="line-through text-neutral-04 decoration-black">
            {priceWithDiscount === price ? "" : formatCurrency(price)}
          </span>
        </div>
        <div className="~text-xs/sm leading-2 sm:leading-6 ~h-10/24 text-neutral-04 line-clamp-2 sm:line-clamp-4">
          {description}
        </div>
        <div className="w-full flex flex-col gap-1">
          <Button className="~mt-1/4 h-10 w-full" onClick={onClick}>
            See details
          </Button>
          <AddToWishlist />
        </div>
      </div>
    </div>
  );
}

export function BenefitCart({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="~h-40/52 ~px-4/8 ~pt-8/12 rounded-sm shadow-sm lg:h-56 bg-neutral-02 dark:bg-grey-800">
      <div className="mb-4">{icon}</div>
      <p className="~mb-0.5/2 font-semibold capitalize ~text-sm/xl text-neutral-07 dark:text-grey-200">
        {title}
      </p>
      <span className="~text-xs/sm text-neutral-04 line-clamp-1 overflow-hidden text-ellipsis dark:text-grey-400">
        {text}
      </span>
    </div>
  );
}

export function TimeCart({
  hour = 0, // Default to 0 if undefined
  day,
  bg = "bg-white",
}: {
  hour?: number; // Allow undefined but provide default
  day: string;
  bg?: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-0.5 sm:gap-1">
      <span
        className={`flex items-center justify-center ~w-10/16 ~h-10/16 ~text-2xl/3xl font-semibold ${bg} text-neutral-07`}
      >
        {hour.toString().padStart(2, "0")}
      </span>
      <span className="text-xs font-semibold capitalize text-neutral-04 dark:text-grey-300">
        {day}
      </span>
    </div>
  );
}
