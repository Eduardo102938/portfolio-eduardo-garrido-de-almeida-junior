import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Character } from '@/types';

export default function Login() {
  const [username, setUsername] = useState('');
  const [, setLocation] = useLocation();
  const { login, characters } = useGame();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      setLocation('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_hero_background-TDpgoGS8iUoLv5TG5osq2W.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="relative z-10 max-w-md w-full">
        <Card className="bg-card border-border p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Cinzel' }}>
              RPG Meet
            </h1>
            <p className="text-muted-foreground">Bem-vindo, Aventureiro!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nome do Jogador</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome..."
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
              style={{ fontFamily: 'Cinzel' }}
            >
              Entrar na Aventura
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-4">
              {characters.length > 0
                ? `Você tem ${characters.length} personagem(ns) criado(s)`
                : 'Crie seu primeiro personagem no painel'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
