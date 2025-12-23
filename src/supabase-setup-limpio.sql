-- Script para configurar la base de datos de Control de Gastos
-- Este script es seguro de ejecutar múltiples veces

-- Primero, eliminar políticas existentes si las hay (evita errores de duplicado)
DROP POLICY IF EXISTS "Permitir lectura pública de facturas" ON facturas;
DROP POLICY IF EXISTS "Permitir inserción pública de facturas" ON facturas;
DROP POLICY IF EXISTS "Permitir actualización pública de facturas" ON facturas;
DROP POLICY IF EXISTS "Permitir eliminación pública de facturas" ON facturas;

-- Eliminar la tabla si existe (¡CUIDADO! Esto borra todos los datos)
DROP TABLE IF EXISTS facturas;

-- Crear la tabla de facturas
CREATE TABLE facturas (
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

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_facturas_fecha_vencimiento ON facturas(fecha_vencimiento);
CREATE INDEX idx_facturas_pagada ON facturas(pagada);

-- Mensaje de éxito
SELECT 'Tabla facturas creada correctamente con todas las políticas de seguridad' AS resultado;
