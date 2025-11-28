import "./globals.css";
import BottomNav from "./components/BottomNav";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Tienda Portu",
  description: "Tienda responsive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <UserProvider>
          <CartProvider>
            <div className="min-h-screen">
              {children}
              <BottomNav />
            </div>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
