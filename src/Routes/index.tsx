import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// LAZY-LOADING PAGES
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/signUp"));
const Landing = lazy(() => import("../pages/landing"));
const Product = lazy(() => import("../pages/ProductPage"));
const Shop = lazy(() => import("../pages/Shopping"));

// COMPONENTS
import Account from "../components/account/Account";
import Address from "../components/account/Address";
import Orders from "../components/account/Orders";
import WishList from "../components/account/WishList";
import Cart from "../components/cartPage";
import Dashboard from "../components/cartPage/Dashboard";

import AppLayout from "../ui/AppLayout";
import { Loading } from "../ui/Loading";
import PageNotFound from "../ui/PageNotFound";
import ProtectedRoute from "../ui/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="landing"
          element={
            <Suspense fallback={<Loading />}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="product/:shopId"
          element={
            <Suspense fallback={<Loading />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path="shop"
          element={
            <Suspense fallback={<Loading />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="cart/:shopId"
          element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          }
        />

        <Route path="account" element={<Account />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="address" element={<Address />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<WishList />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="signUp"
        element={
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
