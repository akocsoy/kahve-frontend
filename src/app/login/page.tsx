"use client";
import { Coffee } from "lucide-react"; // kahve ikonu
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { jwtDecode } from 'jwt-decode';
import Cookies from "universal-cookie"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const cookie = new Cookies()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await login({ email, password });

    if (!response.data) {
      throw new Error("Giriş başarısız");
    }

    const data = response.data;
    const token = data.access_token;

    // 🧠 Token'ı hem localStorage'a hem cookie'ye kaydet
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 1 hafta

    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expirationDate.getTime().toString());

    cookie.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 });

    // ✅ guest cookie’sini sil
    cookie.remove('guest', { path: '/' });

    // Rol kontrolü istersen
    const decoded = jwtDecode(token) as { role: string };
    console.log("Kullanıcı rolü:", decoded.role);

    router.push("/dashboard");
  } catch (error) {
    console.error("Giriş hatası:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <Coffee className="w-12 h-12 text-green-600" />
          <h1
            className="text-4xl text-green-700 mt-2"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            Kahve Dükkanı
          </h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-800"
            >
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-green-200 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-800"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-green-200 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Giriş Yap
          </button>
        </form>
        <p className="text-center text-sm text-green-700 mt-6">
          Hesabın yok mu?{" "}
          <a
            href="/register"
            className="text-green-900 font-semibold hover:underline"
          >
            Kayıt Ol
          </a>
        </p>
        <p className="text-center text-sm text-green-700 mt-6">
          <a
            href="/dashboard"
            className="text-green-900 font-semibold hover:underline"
          >
            Misafir olarak devam et
          </a>
        </p>
      </div>
    </div>
  );
}
