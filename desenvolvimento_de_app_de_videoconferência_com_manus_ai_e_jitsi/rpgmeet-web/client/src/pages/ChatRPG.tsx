import { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Send, Dice5 } from 'lucide-react';
import { ChatMessage, DiceType, DICE_TYPES } from '@/types';

export default function ChatRPG() {
  const { currentCharacter } = useGame();
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentCharacter) {
    setLocation('/dashboard');
    return null;
  }

  // Simular participantes
  useEffect(() => {
    const mockParticipants = [
      'Você',
      'Aventureiro Misterioso',
      'Mago Antigo',
      'Guerreiro Lendário',
      'Ladina Sombria',
    ];
    setParticipants(mockParticipants);

    // Adicionar mensagem de boas-vindas
    const welcomeMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      characterId: 'system',
      characterName: 'Sistema',
      content: `Bem-vindo à sala de RPG! ${currentCharacter.name} entrou na aventura.`,
      timestamp: new Date(),
      type: 'system',
    };
    setMessages([welcomeMessage]);
  }, [currentCharacter]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      characterId: currentCharacter.id,
      characterName: currentCharacter.name,
      content: inputValue,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleRollDice = (type: DiceType, quantity: number, modifier: number) => {
    const sides = DICE_TYPES[type];
    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0) + modifier;
    const isCritical = quantity === 1 && (rolls[0] === sides || rolls[0] === 1);

    const diceMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      characterId: currentCharacter.id,
      characterName: currentCharacter.name,
      content: `Rolou ${quantity}x ${type.toUpperCase()} ${modifier > 0 ? `+${modifier}` : ''} = **${total}**${isCritical ? ' ⭐ CRÍTICO!' : ''}`,
      timestamp: new Date(),
      type: 'dice',
      diceRoll: {
        id: Math.random().toString(36).substr(2, 9),
        diceType: type,
        quantity,
        modifier,
        result: total,
        rolls,
        isCritical,
        timestamp: new Date(),
        characterId: currentCharacter.id,
      },
    };

    setMessages([...messages, diceMessage]);
    setShowDiceRoller(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
              Chat RPG
            </h1>
            <p className="text-xs text-muted-foreground">{participants.length} participantes na sala</p>
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

      <main className="flex-1 container mx-auto px-4 py-8 grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Messages */}
          <Card className="bg-card border-border flex-1 p-6 mb-6 overflow-y-auto max-h-96">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.type === 'system'
                      ? 'text-center py-2 text-muted-foreground text-sm italic'
                      : 'bg-input rounded-lg p-4 border border-border'
                  }`}
                >
                  {message.type !== 'system' && (
                    <p className="font-semibold text-primary text-sm mb-1">{message.characterName}</p>
                  )}
                  <p className="text-foreground text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Dice Roller */}
          {showDiceRoller && (
            <Card className="bg-card border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Rolar Dados</h3>
                <button
                  onClick={() => setShowDiceRoller(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Tipo de Dado</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'] as DiceType[]).map((dice) => (
                      <Button
                        key={dice}
                        variant="outline"
                        onClick={() => handleRollDice(dice, 1, 0)}
                        className="border-primary text-primary hover:bg-primary/10 text-sm"
                      >
                        {dice}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua ação ou diálogo..."
              className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDiceRoller(!showDiceRoller)}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Dice5 className="w-4 h-4" />
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Your Character */}
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
              Seu Personagem
            </h3>
            <div className="text-center">
              <div className="text-5xl mb-3">{currentCharacter.avatar}</div>
              <p className="font-bold text-foreground">{currentCharacter.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentCharacter.class} • {currentCharacter.race}
              </p>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
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
              </div>
            </div>
          </Card>

          {/* Participants */}
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
              Participantes
            </h3>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-input">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-foreground">{participant}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card border-border p-6">
            <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 text-sm justify-start"
                onClick={() => setInputValue('*faz um teste de percepção*')}
              >
                Teste de Percepção
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 text-sm justify-start"
                onClick={() => setInputValue('*ataca com a espada*')}
              >
                Atacar
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 text-sm justify-start"
                onClick={() => setInputValue('*lança um feitiço*')}
              >
                Lançar Feitiço
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 text-sm justify-start"
                onClick={() => setInputValue('*se esconde nas sombras*')}
              >
                Furtividade
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
