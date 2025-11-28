export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'order-17',
      date: '2025-11-21',
      products: ['Coca Cola 2L', 'Papas Lays Original', 'y 2 producto(s) más'],
      total: 9.98,
      status: 'pendiente'
    },
    {
      id: 'ORD-001',
      date: '2025-11-20',
      products: ['Leche pil', 'Galletas'],
      total: 15.00,
      status: 'entregado'
    },
    {
      id: 'ORD-002',
      date: '2025-11-25',
      products: ['Pipocas', 'Refresco cocacola'],
      total: 20.50,
      status: 'pendiente'
    },
    {
      id: 'ORD-003',
      date: '2025-11-15',
      products: ['Arroz', 'Canela'],
      total: 10.00,
      status: 'entregado'
    },
    {
      id: 'ORD-004',
      date: '2025-11-10',
      products: ['Mayonesa', 'Mostaza', 'Ketchup'],
      total: 12.00,
      status: 'cancelado'
    }
  ]);
