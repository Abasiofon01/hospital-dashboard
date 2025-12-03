import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

interface HeaderProps {
  pageTitle?: string;
  onMenuClick: () => void;
}

const Header = ({ pageTitle, onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-10 px-5 sm:px-7 lg:px-10 pt-12.5 pb-6 flex justify-between items-center bg-white shadow dark:bg-[#111111] dark:shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg bg-white border border-gray-200 text-gray-700 shadow dark:bg-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-[#3A3A3A] dark:border-[#2a2a2a] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {pageTitle || ""}
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-white text-gray-700 border border-gray-200 shadow dark:bg-[#111111] dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-[#3A3A3A] transition-colors dark:border-[#2A2A2A]"
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Header;
