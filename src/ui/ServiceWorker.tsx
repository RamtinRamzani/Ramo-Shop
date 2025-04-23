import { useEffect } from "react";

function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        } catch (error) {
          console.log("Service Worker registration failed:", error);
        }
      };

      window.addEventListener("load", registerServiceWorker);

      return () => {
        window.removeEventListener("load", registerServiceWorker);
      };
    }
  }, []);

  return null;
}

export default ServiceWorker;
