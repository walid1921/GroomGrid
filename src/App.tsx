import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/login";
import Account from "./pages/account";
import Settings from "./pages/settings";
import Users from "./pages/users";
import Services from "./pages/services";
import Bookings from "./pages/bookings";
import AppLayout from "./components/appLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
