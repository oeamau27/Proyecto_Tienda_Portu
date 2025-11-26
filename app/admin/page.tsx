"use client";

import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  calidad: string;
  categoria: string;
  imagen: string;
}

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Coca-Cola 2L",
      descripcion: "Gaseosa Coca-Cola 2 litros",
      precio: 2.99,
      stock: 24,
      calidad: "Premium",
      categoria: "Bebidas",
      imagen: "https://images.unsplash.com/photo-1501474587451-40f1e29a4223",
    },
    {
      id: 2,
      nombre: "Papas Fritas Lays",
      descripcion: "Papas fritas sabor original 150g",
      precio: 1.49,
      stock: 35,
      calidad: "High",
      categoria: "Snacks",
      imagen: "https://images.unsplash.com/photo-1582550945154-66ea8fff25e1",
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modo, setModo] = useState<"crear" | "editar">("crear");
  const [productoActual, setProductoActual] = useState<Producto | null>(null);

  const abrirCrear = () => {
    setModo("crear");
    setProductoActual({
      id: 0,
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      calidad: "Estándar",
      categoria: "Abarrotes",
      imagen: "",
    });
    setModalAbierto(true);
  };

  const abrirEditar = (producto: Producto) => {
    setModo("editar");
    setProductoActual(producto);
    setModalAbierto(true);
  };

  const guardarProducto = () => {
    if (!productoActual) return;

    if (modo === "crear") {
      setProductos([
        ...productos,
        { ...productoActual, id: Date.now() },
      ]);
    } else {
      setProductos(
        productos.map((p) =>
          p.id === productoActual.id ? productoActual : p
        )
      );
    }

    setModalAbierto(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Gestión de Productos</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={abrirCrear}
          className="flex gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          <span className="font-bold text-lg">+</span> Nuevo Producto
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Calidad</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 flex items-center gap-3">
                  {/* img en lugar de Image */}
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold">{p.nombre}</p>
                    <p className="text-gray-500 text-sm">{p.descripcion}</p>
                  </div>
                </td>

                <td className="px-4 py-3">${p.precio.toFixed(2)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.calidad}</td>
                <td className="px-4 py-3">{p.categoria}</td>

                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => abrirEditar(p)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() =>
                        setProductos(productos.filter((x) => x.id !== p.id))
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalAbierto && productoActual && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-xl shadow-xl p-6 relative">

            <button
              onClick={() => setModalAbierto(false)}
              className="absolute right-4 top-4 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {modo === "crear" ? "Nuevo Producto" : "Editar Producto"}
            </h3>

            <div className="flex flex-col gap-3">

              <div className="flex gap-4">
                <input
                  className="w-1/2 border rounded-lg px-3 py-2"
                  placeholder="Nombre"
                  value={productoActual.nombre}
                  onChange={(e) =>
                    setProductoActual({ ...productoActual, nombre: e.target.value })
                  }
                />

                <input
                  className="w-1/2 border rounded-lg px-3 py-2"
                  placeholder="Precio ($)"
                  type="number"
                  value={productoActual.precio}
                  onChange={(e) =>
                    setProductoActual({
                      ...productoActual,
                      precio: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Descripción"
                value={productoActual.descripcion}
                onChange={(e) =>
                  setProductoActual({
                    ...productoActual,
                    descripcion: e.target.value,
                  })
                }
              />

              <div className="flex gap-4">
                <input
                  className="w-1/3 border rounded-lg px-3 py-2"
                  placeholder="Stock"
                  type="number"
                  value={productoActual.stock}
                  onChange={(e) =>
                    setProductoActual({
                      ...productoActual,
                      stock: parseInt(e.target.value),
                    })
                  }
                />

                <select
                  className="w-1/3 border rounded-lg px-3 py-2"
                  value={productoActual.calidad}
                  onChange={(e) =>
                    setProductoActual({
                      ...productoActual,
                      calidad: e.target.value,
                    })
                  }
                >
                  <option>Estándar</option>
                  <option>High</option>
                  <option>Premium</option>
                </select>

                <select
                  className="w-1/3 border rounded-lg px-3 py-2"
                  value={productoActual.categoria}
                  onChange={(e) =>
                    setProductoActual({
                      ...productoActual,
                      categoria: e.target.value,
                    })
                  }
                >
                  <option>Abarrotes</option>
                  <option>Bebidas</option>
                  <option>Snacks</option>
                  <option>Lácteos</option>
                </select>
              </div>

              <input
                className="border rounded-lg px-3 py-2"
                placeholder="URL de Imagen"
                value={productoActual.imagen}
                onChange={(e) =>
                  setProductoActual({
                    ...productoActual,
                    imagen: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={guardarProducto}
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
                >
                  {modo === "crear" ? "Crear" : "Actualizar"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
