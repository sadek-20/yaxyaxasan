import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Receipt,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  DollarSign,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/transactions", icon: Receipt, label: "Transactions" },
  { path: "/settings", icon: SettingsIcon, label: "Settings" },
];

function Layout({ onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="bg-white shadow-lg">
          <div className="flex h-16 items-center justify-center px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                ExpenseTracker
              </span>
            </div>
          </div>

          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              ExpenseTracker
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-gray-200 px-4 py-2"
        >
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors duration-200 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="p-4 md:p-8">
          {/* Render nested route content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
