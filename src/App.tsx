import { useState, useEffect } from "react";
import { GastosForm } from "./components/GastosForm";
import { FacturasList } from "./components/FacturasList";
import { ResumenGastos } from "./components/ResumenGastos";
import { CreditoManager } from "./components/CreditoManager";
// Cambia esta línea para usar almacenamiento local en GitHub Pages:
// import * as api from './lib/storage-local';
// O usa la versión con backend para Figma Make:
import * as api from "./lib/supabase";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

export interface Factura {
  id: string;
  nombre: string;
  monto: number;
  categoria: string;
  fechaVencimiento: string;
  pagada: boolean;
  fechaCreacion: string;
}

export default function App() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [credito1, setCredito1] = useState(0);
  const [credito2, setCredito2] = useState(0);
  const [cargando, setCargando] = useState(true);

  // Cargar facturas y créditos al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [facturasObtenidas, creditosObtenidos] = await Promise.all([
        api.obtenerFacturas(),
        api.obtenerCreditos()
      ]);
      setFacturas(facturasObtenidas);
      setCredito1(creditosObtenidos.credito1);
      setCredito2(creditosObtenidos.credito2);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error("Error al cargar los datos");
    } finally {
      setCargando(false);
    }
  };

  const cargarFacturas = async () => {
    try {
      const facturasObtenidas = await api.obtenerFacturas();
      setFacturas(facturasObtenidas);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
      toast.error("Error al cargar las facturas");
    }
  };

  const agregarFactura = async (
    factura: Omit<Factura, "id" | "fechaCreacion" | "pagada">,
  ) => {
    try {
      await api.agregarFactura(factura);
      toast.success("Factura agregada correctamente");
      await cargarFacturas();
    } catch (error) {
      console.error("Error al agregar factura:", error);
      toast.error("Error al agregar la factura");
    }
  };

  const marcarComoPagada = async (id: string, numeroCuenta: 1 | 2) => {
    try {
      // Buscar la factura
      const factura = facturas.find(f => f.id === id);
      if (!factura) {
        toast.error("Factura no encontrada");
        return;
      }

      const creditoActual = numeroCuenta === 1 ? credito1 : credito2;
      const nombreCuenta = numeroCuenta === 1 ? 'Marian' : 'Mica';

      // Verificar si hay suficiente crédito
      if (creditoActual < factura.monto) {
        toast.error(`Crédito insuficiente en ${nombreCuenta}. Necesitas $${factura.monto.toFixed(2)} pero solo tienes $${creditoActual.toFixed(2)}`);
        return;
      }

      // Descontar del crédito y marcar como pagada
      const nuevoCredito = creditoActual - factura.monto;
      await Promise.all([
        api.actualizarFactura(id, { pagada: true }),
        api.actualizarCreditoEspecifico(numeroCuenta, nuevoCredito)
      ]);
      
      if (numeroCuenta === 1) {
        setCredito1(nuevoCredito);
      } else {
        setCredito2(nuevoCredito);
      }
      
      toast.success(`Factura pagada con ${nombreCuenta}. Saldo restante: $${nuevoCredito.toFixed(2)}`);
      await cargarFacturas();
    } catch (error) {
      console.error("Error al marcar como pagada:", error);
      toast.error("Error al actualizar la factura");
    }
  };

  const actualizarCredito = async (numero: 1 | 2, nuevoMonto: number) => {
    try {
      const nombreCuenta = numero === 1 ? 'Marian' : 'Mica';
      await api.actualizarCreditoEspecifico(numero, nuevoMonto);
      if (numero === 1) {
        setCredito1(nuevoMonto);
      } else {
        setCredito2(nuevoMonto);
      }
      toast.success(`Crédito de ${nombreCuenta} actualizado: $${nuevoMonto.toFixed(2)}`);
    } catch (error) {
      console.error("Error al actualizar crédito:", error);
      toast.error("Error al actualizar el crédito");
    }
  };

  const eliminarFactura = async (id: string) => {
    try {
      await api.eliminarFactura(id);
      toast.success("Factura eliminada correctamente");
      await cargarFacturas();
    } catch (error) {
      console.error("Error al eliminar factura:", error);
      toast.error("Error al eliminar la factura");
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-slate-800 mb-2">
            Control de Gastos
          </h1>
          <p className="text-slate-600">
            Administra tus facturas y gastos fácilmente
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-6">
            <CreditoManager 
              credito1={credito1}
              credito2={credito2}
              onActualizarCredito={actualizarCredito}
            />
            <GastosForm onAgregarFactura={agregarFactura} />
          </div>
          <div className="lg:col-span-2">
            <ResumenGastos 
              facturas={facturas} 
              credito1={credito1}
              credito2={credito2}
            />
          </div>
        </div>

        <FacturasList
          facturas={facturas}
          credito1={credito1}
          credito2={credito2}
          onMarcarPagada={marcarComoPagada}
          onEliminar={eliminarFactura}
        />
      </div>
      <Toaster />
    </div>
  );
}