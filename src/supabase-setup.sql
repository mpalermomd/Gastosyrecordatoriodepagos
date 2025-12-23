-- Crear la tabla de facturas
CREATE TABLE IF NOT EXISTS facturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  pagada BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;

-- Política para permitir que cualquiera pueda leer todas las facturas
-- NOTA: Esta configuración permite acceso público a los datos
-- Si deseas mayor seguridad, deberías implementar autenticación
CREATE POLICY "Permitir lectura pública de facturas"
  ON facturas
  FOR SELECT
  USING (true);

-- Política para permitir que cualquiera pueda insertar facturas
CREATE POLICY "Permitir inserción pública de facturas"
  ON facturas
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir que cualquiera pueda actualizar facturas
CREATE POLICY "Permitir actualización pública de facturas"
  ON facturas
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política para permitir que cualquiera pueda eliminar facturas
CREATE POLICY "Permitir eliminación pública de facturas"
  ON facturas
  FOR DELETE
  USING (true);

-- Crear índice para mejorar el rendimiento en consultas por fecha
CREATE INDEX IF NOT EXISTS idx_facturas_fecha_vencimiento ON facturas(fecha_vencimiento);
CREATE INDEX IF NOT EXISTS idx_facturas_pagada ON facturas(pagada);
