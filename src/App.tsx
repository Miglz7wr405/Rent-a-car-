import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { AdminShell } from "./components/admin/AdminShell";
import { isAuthenticated } from "./lib/auth";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import BookingConfirmation from "./pages/BookingConfirmation";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminVehicles from "./pages/admin/Vehicles";
import VehicleEdit from "./pages/admin/VehicleEdit";
import VehicleNew from "./pages/admin/VehicleNew";
import AdminBookings from "./pages/admin/Bookings";
import AdminSettings from "./pages/admin/Settings";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

function AdminGuard() {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/viaturas" element={<Catalog />} />
        <Route path="/viaturas/:slug" element={<VehicleDetail />} />
        <Route path="/contactos" element={<Contact />} />
        <Route path="/reservas/:reference" element={<BookingConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminGuard />}>
        <Route index element={<Dashboard />} />
        <Route path="viaturas" element={<AdminVehicles />} />
        <Route path="viaturas/novo" element={<VehicleNew />} />
        <Route path="viaturas/:id" element={<VehicleEdit />} />
        <Route path="reservas" element={<AdminBookings />} />
        <Route path="definicoes" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
