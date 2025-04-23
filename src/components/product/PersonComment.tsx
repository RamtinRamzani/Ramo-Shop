import { useState } from "react";
import StarsRating from "../../ui/Star";

interface Review {
  id: number;
  img: string;
  name: string;
  stars: number;
  text: string;
}

export default function PersonComment({ reviews }: { reviews: Review[] }) {
  const [activeStatus, setActiveStatus] = useState<
    Record<number, { like: boolean; reply: boolean }>
  >({});

  const handleClick = (id: number, type: "like" | "reply") => {
    setActiveStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };
      if (!updatedStatus[id]) {
        updatedStatus[id] = { like: false, reply: false };
      }

      if (type === "like") {
        updatedStatus[id].like = !updatedStatus[id].like;
        updatedStatus[id].reply = false;
      } else if (type === "reply") {
        updatedStatus[id].reply = !updatedStatus[id].reply;
        updatedStatus[id].like = false;
      }
      return updatedStatus;
    });
  };

  return (
    <>
      {reviews.map((item) => (
        <div className="flex flex-col gap-4 mt-10 border-b-1" key={item.id}>
          <div className="flex items-center gap-4">
            <img
              src={item.img}
              className="w-12 h-12 overflow-hidden text-xs border-2 border-black rounded-full"
              alt={item.name}
            />
            <div className="flex flex-col gap-2">
              <span className="capitalize">{item.name}</span>
              <StarsRating rating={item.stars} />
            </div>
          </div>
          <p className="text-neutral-04 line-clamp-4 dark:text-grey-400">
            {item.text}
          </p>
          <div className="grid grid-cols-2 gap-4 pb-4 font-semibold justify-items-center">
            <button
              className={`hover:underline dark:text-grey-300 ${
                activeStatus[item.id]?.like
                  ? "text-neutral-08 font-bold"
                  : "text-neutral-05"
              }`}
              onClick={() => handleClick(item.id, "like")}
            >
              Like
            </button>
            <button
              className={`hover:underline dark:text-grey-300 ${
                activeStatus[item.id]?.reply
                  ? "text-neutral-08 font-bold"
                  : "text-neutral-05"
              }`}
              onClick={() => handleClick(item.id, "reply")}
            >
              Reply
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
