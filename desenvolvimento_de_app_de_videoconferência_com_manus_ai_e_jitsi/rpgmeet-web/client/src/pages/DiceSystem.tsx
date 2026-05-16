import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Trash2 } from 'lucide-react';
import DiceRoller from '@/components/DiceRoller';
import { DiceType } from '@/types';

export default function DiceSystem() {
  const { currentCharacter } = useGame();
  const [, setLocation] = useLocation();
  const [diceRolls, setDiceRolls] = useState<any[]>([]);

  if (!currentCharacter) {
    setLocation('/dashboard');
    return null;
  }

  const allDiceTypes: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  const handleRoll = (type: DiceType, quantity: number, modifier: number) => {
    const sides = { d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20, d100: 100 }[type];
    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0) + modifier;
    const isCritical = quantity === 1 && (rolls[0] === sides || rolls[0] === 1);
    const isFumble = quantity === 1 && rolls[0] === 1;

    const roll = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      quantity,
      modifier,
      rolls,
      total,
      isCritical,
      isFumble,
      character: currentCharacter.name,
      timestamp: new Date(),
    };

    setDiceRolls([roll, ...diceRolls]);
  };

  const clearHistory = () => {
    if (confirm('Limpar histórico de rolagens?')) {
      setDiceRolls([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
            Sistema de Dados
          </h1>
          <Button
            variant="outline"
            onClick={() => setLocation('/dashboard')}
            className="border-primary text-primary"
          >
            <X className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Dice Roller */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border p-8">
              <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: 'Cinzel' }}>
                Rolador de Dados
              </h2>
              <p className="text-muted-foreground mb-6">
                Role dados de D4 até D100 com modificadores. Todos os resultados são registrados no histórico.
              </p>

              <DiceRoller diceTypes={allDiceTypes} onRoll={handleRoll} />

              {/* Quick Roll Buttons */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Atalhos Rápidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { label: 'Teste Simples', dice: 'd20', qty: 1, mod: 0 },
                    { label: 'Vantagem', dice: 'd20', qty: 2, mod: 0 },
                    { label: 'Dano Básico', dice: 'd6', qty: 1, mod: 0 },
                    { label: 'Dano Crítico', dice: 'd20', qty: 2, mod: 0 },
                  ].map((quick) => (
                    <Button
                      key={quick.label}
                      variant="outline"
                      onClick={() => handleRoll(quick.dice as DiceType, quick.qty, quick.mod)}
                      className="border-primary text-primary hover:bg-primary/10 text-xs"
                    >
                      {quick.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary" style={{ fontFamily: 'Cinzel' }}>
                  Histórico
                </h3>
                {diceRolls.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {diceRolls.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">Nenhuma rolagem ainda</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {diceRolls.map((roll) => (
                    <div
                      key={roll.id}
                      className={`p-3 rounded-lg border ${
                        roll.isFumble
                          ? 'bg-red-500/20 border-red-500/50'
                          : roll.isCritical
                            ? 'bg-yellow-500/20 border-yellow-500/50'
                            : 'bg-primary/10 border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm text-foreground">
                          {roll.quantity}x {roll.type.toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {roll.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground mb-2">
                        {roll.rolls.join(', ')} {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier < 0 ? roll.modifier : ''}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary">{roll.total}</p>
                        {roll.isFumble && <span className="text-xs text-red-500">💀 FUMBLE</span>}
                        {roll.isCritical && <span className="text-xs text-yellow-500">⭐ CRÍTICO</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stats */}
              {diceRolls.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total de rolagens:</span>
                    <span className="font-semibold">{diceRolls.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Críticos:</span>
                    <span className="font-semibold text-yellow-500">
                      {diceRolls.filter((r) => r.isCritical).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fumbles:</span>
                    <span className="font-semibold text-red-500">
                      {diceRolls.filter((r) => r.isFumble).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Média:</span>
                    <span className="font-semibold">
                      {(diceRolls.reduce((a, r) => a + r.total, 0) / diceRolls.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
