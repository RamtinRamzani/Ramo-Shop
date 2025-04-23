import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { Suspense } from "react";
import { Loading } from "./Loading";

export default function AppLayout() {
  return (
    <div>
      <Header />

      <Suspense fallback={<Loading />}>
        <main className="mb-16">
          <Outlet />
        </main>
      </Suspense>

      <Footer />
    </div>
  );
}
