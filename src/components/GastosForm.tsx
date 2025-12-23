import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface GastosFormProps {
  onAgregarFactura: (factura: {
    nombre: string;
    monto: number;
    categoria: string;
    fechaVencimiento: string;
  }) => void;
}

const CATEGORIAS = [
  'Servicios',
  'Alimentación',
  'Transporte',
  'Salud',
  'Educación',
  'Entretenimiento',
  'Otros'
];

export function GastosForm({ onAgregarFactura }: GastosFormProps) {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !monto || !fechaVencimiento) {
      alert('Por favor completa todos los campos');
      return;
    }

    onAgregarFactura({
      nombre,
      monto: parseFloat(monto),
      categoria,
      fechaVencimiento,
    });

    // Limpiar formulario
    setNombre('');
    setMonto('');
    setCategoria(CATEGORIAS[0]);
    setFechaVencimiento('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-indigo-600" />
        Agregar Factura
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-slate-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Luz, Agua, Supermercado"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="monto" className="block text-slate-700 mb-1">
            Monto
          </label>
          <input
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-slate-700 mb-1">
            Categoría
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fechaVencimiento" className="block text-slate-700 mb-1">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            id="fechaVencimiento"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Agregar Factura
        </button>
      </form>
    </div>
  );
}
