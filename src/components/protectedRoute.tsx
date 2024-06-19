import { useUser } from "@/features/authentication/useUser";
import Spinner from "./ui/spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user from the supabase
  const { isLoading, isAuthenticated } = useUser();

  // 2. If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading the user, show a loading spinner
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-background">
        <Spinner />;
      </div>
    );
  }

  // 4. If the user is authenticated, return the children
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
