import { Factura } from '../App';
import { Check, Trash2, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface FacturasListProps {
  facturas: Factura[];
  credito1: number;
  credito2: number;
  onMarcarPagada: (id: string, numeroCuenta: 1 | 2) => void;
  onEliminar: (id: string) => void;
}

export function FacturasList({ facturas, credito1, credito2, onMarcarPagada, onEliminar }: FacturasListProps) {
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  
  const handleClickPagar = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setDialogoAbierto(true);
  };

  const handlePagar = (numeroCuenta: 1 | 2) => {
    if (facturaSeleccionada) {
      onMarcarPagada(facturaSeleccionada.id, numeroCuenta);
      setDialogoAbierto(false);
      setFacturaSeleccionada(null);
    }
  };
  
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
                        onClick={() => handleClickPagar(factura)}
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

      {/* Dialogo de Pago */}
      <AlertDialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Seleccionar Cuenta de Pago</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Factura: <span className="font-semibold">{facturaSeleccionada?.nombre}</span>
              </p>
              <p>
                Monto a pagar: <span className="font-semibold text-green-600">${facturaSeleccionada?.monto.toFixed(2)}</span>
              </p>
              <div className="space-y-2 mt-4">
                <p className="text-slate-700">Selecciona desde qué cuenta deseas pagar:</p>
                <div className="flex gap-3">
                  <div className={`flex-1 p-3 rounded-lg border-2 ${
                    credito1 >= (facturaSeleccionada?.monto || 0)
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}>
                    <p className="text-slate-600">Marian</p>
                    <p className={`${
                      credito1 >= (facturaSeleccionada?.monto || 0)
                        ? 'text-blue-700'
                        : 'text-red-600'
                    }`}>
                      ${credito1.toFixed(2)}
                    </p>
                  </div>
                  <div className={`flex-1 p-3 rounded-lg border-2 ${
                    credito2 >= (facturaSeleccionada?.monto || 0)
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}>
                    <p className="text-slate-600">Mica</p>
                    <p className={`${
                      credito2 >= (facturaSeleccionada?.monto || 0)
                        ? 'text-purple-700'
                        : 'text-red-600'
                    }`}>
                      ${credito2.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={() => setDialogoAbierto(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handlePagar(1)} 
              disabled={credito1 < (facturaSeleccionada?.monto || 0)}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Pagar con Marian
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={() => handlePagar(2)} 
              disabled={credito2 < (facturaSeleccionada?.monto || 0)}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Pagar con Mica
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}