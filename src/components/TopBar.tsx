"use client"

import { ShoppingCart, User, Coffee, Info, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

export default function TopBar(){
    const router = useRouter();
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return(
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
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-1"
          >
            <User size={18} /> Profilim
          </button>
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
      
    )
    
}