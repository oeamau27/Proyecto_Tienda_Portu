// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAV SUPERIOR */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Tienda de Barrio "Portu" - Admin</h1>
        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Administrador
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}
