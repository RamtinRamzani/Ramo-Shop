import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import { Loading } from "./Loading";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the aithenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. if there is no authenticated user ,redirect to login pages
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );

  // 3. While loading, show a Spinner
  if (isPending)
    return (
      <div className="flex justify-center items-center h-[100vh] bg-[#f9fafb]">
        <Loading />
      </div>
    );

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
