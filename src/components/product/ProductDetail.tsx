import { useState, useEffect, useMemo } from "react";

import { useShoping } from "../shop/useShoping";
import { Loading } from "../../ui/Loading";
import StarsRating from "../../ui/Star";
import { formatCurrency } from "../../utils/helper";
import AddToCart from "../account/AddToCart";
import AddToWishlist from "../account/AddToWishlists";
import { TimeCart } from "../../ui/cart/Carts";

export default function ProductDetail() {
  const { shoping, isLoading, error } = useShoping();
  const { title, discount, rating, description, price } = shoping || {};

  // Initialize countdown state
  const [time, setTime] = useState({
    days: 2,
    hours: 12,
    minutes: 5,
    seconds: 29,
  });

  // Memoize endTime to prevent recreation on every render
  const endTime = useMemo(() => {
    const end = new Date();
    end.setDate(end.getDate() + time.days);
    end.setHours(end.getHours() + time.hours);
    end.setMinutes(end.getMinutes() + time.minutes);
    end.setSeconds(end.getSeconds() + time.seconds);
    return end;
  }, []); // Empty deps since initial time is static

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = endTime.getTime() - now.getTime();

      if (timeDifference <= 0) {
        // Countdown finished
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endTime]);

  const priceWithDiscount = price - (price * (discount ?? 0)) / 100;

  // Handle loading and error states
  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex justify-center xl:w-3/5">
      <div className="flex flex-col lg:px-16 w-full">
        <div className="flex ~gap-2/4">
          <StarsRating rating={rating} />
          <span className="text-sm text-neutral-04">11 Reviews</span>
        </div>
        <h2 className="~my-3/6 ~text-3xl/4xl font-semibold capitalize">
          {title}
        </h2>
        <p className="~mb-2/4 text-sm leading-6 text-neutral-04 line-clamp-4">
          {description}
        </p>
        <div className="flex items-center gap-4 pb-6 ~mb-3/6 font-semibold border-b-2">
          <span className="text-2xl">{formatCurrency(priceWithDiscount)}</span>
          <span className="text-lg line-through text-neutral-04 decoration-black">
            {priceWithDiscount === price ? "" : formatCurrency(price)}
          </span>
        </div>
        <div className="flex flex-col gap-2 pb-6 mb-6 border-b-2">
          <p className="self-start mb-4 text-neutral-07 dark:text-grey-200">
            Offer expires in:
          </p>
          <div className="flex gap-4 ~mb-4/6">
            <TimeCart hour={time.days} day="Days" bg="bg-neutral-02" />
            <TimeCart hour={time.hours} day="Hours" bg="bg-neutral-02" />
            <TimeCart hour={time.minutes} day="Minutes" bg="bg-neutral-02" />
            <TimeCart hour={time.seconds} day="Seconds" bg="bg-neutral-02" />
          </div>
        </div>

        <div className="flex flex-col gap-6 ~mb-6/8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-xs cursor-pointer hover:text-neutral-05 text-neutral-04">
              <span className="font-semibold">Choose Color</span>
              <span>➝</span>
            </div>
            <span>Black</span>
          </div>
        </div>

        <AddToCart />
        <AddToWishlist />
      </div>
    </div>
  );
}
