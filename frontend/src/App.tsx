import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthProvider } from "./context/AuthContext";
import { BalanceProvider } from "./context/BalanceContext";

import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Transfer } from "./pages/Transfer";
import { Transactions } from "./pages/Transactions";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { AddMoney } from "./pages/AddMoney";

import { ProtectedRoute } from "./components/common/ProtectedRout";
import { ProtectedLayout } from "./components/common/ProtectedLayout";

import { ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BalanceProvider>
          <SidebarProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#18181B",
                  color: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #27272A",
                },
              }}
            />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route element={<ProtectedLayout />}>
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.TRANSFER}
                  element={
                    <ProtectedRoute>
                      <Transfer />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.ADD_MONEY}
                  element={
                    <ProtectedRoute>
                      <AddMoney />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.TRANSACTIONS}
                  element={
                    <ProtectedRoute>
                      <Transactions />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.SETTINGS}
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Unknown Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SidebarProvider>
        </BalanceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;