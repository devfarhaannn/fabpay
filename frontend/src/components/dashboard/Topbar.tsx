import { Bell, Menu, Search } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../hooks/useAuth";

interface TopbarProps {
  title: string;
}

export const Topbar = ({ title }: TopbarProps) => {
  const { toggleSidebar, toggleMobile } = useSidebar();
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        border-b border-slate-200
        bg-white/90 backdrop-blur-md
        px-4 py-4 sm:px-6 lg:px-8 lg:py-5
        transition-colors duration-300
        dark:border-slate-800 dark:bg-slate-900/90
      "
    >
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobile}
          className="
            flex rounded-xl border border-slate-300 p-2
            transition-all duration-300
            hover:bg-slate-100
            dark:border-slate-700 dark:hover:bg-slate-800
            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={20} className="text-slate-700 dark:text-slate-100" />
        </button>

        {/* Desktop collapse button */}
        <button
          onClick={toggleSidebar}
          className="
            hidden rounded-xl border border-slate-300 p-2
            transition-all duration-300
            hover:bg-slate-100
            dark:border-slate-700 dark:hover:bg-slate-800
            lg:flex
          "
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-slate-700 dark:text-slate-100" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl dark:text-slate-100">
            {title}
          </h1>
          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            {greeting} • {today}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search – desktop only */}
        <div
          className="
            hidden items-center rounded-xl border border-slate-300
            bg-white px-4 py-2
            dark:border-slate-700 dark:bg-slate-800
            lg:flex
          "
        >
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="
              ml-3 bg-transparent text-slate-900
              placeholder:text-slate-400 outline-none
              dark:text-slate-100
            "
          />
        </div>

        <button
          className="
            relative rounded-xl border border-slate-300 p-2.5 sm:p-3
            transition-all duration-300
            hover:bg-slate-100
            dark:border-slate-700 dark:hover:bg-slate-800
          "
        >
          <Bell size={20} className="text-slate-700 dark:text-slate-100" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div
          className="
            flex items-center gap-2 rounded-xl border border-slate-300
            bg-white px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2
            dark:border-slate-700 dark:bg-slate-800
          "
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white sm:h-10 sm:w-10">
            {user?.firstName?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="hidden lg:block">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {user ? `${user.firstName} ${user.lastName}` : "User"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};