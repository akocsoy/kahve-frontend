import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4">
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Anasayfa
          </Link>
          <Link href="/about" className="hover:underline">
            Hakkımızda
          </Link>
          <Link href="/contact" className="hover:underline">
            İletişim
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kahve Dünyası. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
