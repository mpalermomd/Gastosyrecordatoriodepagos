import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

const FACTURAS_KEY = 'facturas_data';
const CREDITO_KEY = 'credito_disponible';
const CREDITO_1_KEY = 'credito_1';
const CREDITO_2_KEY = 'credito_2';

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

// Obtener crédito disponible
app.get('/make-server-1b159016/credito', async (c) => {
  try {
    const credito = await kv.get(CREDITO_KEY);
    return c.json({ credito: credito || 0 });
  } catch (error) {
    console.log('Error al obtener crédito:', error);
    return c.json({ error: 'Error al obtener crédito', details: String(error) }, 500);
  }
});

// Actualizar crédito disponible
app.post('/make-server-1b159016/credito', async (c) => {
  try {
    const { credito } = await c.req.json();
    await kv.set(CREDITO_KEY, credito);
    return c.json({ success: true, credito });
  } catch (error) {
    console.log('Error al actualizar crédito:', error);
    return c.json({ error: 'Error al actualizar crédito', details: String(error) }, 500);
  }
});

// Obtener ambos créditos
app.get('/make-server-1b159016/creditos', async (c) => {
  try {
    const [credito1, credito2] = await Promise.all([
      kv.get(CREDITO_1_KEY),
      kv.get(CREDITO_2_KEY)
    ]);
    return c.json({ 
      credito1: credito1 || 0,
      credito2: credito2 || 0
    });
  } catch (error) {
    console.log('Error al obtener créditos:', error);
    return c.json({ error: 'Error al obtener créditos', details: String(error) }, 500);
  }
});

// Actualizar un crédito específico
app.post('/make-server-1b159016/creditos/:numero', async (c) => {
  try {
    const numero = c.req.param('numero');
    const { credito } = await c.req.json();
    
    if (numero !== '1' && numero !== '2') {
      return c.json({ error: 'Número de crédito inválido. Use 1 o 2' }, 400);
    }
    
    const key = numero === '1' ? CREDITO_1_KEY : CREDITO_2_KEY;
    await kv.set(key, credito);
    return c.json({ success: true, credito });
  } catch (error) {
    console.log('Error al actualizar crédito:', error);
    return c.json({ error: 'Error al actualizar crédito', details: String(error) }, 500);
  }
});

// Health check
app.get('/make-server-1b159016/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);