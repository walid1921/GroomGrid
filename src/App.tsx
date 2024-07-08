import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/login";
import Account from "./pages/account";
import Settings from "./pages/settings";
import Services from "./pages/services";
import Clients from "./pages/clients";
import Bookings from "./pages/bookings";
import AppLayout from "./components/appLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";
import Booking from "./pages/booking";
import CheckedIn from "./pages/checkedIn";
import Client from "./pages/client";
import ProtectedRoute from "./components/protectedRoute"; // this is a custom component to protect routes from unauthenticated users
import Hero from "./pages/hero";
import { AnimatePresence } from "framer-motion";
import Features from "./pages/features";
import CreateBooking from "./pages/createBooking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="bookings/createBooking" element={<CreateBooking />} />
          <Route path="checkin/:bookingId" element={<CheckedIn />} />
          <Route path="services" element={<Services />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:clientId" element={<Client />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="hero" element={<Hero />} />
        <Route path="features" element={<Features />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "14px",
              maxWidth: "400px",
              padding: "14px 20px",
              backgroundColor: "#ffffff",
              color: "#898989",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
