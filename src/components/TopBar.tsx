"use client";

import {
  ShoppingCart,
  User,
  Coffee,
  Info,
  Home,
  LogOut,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function TopBar() {
  const router = useRouter();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cookie = new Cookies();

  const handleLogout = async () => {
    cookie.remove("token", { path: "/" });
    cookie.remove("guest", { path: "/" });
    cookie.remove("guestId", { path: "/" });
    router.push("/login");
  };

  const hoverEffect =
    "hover:text-brown-900 transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brown-900 hover:after:w-full after:transition-all after:duration-300";

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-[#efebea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4 relative">
          {/* Left Menü */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brown-700 absolute left-0">
            <button
              onClick={() => router.push("/")}
              className={`flex items-center gap-1 ${hoverEffect}`}
            >
              <Home size={18} /> Ana Sayfa
            </button>
            <button
              onClick={() => router.push("/about")}
              className={`flex items-center gap-1 ${hoverEffect}`}
            >
              <Info size={18} /> Hakkımızda
            </button>
          </nav>

          {/* Logo Ortada */}
          <div
            className="text-2xl font-bold text-brown-900 cursor-pointer tracking-wide"
            onClick={() => router.push("/")}
          >
            ☕ Kahve Dükkanı
          </div>

          {/* Right Menü */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brown-700 absolute right-0">
            <button
              onClick={() => router.push("/products")}
              className={`flex items-center gap-1 ${hoverEffect}`}
            >
              <Coffee size={18} /> Kahveler
            </button>

            {/* Profil dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 ${hoverEffect}`}
              >
                <User size={18} /> Profil
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50">
                  <ul className="flex flex-col">
                    <li
                      onClick={() => {
                        router.push("/profile");
                        setDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <User size={18} /> Profilim
                    </li>
                    <li
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 text-red-500 cursor-pointer flex items-center gap-2"
                    >
                      <LogOut size={18} /> Çıkış Yap
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarToggle(true)}
              className={`flex items-center gap-1 ${hoverEffect}`}
            >
              <ShoppingCart size={18} /> Sepet
            </button>
          </nav>

          {/* Mobile Menü Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brown-700 absolute right-0"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <nav className="flex flex-col gap-2 p-4 text-sm font-medium text-brown-700">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <Home size={18} /> Ana Sayfa
            </button>
            <button
              onClick={() => router.push("/about")}
              className="flex items-center gap-2"
            >
              <Info size={18} /> Hakkımızda
            </button>
            <button
              onClick={() => router.push("/products")}
              className="flex items-center gap-2"
            >
              <Coffee size={18} /> Kahveler
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2"
            >
              <User size={18} /> Profil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500"
            >
              <LogOut size={18} /> Çıkış Yap
            </button>
            <button
              onClick={() => setSidebarToggle(true)}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Sepet
            </button>
          </nav>
        </div>
      )}

      {/* Sepet Sidebar */}
      <CartSidebar
        isOpen={sidebarToggle}
        onClose={() => setSidebarToggle(false)}
      />
    </header>
  );
}
