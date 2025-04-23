// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="~pt-20/16 lg:pt-4 mb-10 bg-bg-color dark:bg-grey-900 dark:border-b dark:border-b-grey-700">
      <div className="flex flex-col-reverse mx-auto w-full ~gap-x-2/10 items-center ~px-1/6 max-w-7xl md:flex-row">
        <div className="sm:w-1/2">
          <img
            src="/images/hero-012.png"
            alt="Music Listening mobile"
            className="w-full mx-auto"
          />
        </div>

        <div className="p-4 text-center sm:w-1/2 md:text-left">
          <h1 className="mb-4 ~text-2xl/6xl capitalize font-semibold">
            Listen to the <span className="pr-2 text-blue-500">amazing</span>
            Lorem ipsum dolor sit amet adipisicing.
          </h1>

          <p className="~text-sm/lg text-gray-700 dark:text-grey-400">
            Experience music like never before
          </p>

          <Button
            className="~mt-6/10 ~px-12/8 ~py-6/7 ~text-sm/xl max-md:mx-auto"
            onClick={() => navigate("/shop")}
          >
            Shopping Now
          </Button>
        </div>
      </div>
    </section>
  );
}
