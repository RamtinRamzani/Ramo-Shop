import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useShoping } from "../shop/useShoping";
import { Loading } from "../../ui/Loading";

function ProductPicture() {
  const { isLoading, shoping, error } = useShoping();
  const { images = [], detail, discount } = shoping || {};
  const hasImages = images && images.length > 0;

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  // Handle loading and error states
  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex h-[300px] sm:h-[400px] border dark:border-grey-700 rounded-md xl:h-[700px] flex-col xl:w-3/6 ~gap-y-1/4">
      <div className="relative h-full overflow-hidden xl:h-4/5 rounded-md">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {hasImages ? (
            images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                className="object-cover w-full h-full shrink-0"
                alt={`chair${index + 1}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 self-center mx-auto">
              No images available
            </p>
          )}
        </div>

        <span className="absolute px-4 py-1 text-xs font-semibold text-white uppercase bg-green-300 rounded-sm shadow-sm left-4 top-11">
          {discount}%
        </span>
        <span className="absolute px-4 py-1 text-xs font-semibold uppercase bg-white rounded-sm shadow-sm left-4 top-2 dark:text-grey-700">
          {detail}
        </span>

        {hasImages && (
          <>
            <div
              onClick={handlePrevious}
              className="absolute flex items-center justify-center transform -translate-y-1/2 bg-white text-grey-800 rounded-full shadow-sm cursor-pointer w-9 h-9 top-1/2 left-4 hover:bg-gray-200"
            >
              <AiOutlineArrowLeft />
            </div>
            <div
              onClick={handleNext}
              className="absolute flex items-center justify-center transform -translate-y-1/2 bg-white text-grey-800 rounded-full shadow-sm cursor-pointer w-9 h-9 top-1/2 right-4 hover:bg-gray-200"
            >
              <AiOutlineArrowRight />
            </div>
          </>
        )}
      </div>

      <div className="flex ~gap-1/4 h-1/5">
        {hasImages
          ? images.map((image: string, index: number) => (
              <div
                key={index}
                className={`w-1/3 h-full cursor-pointer border-2 rounded-md ${
                  activeIndex === index
                    ? "border-gray-800 dark:border-grey-400"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  className="object-cover w-full h-full rounded-md"
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default ProductPicture;
