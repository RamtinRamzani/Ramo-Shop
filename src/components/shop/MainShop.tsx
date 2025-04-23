import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import RenderCartItems from "./RenderCartItems";
import { ShopFilter } from "./ShopFilter";
import { Loading } from "../../ui/Loading";
import useGetShop from "./useGetShop";
import { useNavigate } from "react-router-dom";
import { Pagination, Spinner } from "@heroui/react";

export default function MainShop() {
  const [activeCart, setActiveCart] = useState(1);
  const [visibleCart, setVisibleCart] = useState(8);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { shops, isLoading } = useGetShop();

  // Screen Size
  const isSmallScreen = useMediaQuery({ query: "(max-width: 624px)" });

  const handleShowCart = (cartNumber: number) => {
    setActiveCart(cartNumber);
    setCurrentPage(1);
    setVisibleCart(cartNumber === 1 ? 12 : 6);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedShops = shops?.slice(startIndex, endIndex);

  useEffect(() => {
    if (!isSmallScreen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setIsFetching(true);
          setTimeout(() => {
            setVisibleCart((prev) => prev + 4);
            setIsFetching(false);
          }, 3000);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [visibleCart, isFetching, isSmallScreen]);

  /* Loading */
  // if (isLoading) return <Loading />;

  return (
    <div className="flex mt-16 gap-14">
      <div className="flex flex-col w-full">
        {/* Filters */}
        <ShopFilter handleClick={handleShowCart} activeCart={activeCart} />

        <div
          className={`grid gap-6 my-10 ${
            activeCart === 1
              ? `lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ${
                  activeCart === 1 ? "" : "grid-rows-3"
                } gap-y-8`
              : "lg:grid-cols-2 grid-cols-1"
          }`}
        >
          {/* Items */}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {isSmallScreen ? (
                <RenderCartItems
                  filteredShop={shops?.slice(0, visibleCart)}
                  visibleCart={visibleCart}
                  isSmallScreen={isSmallScreen}
                  activeCart={activeCart}
                  onClick={(id) => navigate(`/product/${id}`)}
                />
              ) : (
                <RenderCartItems
                  filteredShop={paginatedShops}
                  visibleCart={itemsPerPage}
                  isSmallScreen={isSmallScreen}
                  activeCart={activeCart}
                  onClick={(id) => navigate(`/product/${id}`)}
                />
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {/* Mobile Screen */}
        {isSmallScreen && shops && visibleCart < shops.length && (
          <div
            ref={loaderRef}
            className="self-center flex justify-center items-center gap-3 py-2 px-4 my-10 border-2 border-gray-500 text-neutral-06 hover:font-semibold hover:border-gray-700 rounded-xl cursor-pointer"
          >
            {isFetching ? (
              <>
                <Spinner />
                <span>Loading more...</span>
              </>
            ) : (
              <span className="opacity-50">Scroll to load more...</span>
            )}
          </div>
        )}

        {/* Large Screen*/}
        {!isSmallScreen && shops?.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <Pagination
              isCompact
              showControls
              initialPage={1}
              total={Math.ceil((shops?.length || 0) / itemsPerPage)}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
