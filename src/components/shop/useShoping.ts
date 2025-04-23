import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getShop } from "../../services/apiShoping";

export function useShoping() {
  const { shopId } = useParams();

  const {
    isLoading,
    data: shoping = {},
    error,
  } = useQuery({
    queryKey: ["shop", shopId],
    queryFn: () => {
      if (!shopId) throw new Error("Shop ID is required");
      return getShop(Number(shopId));
    },
    retry: false,
    enabled: !!shopId,
  });

  return { isLoading, shoping, error };
}
