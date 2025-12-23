import { useState, useEffect } from "react";
import { GastosForm } from "./components/GastosForm";
import { FacturasList } from "./components/FacturasList";
import { ResumenGastos } from "./components/ResumenGastos";
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
  const [cargando, setCargando] = useState(true);

  // Cargar facturas al iniciar
  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      const facturasObtenidas = await api.obtenerFacturas();
      setFacturas(facturasObtenidas);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
      toast.error("Error al cargar las facturas");
    } finally {
      setCargando(false);
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

  const marcarComoPagada = async (id: string) => {
    try {
      await api.actualizarFactura(id, { pagada: true });
      toast.success("Factura marcada como pagada");
      await cargarFacturas();
    } catch (error) {
      console.error("Error al marcar como pagada:", error);
      toast.error("Error al actualizar la factura");
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
          <div className="lg:col-span-1">
            <GastosForm onAgregarFactura={agregarFactura} />
          </div>
          <div className="lg:col-span-2">
            <ResumenGastos facturas={facturas} />
          </div>
        </div>

        <FacturasList
          facturas={facturas}
          onMarcarPagada={marcarComoPagada}
          onEliminar={eliminarFactura}
        />
      </div>
      <Toaster />
    </div>
  );
}