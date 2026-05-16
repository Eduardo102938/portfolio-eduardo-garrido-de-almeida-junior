import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Wand2 } from 'lucide-react';
import CharacterForm from '@/components/CharacterForm';
import { ATTRIBUTE_LABELS } from '@/types';

export default function CharacterSheet() {
  const { currentCharacter } = useGame();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  if (!currentCharacter) {
    setLocation('/dashboard');
    return null;
  }

  const calculateModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const getModifierSign = (mod: number) => {
    return mod > 0 ? `+${mod}` : mod === 0 ? '' : `${mod}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
            Ficha D&D 5e
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
        {isEditing ? (
          <Card className="bg-card border-border p-8">
            <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: 'Cinzel' }}>
              Editar Personagem
            </h2>
            <CharacterForm character={currentCharacter} onClose={() => setIsEditing(false)} />
          </Card>
        ) : (
          <>
            {/* Character Header */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Main Info */}
              <div className="md:col-span-2">
                <Card className="bg-card border-border p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-6xl mb-4">{currentCharacter.avatar}</div>
                      <h2 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Cinzel' }}>
                        {currentCharacter.name}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {currentCharacter.class} • {currentCharacter.race}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Editar Ficha
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Nível</p>
                      <p className="text-3xl font-bold text-primary">{currentCharacter.level}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">CA</p>
                      <p className="text-3xl font-bold text-primary">{currentCharacter.ac}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">HP</p>
                      <p className="text-3xl font-bold text-primary">
                        {currentCharacter.hp}/{currentCharacter.maxHp}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                  Informações
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Classe</p>
                    <p className="font-semibold text-foreground">{currentCharacter.class}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Raça</p>
                    <p className="font-semibold text-foreground">{currentCharacter.race}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nível</p>
                    <p className="font-semibold text-foreground">{currentCharacter.level}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attributes */}
            <Card className="bg-card border-border p-8 mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: 'Cinzel' }}>
                Atributos
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(currentCharacter.attributes).map(([attr, value]) => {
                  const modifier = calculateModifier(value);
                  return (
                    <div key={attr} className="bg-input rounded-lg p-6 text-center border border-border">
                      <p className="text-muted-foreground text-sm mb-2 capitalize">{ATTRIBUTE_LABELS[attr]}</p>
                      <p className="text-4xl font-bold text-primary mb-2">{value}</p>
                      <p className="text-lg font-semibold text-secondary">{getModifierSign(modifier)}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Background */}
            {currentCharacter.background && (
              <Card className="bg-card border-border p-8 mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                  Background
                </h3>
                <p className="text-foreground whitespace-pre-wrap">{currentCharacter.background}</p>
              </Card>
            )}

            {/* AI Assistant */}
            <Card className="bg-card border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                  Assistente de IA
                </h3>
                <Button
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {showAIAssistant ? 'Fechar' : 'Abrir'} Assistente
                </Button>
              </div>

              {showAIAssistant && (
                <div className="bg-input rounded-lg p-6 border border-border">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">💡 Dicas para Iniciantes</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• <strong>Força:</strong> Melhor para ataques com armas pesadas e testes de força bruta</li>
                        <li>• <strong>Destreza:</strong> Importante para esquiva, armas leves e furtividade</li>
                        <li>• <strong>Constituição:</strong> Aumenta seus pontos de vida (HP)</li>
                        <li>• <strong>Inteligência:</strong> Usada para testes de conhecimento e magia arcana</li>
                        <li>• <strong>Sabedoria:</strong> Afeta percepção e resistência a magia</li>
                        <li>• <strong>Carisma:</strong> Influencia persuasão, enganação e presença</li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-2">🎯 Sugestões de Melhoria</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {currentCharacter.level < 5 && (
                          <p>• Você está no começo! Foque em aprender as mecânicas básicas do jogo.</p>
                        )}
                        {currentCharacter.hp < currentCharacter.maxHp * 0.5 && (
                          <p>• Sua vida está baixa! Considere descansar ou usar poções de cura.</p>
                        )}
                        {Object.values(currentCharacter.attributes).some((v) => v < 8) && (
                          <p>• Você tem um atributo fraco. Considere melhorá-lo em próximos níveis.</p>
                        )}
                        {currentCharacter.ac < 12 && (
                          <p>• Sua CA é baixa. Considere equipar uma armadura melhor.</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-2">📚 Recursos Úteis</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Para mais informações sobre D&D 5e, consulte o Player's Handbook ou visite sites de comunidades RPG.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary text-xs"
                          onClick={() => alert('Abrindo guia de classes...')}
                        >
                          Guia de Classes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary text-xs"
                          onClick={() => alert('Abrindo guia de raças...')}
                        >
                          Guia de Raças
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary text-xs"
                          onClick={() => alert('Abrindo calculadora de XP...')}
                        >
                          Calculadora de XP
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
