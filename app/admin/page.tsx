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
      imagen:
        "https://images.unsplash.com/photo-1501474587451-40f1e29a4223?q=80&w=400",
    },
    {
      id: 2,
      nombre: "Papas Fritas Lays",
      descripcion: "Papas fritas sabor original 150g",
      precio: 1.49,
      stock: 35,
      calidad: "High",
      categoria: "Snacks",
      imagen:
        "https://images.unsplash.com/photo-1582550945154-66ea8fff25e1?q=80&w=400",
    },
  ]);

  // -------------------------
  // ESTADOS DE MODALES
  // -------------------------

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [productoActual, setProductoActual] = useState<Producto | null>(null);

  const abrirCrear = () => {
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
    setModalCrear(true);
  };

  const abrirEditar = (producto: Producto) => {
    setProductoActual(producto);
    setModalEditar(true);
  };

  const abrirEliminar = (producto: Producto) => {
    setProductoActual(producto);
    setModalEliminar(true);
  };

  // -------------------------
  // FUNCIONES CRUD
  // -------------------------

  const crearProducto = () => {
    if (!productoActual) return;

    setProductos([
      ...productos,
      { ...productoActual, id: Date.now() },
    ]);

    setModalCrear(false);
  };

  const actualizarProducto = () => {
    if (!productoActual) return;

    setProductos(
      productos.map((p) =>
        p.id === productoActual.id ? productoActual : p
      )
    );

    setModalEditar(false);
  };

  const eliminarProducto = () => {
    if (!productoActual) return;

    setProductos(productos.filter((p) => p.id !== productoActual.id));

    setModalEliminar(false);
  };

  // -------------------------
  // RENDER DEL PAGE
  // -------------------------

  return (
    <div className="w-full flex flex-col gap-4 px-3 md:px-0">

      {/* TÍTULO */}
      <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
        Gestión de Productos
      </h2>

      {/* BOTÓN NUEVO PRODUCTO */}
      <div className="flex justify-center md:justify-start">
        <button
          onClick={abrirCrear}
          className="flex gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 text-sm md:text-base"
        >
          <span className="text-lg font-bold">+</span>
          Nuevo Producto
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] md:min-w-0">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Calidad</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={p.imagen}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm md:text-base">{p.nombre}</p>
                      <p className="text-gray-500 text-xs md:text-sm">{p.descripcion}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm md:text-base">
                    ${p.precio.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-sm md:text-base">
                    {p.stock}
                  </td>

                  <td className="px-4 py-3 text-sm md:text-base">
                    {p.calidad}
                  </td>

                  <td className="px-4 py-3 text-sm md:text-base">
                    {p.categoria}
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-4 text-lg">
                    <button
                      onClick={() => abrirEditar(p)}
                      className="text-blue-600"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => abrirEliminar(p)}
                      className="text-red-600"
                    >
                      🗑️
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>


      {/* ------------------------- */}
      {/* MODAL CREAR PRODUCTO */}
      {/* ------------------------- */}
      {modalCrear && productoActual && (
        <Modal title="Nuevo Producto" close={() => setModalCrear(false)}>

          <FormularioProducto
            producto={productoActual}
            setProducto={setProductoActual}
          />

          <AccionesModal
            cancelar={() => setModalCrear(false)}
            confirmar={crearProducto}
            texto="Crear"
          />

        </Modal>
      )}

      {/* ------------------------- */}
      {/* MODAL EDITAR PRODUCTO */}
      {/* ------------------------- */}
      {modalEditar && productoActual && (
        <Modal title="Editar Producto" close={() => setModalEditar(false)}>

          <FormularioProducto
            producto={productoActual}
            setProducto={setProductoActual}
          />

          <AccionesModal
            cancelar={() => setModalEditar(false)}
            confirmar={actualizarProducto}
            texto="Actualizar"
          />

        </Modal>
      )}

      {/* ------------------------- */}
      {/* MODAL ELIMINAR PRODUCTO */}
      {/* ------------------------- */}
      {modalEliminar && productoActual && (
        <Modal title="Eliminar Producto" close={() => setModalEliminar(false)}>

          <p className="text-center text-gray-700 mb-6">
            ¿Estás seguro de eliminar <strong>{productoActual.nombre}</strong>?  
          </p>

          <AccionesModal
            cancelar={() => setModalEliminar(false)}
            confirmar={eliminarProducto}
            texto="Eliminar"
            peligro
          />

        </Modal>
      )}

    </div>
  );
}

// ---------------------------------------------------
// COMPONENTE MODAL
// ---------------------------------------------------

function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-[500px] rounded-xl shadow-xl p-6 relative">

        <button
          onClick={close}
          className="absolute right-4 top-4 text-xl"
        >
          ×
        </button>

        <h3 className="text-xl font-semibold mb-5">{title}</h3>

        {children}

      </div>
    </div>
  );
}

// ---------------------------------------------------
// FORMULARIO DE PRODUCTO
// ---------------------------------------------------

function FormularioProducto({
  producto,
  setProducto,
}: {
  producto: Producto;
  setProducto: (p: Producto) => void;
}) {
  return (
    <div className="flex flex-col gap-3">

      {/* Nombre y precio */}
      <div className="flex gap-4">
        <input
          className="w-1/2 border rounded-lg px-3 py-2"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        />

        <input
          className="w-1/2 border rounded-lg px-3 py-2"
          placeholder="Precio ($)"
          type="number"
          value={producto.precio}
          onChange={(e) =>
            setProducto({ ...producto, precio: parseFloat(e.target.value) })
          }
        />
      </div>

      {/* Descripción */}
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={(e) =>
          setProducto({ ...producto, descripcion: e.target.value })
        }
      />

      {/* Stock / calidad / categoría */}
      <div className="flex gap-4">
        <input
          className="w-1/3 border rounded-lg px-3 py-2"
          placeholder="Stock"
          type="number"
          value={producto.stock}
          onChange={(e) =>
            setProducto({ ...producto, stock: parseInt(e.target.value) })
          }
        />

        <select
          className="w-1/3 border rounded-lg px-3 py-2"
          value={producto.calidad}
          onChange={(e) =>
            setProducto({ ...producto, calidad: e.target.value })
          }
        >
          <option>Estándar</option>
          <option>High</option>
          <option>Premium</option>
        </select>

        <select
          className="w-1/3 border rounded-lg px-3 py-2"
          value={producto.categoria}
          onChange={(e) =>
            setProducto({ ...producto, categoria: e.target.value })
          }
        >
          <option>Abarrotes</option>
          <option>Bebidas</option>
          <option>Snacks</option>
          <option>Lácteos</option>
        </select>
      </div>

      {/* URL Imagen */}
      <input
        className="border rounded-lg px-3 py-2"
        placeholder="URL de Imagen"
        value={producto.imagen}
        onChange={(e) =>
          setProducto({ ...producto, imagen: e.target.value })
        }
      />
    </div>
  );
}

// ---------------------------------------------------
// BOTONES INFERIORES DEL MODAL
// ---------------------------------------------------

function AccionesModal({
  cancelar,
  confirmar,
  texto,
  peligro = false,
}: {
  cancelar: () => void;
  confirmar: () => void;
  texto: string;
  peligro?: boolean;
}) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={cancelar}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Cancelar
      </button>

      <button
        onClick={confirmar}
        className={`px-4 py-2 rounded-lg text-white ${
          peligro ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-gray-900"
        }`}
      >
        {texto}
      </button>
    </div>
  );
}
