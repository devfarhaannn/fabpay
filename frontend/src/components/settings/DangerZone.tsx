import {
  LogOut,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout } from "../../services/auth.service";
import { ROUTES } from "../../constants/routes";

export const DangerZone = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate(ROUTES.SIGNIN);
  };

  const handleDelete = () => {
    toast("Delete account feature coming soon.");
  };

  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-lg transition-colors duration-300 dark:border-red-900/40 dark:bg-red-950/20">
      <h2 className="mb-6 text-2xl font-bold text-red-600 dark:text-red-400">
        Danger Zone
      </h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <button
          onClick={handleLogout}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition-colors duration-300 hover:bg-red-700"
        >
          <LogOut size={18} />

          Logout
        </button>

        <button
          onClick={handleDelete}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-600 py-3 font-semibold text-red-600 transition-colors duration-300 hover:bg-red-100 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash2 size={18} />

          Delete Account
        </button>
      </div>
    </div>
  );
};