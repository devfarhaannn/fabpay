import {
    LayoutDashboard,
    ArrowRightLeft,
    History,
    User,
    Settings,
    LogOut,
    Wallet,
    ChevronLeft,
    ChevronRight,
    PlusCircle,
  } from "lucide-react";
  
  import { NavLink, useNavigate } from "react-router-dom";
  import { useAuth } from "../../hooks/useAuth";
  
  import { logout } from "../../services/auth.service";
  import { useSidebar } from "../../context/SidebarContext";
  import { ROUTES } from "../../constants/routes";
  import { APP_CONFIG } from "../../constants/config";
  import { Avatar } from "../ui/Avatar";
  
  interface MenuItem {
    title: string;
    icon: any;
    path: string;
    disabled?: boolean;
  }
  
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      title: "Transfer",
      icon: ArrowRightLeft,
      path: ROUTES.TRANSFER,
    },
    {
      title: "Add Money",
      icon: PlusCircle,
      path: ROUTES.ADD_MONEY,
    },
    {
      title: "Transactions",
      icon: History,
      path: ROUTES.TRANSACTIONS,
    },
    {
      title: "Profile",
      icon: User,
      path: ROUTES.PROFILE,
    },
    {
      title: "Settings",
      icon: Settings,
      path: ROUTES.SETTINGS,
    },
  ];
  
  export const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
  
    const {
      collapsed,
      toggleSidebar,
    } = useSidebar();
  
    const handleLogout = () => {
      logout();
      navigate(ROUTES.SIGNIN);
    };
  
    return (
      <aside
        className={`
          hidden
          lg:flex
          flex-col
  
          bg-white
          text-slate-900
  
          border-r
          border-slate-200
  
          dark:bg-slate-900
          dark:text-slate-100
          dark:border-slate-800
  
          transition-all
          duration-300
  
          ${collapsed ? "w-24" : "w-72"}
        `}
      >
        {/* Logo */}
  
        <div
          className="
            flex
            items-center
            justify-between
  
            border-b
            border-slate-200
  
            p-6
  
            dark:border-slate-800
          "
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-3">
                <Wallet size={24} />
              </div>
  
              <div>
                <h1 className="text-xl font-bold">
                  {APP_CONFIG.APP_NAME}
                </h1>
  
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Digital Wallet
                </p>
              </div>
            </div>
          )}
  
          {collapsed && (
            <div className="mx-auto rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-3">
              <Wallet size={24} />
            </div>
          )}
  
          <button
            onClick={toggleSidebar}
            className="
              rounded-lg
              p-2
  
              transition-colors
  
              hover:bg-slate-100
  
              dark:hover:bg-slate-800
            "
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
  
        {/* Navigation */}
  
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
  
              if (item.disabled) {
                return (
                  <li key={item.title}>
                    <div
                      className="
                        flex
                        cursor-not-allowed
                        items-center
                        gap-4
                        rounded-xl
                        px-4
                        py-3
  
                        text-slate-400
  
                        dark:text-slate-500
                      "
                    >
                      <Icon size={22} />
  
                      {!collapsed && (
                        <>
                          <span>{item.title}</span>
  
                          <span
                            className="
                              ml-auto
                              rounded
                              bg-slate-200
                              px-2
                              py-1
                              text-xs
                              text-slate-700
  
                              dark:bg-slate-800
                              dark:text-slate-300
                            "
                          >
                            Soon
                          </span>
                        </>
                      )}
                    </div>
                  </li>
                );
              }
  
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `
                        flex
                        items-center
                        gap-4
                        rounded-xl
                        px-4
                        py-3
  
                        transition-all
                        duration-300
  
                        ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        }
                      `
                    }
                  >
                    <Icon size={22} />
  
                    {!collapsed && (
                      <span>{item.title}</span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

              {/* User Section */}

      <div
        className="
          border-t
          border-slate-200
          p-4

          dark:border-slate-800
        "
      >
        {!collapsed && (
          <div className="mb-4 flex items-center gap-3">
            <Avatar
              name={
                user
                  ? `${user.firstName} ${user.lastName}`
                  : "User"
              }
              size={48}
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : "User"}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3

            rounded-xl

            bg-red-600
            py-3

            text-white

            transition-all
            duration-300

            hover:bg-red-700
            active:scale-[0.98]
          "
        >
          <LogOut size={20} />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};