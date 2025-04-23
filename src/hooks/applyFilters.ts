interface Filters {
  category?: string;
  price?: string;
  search?: string;
}

interface Query {
  eq: (field: string, value: string) => Query;
  gte: (field: string, value: number) => Query;
  lte: (field: string, value: number) => Query;
  ilike: (field: string, value: string) => Query;
}

export function applyFilters(query: Query, filters: Filters): Query {
  const { category, price, search } = filters;

  // Category
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  // Price
  if (price && price !== "all") {
    let minPrice, maxPrice;

    if (price.includes("-")) {
      [minPrice, maxPrice] = price.split("-").map(Number);
      query = query.gte("price", minPrice).lte("price", maxPrice);
    } else if (price.startsWith("+")) {
      minPrice = Number(price.replace("+", ""));
      query = query.gte("price", minPrice);
    }
  }

  // Search
  if (search && search.trim() !== "") {
    query = query.ilike("title", `%${search}%`);
  }

  return query;
}
