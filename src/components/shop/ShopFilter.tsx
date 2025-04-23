import { ShopViewIcon1, ShopViewIcon2 } from "../../assets/icons";

import Filter from "../../ui/Filter";
import SearchFilter from "./SearchFilter";

export function ShopFilter({
  handleClick,
  activeCart,
}: {
  handleClick: (cartNumber: number) => void;
  activeCart: number;
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between ~gap-4/6 lg:gap-10">
      <div className="flex flex-col sm:flex-row w-full lg:w-2/5 ~gap-2/4">
        <Filter
          title="categories"
          options={[
            { value: "all", label: "All" },
            { value: "accessory", label: "Accessory" },
            { value: "fashion", label: "Fashion" },
            { value: "home", label: "Home" },
            { value: "book", label: "Book" },
            { value: "health", label: "Health" },
          ]}
          filterField="category"
        />
        <Filter
          title="Price"
          options={[
            { value: "all", label: "All Prices" },
            { value: "0-99", label: "$0 - $99" },
            { value: "100-299", label: "$100 - $299" },
            { value: "300-599", label: "$300 - $599" },
            { value: "+600", label: "$600+" },
          ]}
          filterField="price"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full lg:w-3/5 ~gap-4/6 md:gap-8">
        <div className="w-full md:w-1/2">
          <SearchFilter />
        </div>

        <div className="flex w-full max-lg:w-full justify-between max-lg:justify-between items-center gap-4 md:gap-6">
          <div className="w-full font-semibold cursor-pointer">
            <Filter
              title="sort by"
              options={[
                { value: "all", label: "All" },
                { value: "no-discount", label: "No discount" },
                { value: "with-discount", label: "With discount" },
              ]}
              filterField="discount"
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 border cursor-pointer h-fit self-end">
            <div
              className={`p-2 border ${
                activeCart === 1
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "dark:border-gray-600"
              }`}
              onClick={() => handleClick(1)}
            >
              <ShopViewIcon1 />
            </div>
            <div
              className={`p-2 border flex ${
                activeCart === 2
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "dark:border-gray-600"
              }`}
              onClick={() => handleClick(2)}
            >
              <ShopViewIcon2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
