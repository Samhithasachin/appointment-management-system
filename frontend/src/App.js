import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AppointmentEditPage from "./pages/AppointmentEditPage";
import NavBar from "./components/NavBar";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}


export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/appointments" /> : <LoginPage />} />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppointmentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <PrivateRoute>
              <AppointmentEditPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
