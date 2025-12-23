import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

const FACTURAS_KEY = 'facturas_data';

// Obtener todas las facturas
app.get('/make-server-1b159016/facturas', async (c) => {
  try {
    const facturas = await kv.get(FACTURAS_KEY);
    return c.json({ facturas: facturas || [] });
  } catch (error) {
    console.log('Error al obtener facturas:', error);
    return c.json({ error: 'Error al obtener facturas', details: String(error) }, 500);
  }
});

// Guardar facturas
app.post('/make-server-1b159016/facturas', async (c) => {
  try {
    const { facturas } = await c.req.json();
    await kv.set(FACTURAS_KEY, facturas);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error al guardar facturas:', error);
    return c.json({ error: 'Error al guardar facturas', details: String(error) }, 500);
  }
});

// Health check
app.get('/make-server-1b159016/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
