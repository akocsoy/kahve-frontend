"use client";

import { ShoppingCart, User, Coffee, Info, Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";
import { useState } from "react";
import { toast } from "sonner";

export default function TopBar() {
  const router = useRouter();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Cookie'yi temizle
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success("Başarıyla çıkış yapıldı!"); // Toast göster
    router.push("/login"); // Login sayfasına yönlendir
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Kahve Dükkanı</h1>
      <nav className="flex gap-6 text-sm font-medium">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1"
        >
          <Home size={18} /> Ana Sayfa
        </button>
        <button
          onClick={() => router.push("/about")}
          className="flex items-center gap-1"
        >
          <Info size={18} /> Hakkımızda
        </button>
        <button
          onClick={() => router.push("/products")}
          className="flex items-center gap-1"
        >
          <Coffee size={18} /> Kahveler
        </button>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1"
        >
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 p-2"
            >
              <User size={20} />
              Profilim
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                <ul className="flex flex-col">
                  <li
                    onClick={() => {
                      router.push("/profile");
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <User size={18} /> Profilim
                  </li>
                  <li
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    <LogOut size={18} /> Çıkış Yap
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setSidebarToggle(true)}
          className="flex items-center gap-1"
        >
          <ShoppingCart size={18} /> Sepet
        </button>
      </nav>
      <CartSidebar
        isOpen={sidebarToggle}
        onClose={() => setSidebarToggle(false)}
      />
    </div>
  );
}
