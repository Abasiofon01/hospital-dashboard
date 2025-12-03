import { NavLink } from "react-router-dom";
import logo from "/images/logo.svg";

import {
  LayoutDashboard,
  Stethoscope,
  User,
  Settings,
  CreditCard,
  X,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    disabled: true,
    iconClass: "w-4 h-4",
  },
  {
    name: "Hospitals",
    icon: Stethoscope,
    path: "/hospitals",
    disabled: false,
    iconClass: "w-4 h-4",
  },
  {
    name: "Billing",
    icon: CreditCard,
    path: "/billing",
    disabled: true,
    iconClass: "w-4 h-4",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
    disabled: true,
    iconClass: "w-4 h-4",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
    disabled: true,
    iconClass: "w-4 h-4",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const baseClasses =
    "flex items-center gap-3 px-8 py-4 rounded text-base transition-colors duration-200";
  const disabledClasses =
    "text-gray-500 dark:text-gray-600 cursor-not-allowed hover:bg-transparent";
  const enabledClasses =
    "text-gray-200 hover:bg-gray-500 hover:text-white dark:text-[#807F7F] dark:hover:bg-[#2A2A2A] dark:hover:text-white";
  const activeClasses =
    "bg-gray-500 text-white dark:bg-[#2A2A2A] dark:text-white";

  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300 ease-in-out lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`shrink-0 fixed inset-y-0 left-0 z-50 w-[302px] shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 
                bg-gray-800 dark:bg-[#1F1F1F] ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
      >
        <div className="absolute right-0 top-0 flex pr-2 pt-4 sm:pr-4">
          <button
            onClick={onClose}
            className="rounded-md p-1 transition-colors border duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center mb-8 px-8 pt-13">
          <img src={logo} alt="logo" />
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <div
                  key={item.path}
                  className={`${baseClasses} ${disabledClasses}`}
                  title={`${item.name} is not available`}
                >
                  <Icon className={item.iconClass} />
                  {item.name}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `${baseClasses} ${isActive ? activeClasses : enabledClasses}`
                }
              >
                <Icon className={item.iconClass} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
