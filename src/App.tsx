import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./Routes";
import ScrollOnTop from "./ui/ScrollOnTop";

// SERVICE WORKER
import ServiceWorker from "./ui/ServiceWorker";
import Toast from "./ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <HeroUIProvider>
        <ServiceWorker />
        <BrowserRouter>
          <ScrollOnTop />

          {/* ROUTES */}
          <AppRoutes />
        </BrowserRouter>

        {/* TOAST */}
        <Toast />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
