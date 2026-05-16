import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Video, Dice5, Scroll, MessageSquare, Plus, LogOut } from 'lucide-react';
import CharacterSelector from '@/components/CharacterSelector';
import CharacterForm from '@/components/CharacterForm';

export default function Dashboard() {
  const { user, currentCharacter, logout } = useGame();
  const [, setLocation] = useLocation();
  const [showCharacterForm, setShowCharacterForm] = useState(false);

  if (!user) {
    setLocation('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const features = [
    {
      icon: Video,
      title: 'Videoconferência HD',
      description: 'Conecte-se com até 5 pessoas para sua sessão de RPG',
      color: 'text-blue-400',
      action: () => setLocation('/videoconference'),
      disabled: !currentCharacter,
    },
    {
      icon: Dice5,
      title: 'Sistema de Dados',
      description: 'Role dados de D4 até D100 com histórico completo',
      color: 'text-yellow-400',
      action: () => setLocation('/dice'),
      disabled: !currentCharacter,
    },
    {
      icon: Scroll,
      title: 'Ficha D&D',
      description: 'Gerencie sua ficha com assistência de IA para iniciantes',
      color: 'text-purple-400',
      action: () => setLocation('/character-sheet'),
      disabled: !currentCharacter,
    },
    {
      icon: MessageSquare,
      title: 'Chat RPG',
      description: 'Jogue RPG com até 10+ pessoas por mensagens',
      color: 'text-green-400',
      action: () => setLocation('/chat'),
      disabled: !currentCharacter,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_logo-JhpgwVJQrQzqqyTj8C3p7r.webp"
              alt="RPG Meet"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                RPG Meet
              </h1>
              <p className="text-xs text-muted-foreground">Bem-vindo, {user.username}!</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-primary text-primary hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Character Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'Cinzel' }}>
            Seu Personagem
          </h2>

          {currentCharacter ? (
            <Card className="bg-card border-border p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center text-3xl">
                    {currentCharacter.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                      {currentCharacter.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentCharacter.class} {currentCharacter.race} - Nível {currentCharacter.level}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setLocation('/character-sheet')}
                  className="border-primary text-primary"
                >
                  Editar Ficha
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="bg-card border-border p-6 mb-6 text-center">
              <p className="text-muted-foreground mb-4">Você ainda não tem um personagem criado</p>
              <Button
                onClick={() => setShowCharacterForm(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Personagem
              </Button>
            </Card>
          )}

          <CharacterSelector />
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'Cinzel' }}>
            Funcionalidades
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-card border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer"
                  onClick={feature.action}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                      {feature.disabled && (
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded">
                          Crie um personagem
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: 'Cinzel' }}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={feature.disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.action();
                      }}
                    >
                      Acessar
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Create Character Form Modal */}
        {showCharacterForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-card border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                    Criar Novo Personagem
                  </h2>
                  <button
                    onClick={() => setShowCharacterForm(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <CharacterForm onClose={() => setShowCharacterForm(false)} />
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
