import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";

export const ProtectedLayout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
};