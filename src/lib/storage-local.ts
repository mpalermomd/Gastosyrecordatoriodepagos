export interface Factura {
  id: string;
  nombre: string;
  monto: number;
  categoria: string;
  fechaVencimiento: string;
  pagada: boolean;
  fechaCreacion: string;
}

const STORAGE_KEY = 'facturas_gastos';

// Obtener todas las facturas
export async function obtenerFacturas(): Promise<Factura[]> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return [];
  }
}

// Guardar todas las facturas
export async function guardarFacturas(facturas: Factura[]): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(facturas));
  } catch (error) {
    console.error('Error al guardar facturas:', error);
    throw error;
  }
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
