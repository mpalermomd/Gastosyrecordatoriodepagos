import { Factura } from '../App';
import { Check, Trash2, Calendar, Tag } from 'lucide-react';

interface FacturasListProps {
  facturas: Factura[];
  onMarcarPagada: (id: string) => void;
  onEliminar: (id: string) => void;
}

export function FacturasList({ facturas, onMarcarPagada, onEliminar }: FacturasListProps) {
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const esVencida = (fechaVencimiento: string, pagada: boolean) => {
    if (pagada) return false;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    return vencimiento < hoy;
  };

  const esPorVencer = (fechaVencimiento: string, pagada: boolean) => {
    if (pagada) return false;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diasDiferencia = (vencimiento.getTime() - hoy.getTime()) / (1000 * 3600 * 24);
    return diasDiferencia >= 0 && diasDiferencia <= 7;
  };

  const facturasPendientes = facturas.filter(f => !f.pagada);
  const facturasPagadas = facturas.filter(f => f.pagada);

  return (
    <div className="space-y-6">
      {/* Facturas Pendientes */}
      {facturasPendientes.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-slate-800 mb-4">Facturas Pendientes</h2>
          <div className="space-y-3">
            {facturasPendientes.map(factura => (
              <div
                key={factura.id}
                className={`border rounded-lg p-4 transition-all ${
                  esVencida(factura.fechaVencimiento, factura.pagada)
                    ? 'border-red-300 bg-red-50'
                    : esPorVencer(factura.fechaVencimiento, factura.pagada)
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-slate-800 mb-2">{factura.nombre}</h3>
                    
                    <div className="flex flex-wrap gap-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{factura.categoria}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatearFecha(factura.fechaVencimiento)}</span>
                      </div>
                    </div>

                    {esVencida(factura.fechaVencimiento, factura.pagada) && (
                      <p className="text-red-600 mt-2">¡Factura vencida!</p>
                    )}
                    {esPorVencer(factura.fechaVencimiento, factura.pagada) && (
                      <p className="text-yellow-600 mt-2">Vence pronto</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <p className="text-slate-800">${factura.monto.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onMarcarPagada(factura.id)}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                        title="Marcar como pagada"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onEliminar(factura.id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facturas Pagadas */}
      {facturasPagadas.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-slate-800 mb-4">Facturas Pagadas</h2>
          <div className="space-y-3">
            {facturasPagadas.map(factura => (
              <div
                key={factura.id}
                className="border border-green-200 bg-green-50 rounded-lg p-4 opacity-75"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-slate-700 mb-2 line-through">{factura.nombre}</h3>
                    
                    <div className="flex flex-wrap gap-3 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{factura.categoria}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatearFecha(factura.fechaVencimiento)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <p className="text-slate-700 line-through">${factura.monto.toFixed(2)}</p>
                    <button
                      onClick={() => onEliminar(factura.id)}
                      className="bg-slate-400 text-white p-2 rounded-lg hover:bg-slate-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {facturas.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-slate-500">No hay facturas registradas. ¡Agrega tu primera factura!</p>
        </div>
      )}
    </div>
  );
}
