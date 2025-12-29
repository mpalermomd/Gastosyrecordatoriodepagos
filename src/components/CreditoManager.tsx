import { useState } from 'react';
import { Wallet, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CreditoManagerProps {
  credito1: number;
  credito2: number;
  onActualizarCredito: (numero: 1 | 2, nuevoMonto: number) => Promise<void>;
}

export function CreditoManager({ credito1, credito2, onActualizarCredito }: CreditoManagerProps) {
  const [montoAgregar1, setMontoAgregar1] = useState('');
  const [montoAgregar2, setMontoAgregar2] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleAgregarCredito = async (e: React.FormEvent, numero: 1 | 2) => {
    e.preventDefault();
    const monto = parseFloat(numero === 1 ? montoAgregar1 : montoAgregar2);
    
    if (isNaN(monto) || monto <= 0) {
      return;
    }

    setCargando(true);
    try {
      const creditoActual = numero === 1 ? credito1 : credito2;
      await onActualizarCredito(numero, creditoActual + monto);
      if (numero === 1) {
        setMontoAgregar1('');
      } else {
        setMontoAgregar2('');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h2 className="text-slate-800">Gestión de Créditos</h2>
      </div>

      <Tabs defaultValue="credito1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="credito1">Marian</TabsTrigger>
          <TabsTrigger value="credito2">Mica</TabsTrigger>
        </TabsList>

        <TabsContent value="credito1" className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-slate-600 mb-1">Saldo Marian</p>
            <p className="text-blue-700">${credito1.toFixed(2)}</p>
          </div>

          <form onSubmit={(e) => handleAgregarCredito(e, 1)} className="space-y-3">
            <div>
              <label htmlFor="monto-credito-1" className="block text-slate-700 mb-1">
                Agregar a Marian
              </label>
              <Input
                id="monto-credito-1"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ingrese monto"
                value={montoAgregar1}
                onChange={(e) => setMontoAgregar1(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={cargando || !montoAgregar1 || parseFloat(montoAgregar1) <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {cargando ? 'Agregando...' : 'Agregar Crédito'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="credito2" className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-slate-600 mb-1">Saldo Mica</p>
            <p className="text-purple-700">${credito2.toFixed(2)}</p>
          </div>

          <form onSubmit={(e) => handleAgregarCredito(e, 2)} className="space-y-3">
            <div>
              <label htmlFor="monto-credito-2" className="block text-slate-700 mb-1">
                Agregar a Mica
              </label>
              <Input
                id="monto-credito-2"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ingrese monto"
                value={montoAgregar2}
                onChange={(e) => setMontoAgregar2(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={cargando || !montoAgregar2 || parseFloat(montoAgregar2) <= 0}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {cargando ? 'Agregando...' : 'Agregar Crédito'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}