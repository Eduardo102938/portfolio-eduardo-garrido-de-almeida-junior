import { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dice5, MessageSquare, User, X } from 'lucide-react';
import DiceRoller from '@/components/DiceRoller';
import { DiceType, DICE_TYPES } from '@/types';

export default function VideoConference() {
  const { currentCharacter } = useGame();
  const [, setLocation] = useLocation();
  const [roomName, setRoomName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [diceRolls, setDiceRolls] = useState<any[]>([]);
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  if (!currentCharacter) {
    setLocation('/dashboard');
    return null;
  }

  const generateRoomName = () => {
    const name = `rpg-${Math.random().toString(36).substr(2, 9)}`;
    setRoomName(name);
  };

  const handleJoinRoom = () => {
    if (!roomName) {
      generateRoomName();
      return;
    }

    setIsJoined(true);

    // Simular integração com Jitsi Meet
    if (jitsiContainerRef.current) {
      jitsiContainerRef.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-lg border-2 border-primary/50">
          <div class="text-center">
            <div class="text-4xl mb-4">🎥</div>
            <p class="text-foreground font-semibold mb-2">Videoconferência Simulada</p>
            <p class="text-muted-foreground text-sm">Sala: ${roomName}</p>
            <p class="text-muted-foreground text-xs mt-2">Integração com Jitsi Meet SDK</p>
          </div>
        </div>
      `;
    }
  };

  const handleRollDice = (type: DiceType, quantity: number, modifier: number) => {
    const sides = DICE_TYPES[type];
    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0) + modifier;
    const isCritical = quantity === 1 && (rolls[0] === sides || rolls[0] === 1);

    const roll = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      quantity,
      modifier,
      rolls,
      total,
      isCritical,
      character: currentCharacter.name,
      timestamp: new Date(),
    };

    setDiceRolls([roll, ...diceRolls]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
              Videoconferência HD
            </h1>
          </div>
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
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border overflow-hidden">
              {!isJoined ? (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                    Conectar à Sala de Videoconferência
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Máximo de 5 participantes. Você pode compartilhar dados e sua ficha durante a sessão.
                  </p>

                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Nome da Sala</label>
                      <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="ex: rpg-aventura-123"
                        className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={generateRoomName}
                        variant="outline"
                        className="flex-1 border-primary text-primary"
                      >
                        Gerar Nome
                      </Button>
                      <Button
                        onClick={handleJoinRoom}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Entrar na Sala
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div ref={jitsiContainerRef} className="w-full h-96 bg-black/50" />

                  <div className="p-6 border-t border-border">
                    <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                      Sala: {roomName}
                    </h3>

                    <div className="flex gap-3 flex-wrap">
                      <Button
                        onClick={() => setShowDiceRoller(!showDiceRoller)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Dice5 className="w-4 h-4 mr-2" />
                        Rolar Dados
                      </Button>
                      <Button variant="outline" className="border-primary text-primary">
                        <User className="w-4 h-4 mr-2" />
                        Ver Ficha
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Dice Roller */}
            {showDiceRoller && isJoined && (
              <Card className="bg-card border-border mt-6 p-6">
                <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                  Rolador de Dados
                </h3>
                <DiceRoller
                  diceTypes={['d6', 'd10', 'd20'] as DiceType[]}
                  onRoll={handleRollDice}
                />
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Character Info */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                Seu Personagem
              </h3>
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{currentCharacter.avatar}</div>
                <p className="font-bold text-foreground">{currentCharacter.name}</p>
                <p className="text-xs text-muted-foreground">
                  {currentCharacter.class} • {currentCharacter.race}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HP:</span>
                  <span className="font-semibold">
                    {currentCharacter.hp}/{currentCharacter.maxHp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AC:</span>
                  <span className="font-semibold">{currentCharacter.ac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível:</span>
                  <span className="font-semibold">{currentCharacter.level}</span>
                </div>
              </div>
            </Card>

            {/* Dice History */}
            {diceRolls.length > 0 && (
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                  Histórico de Dados
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {diceRolls.slice(0, 5).map((roll) => (
                    <div
                      key={roll.id}
                      className={`p-3 rounded-lg border ${
                        roll.isCritical
                          ? 'bg-yellow-500/20 border-yellow-500/50'
                          : 'bg-primary/10 border-primary/30'
                      }`}
                    >
                      <p className="font-semibold text-sm text-foreground">
                        {roll.quantity}x {roll.type.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {roll.rolls.join(', ')} {roll.modifier > 0 ? `+${roll.modifier}` : ''}
                      </p>
                      <p className="text-lg font-bold text-primary mt-1">{roll.total}</p>
                      {roll.isCritical && <p className="text-xs text-yellow-500 mt-1">⭐ CRÍTICO!</p>}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
