import { useState } from "react";

interface Product {
  id: number;
  name: string;
}

const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

export default function SHowMore() {
  const [visibleProducts, setVisibleProducts] = useState(9);

  const showMoreProducts = () => {
    setVisibleProducts((prev) => prev + 9);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("../../../data/cart.json");
  //     const data = await response.json();
  //     setCarts(data.carts);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Product List</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="p-4 transition border rounded-lg shadow-sm hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </div>
        ))}
      </div>

      {visibleProducts < products.length && (
        <button
          onClick={showMoreProducts}
          className="self-center py-1 mt-10 border-2 border-gray-500 text-neutral-06 hover:font-semibold hover:border-gray-700 w-36 rounded-xl"
        >
          Show More
        </button>
      )}
    </div>
  );
}
