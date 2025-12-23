import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1b159016`;

export interface Factura {
  id: string;
  nombre: string;
  monto: number;
  categoria: string;
  fechaVencimiento: string;
  pagada: boolean;
  fechaCreacion: string;
}

// Guardar todas las facturas
export async function guardarFacturas(facturas: Factura[]): Promise<void> {
  const response = await fetch(`${API_URL}/facturas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({ facturas }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al guardar facturas: ${error}`);
  }
}

// Obtener todas las facturas
export async function obtenerFacturas(): Promise<Factura[]> {
  const response = await fetch(`${API_URL}/facturas`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al obtener facturas: ${error}`);
  }

  const data = await response.json();
  return data.facturas || [];
}

// Agregar una factura
export async function agregarFactura(factura: Omit<Factura, 'id' | 'fechaCreacion' | 'pagada'>): Promise<Factura> {
  const nuevaFactura: Factura = {
    id: crypto.randomUUID(),
    ...factura,
    pagada: false,
    fechaCreacion: new Date().toISOString(),
  };

  const facturas = await obtenerFacturas();
  facturas.push(nuevaFactura);
  await guardarFacturas(facturas);

  return nuevaFactura;
}

// Actualizar una factura
export async function actualizarFactura(id: string, cambios: Partial<Factura>): Promise<void> {
  const facturas = await obtenerFacturas();
  const index = facturas.findIndex(f => f.id === id);
  
  if (index === -1) {
    throw new Error('Factura no encontrada');
  }

  facturas[index] = { ...facturas[index], ...cambios };
  await guardarFacturas(facturas);
}

// Eliminar una factura
export async function eliminarFactura(id: string): Promise<void> {
  const facturas = await obtenerFacturas();
  const facturasFiltradas = facturas.filter(f => f.id !== id);
  await guardarFacturas(facturasFiltradas);
}
