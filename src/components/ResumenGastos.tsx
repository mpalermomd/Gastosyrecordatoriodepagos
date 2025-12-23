import { Factura } from '../App';
import { AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

interface ResumenGastosProps {
  facturas: Factura[];
}

export function ResumenGastos({ facturas }: ResumenGastosProps) {
  const totalPendiente = facturas
    .filter(f => !f.pagada)
    .reduce((sum, f) => sum + f.monto, 0);

  const totalPagado = facturas
    .filter(f => f.pagada)
    .reduce((sum, f) => sum + f.monto, 0);

  const facturasVencidas = facturas.filter(f => {
    if (f.pagada) return false;
    const hoy = new Date();
    const vencimiento = new Date(f.fechaVencimiento);
    return vencimiento < hoy;
  }).length;

  const facturasPorVencer = facturas.filter(f => {
    if (f.pagada) return false;
    const hoy = new Date();
    const vencimiento = new Date(f.fechaVencimiento);
    const diasDiferencia = (vencimiento.getTime() - hoy.getTime()) / (1000 * 3600 * 24);
    return diasDiferencia >= 0 && diasDiferencia <= 7;
  }).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-slate-800 mb-4">Resumen</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Total por Pagar</span>
            <DollarSign className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-red-700">${totalPendiente.toFixed(2)}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Total Pagado</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-green-700">${totalPagado.toFixed(2)}</p>
        </div>

        {facturasVencidas > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Facturas Vencidas</span>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-orange-700">{facturasVencidas} factura{facturasVencidas !== 1 ? 's' : ''}</p>
          </div>
        )}

        {facturasPorVencer > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Por Vencer (7 días)</span>
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-yellow-700">{facturasPorVencer} factura{facturasPorVencer !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}
