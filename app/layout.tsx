// app/layout.tsx
import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "Tienda Portu",
  description: "Tienda responsive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <div className="min-h-screen w-full bg-white">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
