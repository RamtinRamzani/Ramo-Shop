import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  shopId: string;
  title: string;
  unitPrice: number;
  image?: string;
  images?: string[] | string;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const existingItem = state.wishlist.find(
        (item) => item.shopId === action.payload.shopId
      );
      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.wishlist = state.wishlist.filter(
        (item) => item.shopId !== action.payload
      );
    },
    clearWishlist(state) {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

export const getWishlist = (state: {
  wishlist: WishlistState;
}): WishlistItem[] => state.wishlist.wishlist;
