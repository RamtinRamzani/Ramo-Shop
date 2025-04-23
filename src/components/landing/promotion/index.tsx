import { useEffect, useMemo, useState } from "react";
import Button from "../../../ui/Button";
import { TimeCart } from "../../../ui/cart/Carts";
import { useNavigate } from "react-router-dom";

export default function Promotion() {
  const navigate = useNavigate();

  const [time, setTime] = useState({
    days: 2,
    hours: 12,
    minutes: 5,
    seconds: 29,
  });

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

  return (
    <section className="~mt-16/24 flex flex-col-reverse sm:flex-row">
      <img className="sm:w-1/2" src="/images/headphone-02.png" />

      <div className="sm:w-1/2 ~px-8/16 max-sm:flex flex-col items-center ~py-6/24 bg-[#ffaa0066]">
        <p className="~mb-4/8 text-sm font-bold text-blue-500 uppercase">
          promotion
        </p>

        <h3 className="~text-3xl/5xl font-semibold mb-6">Hurry up! 40% OFF</h3>

        <p className="~mb-6/12 ~text-md/2xl text-neutral-06">
          Thousands of high tech are waiting for you
        </p>

        <p className="self-start mb-4 text-neutral-07">Offer expires in:</p>

        <div className="flex gap-4 ~mb-4/6">
          <TimeCart hour={time.days} day="Days" bg="bg-neutral-02" />
          <TimeCart hour={time.hours} day="Hours" bg="bg-neutral-02" />
          <TimeCart hour={time.minutes} day="Minutes" bg="bg-neutral-02" />
          <TimeCart hour={time.seconds} day="Seconds" bg="bg-neutral-02" />
        </div>

        <Button
          className="self-start w-full sm:w-3/5 sm:py-6"
          onClick={() => navigate("/shop")}
        >
          shop now
        </Button>
      </div>
    </section>
  );
}
