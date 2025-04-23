import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  shopId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  title: string;
  image?: string;
  images?: string[] | string;
}

interface ShippingOption {
  id: number;
  name: string;
  cost: number;
  estimatedDelivery: string;
}

interface Order {
  code: string;
  date: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  estimatedDelivery: string;
  items: CartItem[];
}

interface CartState {
  cart: CartItem[];
  shippingOption: ShippingOption | null;
  orders: Order[];
  isOrderSaved: boolean; // New flag to prevent duplicate saves
}

const initialState: CartState = {
  cart: [],
  shippingOption: {
    id: 1,
    name: "Standard Shipping",
    cost: 0,
    estimatedDelivery: "3-5 business days",
  },
  orders: [],
  isOrderSaved: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cart.find(
        (item) => item.shopId === action.payload.shopId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.shopId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.shopId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.shopId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        if (item.quantity === 0) {
          state.cart = state.cart.filter(
            (cartItem) => cartItem.shopId !== action.payload
          );
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      state.shippingOption = initialState.shippingOption;
      state.isOrderSaved = false;
    },
    setShippingOption(state, action: PayloadAction<ShippingOption>) {
      state.shippingOption = action.payload;
    },
    saveOrder(state) {
      if (state.cart.length === 0 || state.isOrderSaved) return; // Prevent duplicate saves
      const subtotal = state.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      const shippingCost = state.shippingOption?.cost || 0;
      const total = subtotal + shippingCost;

      const order: Order = {
        code: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        subtotal,
        shippingCost,
        total,
        paymentMethod: "Credit Card (****4242)",
        shippingMethod: state.shippingOption?.name || "Standard Shipping",
        estimatedDelivery:
          state.shippingOption?.estimatedDelivery ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ),
        items: [...state.cart],
      };
      state.orders.push(order);
      state.isOrderSaved = true; // Mark as saved
    },
    resetOrderSaved(state) {
      state.isOrderSaved = false;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  setShippingOption,
  saveOrder,
  resetOrderSaved,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: { cart: CartState }): CartItem[] =>
  state.cart.cart;
export const getShippingOption = (state: {
  cart: CartState;
}): ShippingOption | null => state.cart.shippingOption;
export const getOrders = (state: { cart: CartState }): Order[] =>
  state.cart.orders;
export const getTotalCartQuantity = (state: { cart: CartState }): number =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state: { cart: CartState }): number =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById =
  (id: string) =>
  (state: { cart: CartState }): number =>
    state.cart.cart.find((item) => item.shopId === id)?.quantity ?? 0;
