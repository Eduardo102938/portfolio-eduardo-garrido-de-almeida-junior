import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dice5, Users, Zap, Scroll, Download, Github } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_logo-JhpgwVJQrQzqqyTj8C3p7r.webp"
              alt="RPG Meet Logo"
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
              RPG Meet
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#download" className="hover:text-primary transition-colors">
              Download
            </a>
          </div>
          <Button
            onClick={() => setLocation('/login')}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            Entrar no App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_hero_background-TDpgoGS8iUoLv5TG5osq2W.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-primary"
              style={{ fontFamily: 'Cinzel' }}
            >
              RPG Meet
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8" style={{ fontFamily: 'Crimson Text' }}>
              A Plataforma Definitiva para Sessões de RPG de Mesa Online
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Videoconferência integrada, rolagem de dados em tempo real, ficha de personagem e chat — tudo em um único
              aplicativo temático de fantasia medieval.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => setLocation('/login')}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                style={{ fontFamily: 'Cinzel' }}
              >
                <Download className="mr-2 w-5 h-5" />
                Entrar no App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8"
                style={{ fontFamily: 'Cinzel' }}
                onClick={() => alert('GitHub: https://github.com/rpgmeet')}
              >
                <Github className="mr-2 w-5 h-5" />
                Ver no GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
              <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                  7
                </div>
                <p className="text-sm text-muted-foreground">Tipos de Dados</p>
              </div>
              <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                  ∞
                </div>
                <p className="text-sm text-muted-foreground">Jogadores</p>
              </div>
              <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-4">
                <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                  100%
                </div>
                <p className="text-sm text-muted-foreground">Gratuito</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary" style={{ fontFamily: 'Cinzel' }}>
            Funcionalidades Principais
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Feature 1: Videoconferência */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_features_video-9oeAJaNs3xT74ofiAiCDpp.webp"
                  alt="Videoconferência"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                    Videoconferência HD
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Integração com Jitsi Meet para chamadas de vídeo estáveis e de alta qualidade, otimizadas para mobile.
                </p>
              </div>
            </Card>

            {/* Feature 2: Dados */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_features_dice-fV3Wd8Q7uTuGTJaCKmbenn.webp"
                  alt="Sistema de Dados"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Dice5 className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                    Sistema de Dados
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Rolagem de D4 a D100 com suporte a quantidade, modificadores, críticos e falhas críticas visíveis para todos.
                </p>
              </div>
            </Card>

            {/* Feature 3: Personagem */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663628023902/ngfAjnFwFDXdnoWCh5UvAJ/rpg_meet_features_character-8L8rDdkZCB2trs7XxUVvFJ.webp"
                  alt="Ficha de Personagem"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scroll className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                    Ficha de Personagem
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Crie e gerencie personagens completos com atributos D&D 5e, avatares customizados e histórico de ações.
                </p>
              </div>
            </Card>

            {/* Feature 4: Chat */}
            <Card className="bg-card border-border hover:border-primary/50 transition-all overflow-hidden group cursor-pointer">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Zap className="w-24 h-24 text-primary/30" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Cinzel' }}>
                    Chat Integrado
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Comunique-se com seus companheiros de jogo sem sair da tela. Histórico de mensagens e resultados de dados.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary" style={{ fontFamily: 'Cinzel' }}>
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Crie seu Personagem',
                description: 'Escolha classe, raça, atributos e um avatar temático.',
              },
              {
                step: '2',
                title: 'Crie ou Entre em uma Sala',
                description: 'Gere uma sala com nome aleatório ou entre via link.',
              },
              {
                step: '3',
                title: 'Inicie a Videoconferência',
                description: 'Conecte-se com seus companheiros via Jitsi Meet.',
              },
              {
                step: '4',
                title: 'Role Dados e Jogue!',
                description: 'Interaja, role dados e veja os resultados em tempo real.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-card border border-border rounded-lg p-6 text-center h-full">
                  <div
                    className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                    style={{ fontFamily: 'Cinzel' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2" style={{ fontFamily: 'Cinzel' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary" style={{ fontFamily: 'Cinzel' }}>
            Fique Atualizado
          </h2>
          <p className="text-muted-foreground mb-8">
            Receba notificações sobre novas funcionalidades, atualizações e eventos da comunidade RPG Meet.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Inscrever
            </Button>
          </form>

          {subscribed && (
            <div className="mt-4 text-primary text-sm font-semibold">✓ Obrigado por se inscrever!</div>
          )}
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary" style={{ fontFamily: 'Cinzel' }}>
            Pronto para Começar?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Baixe o RPG Meet agora e comece suas aventuras épicas com seus amigos. Disponível para Android.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation('/login')}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
              style={{ fontFamily: 'Cinzel' }}
            >
              <Download className="mr-2 w-5 h-5" />
              Entrar no App
            </Button>
            <Button
              onClick={() => setLocation('/login')}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8"
              style={{ fontFamily: 'Cinzel' }}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                RPG Meet
              </h3>
              <p className="text-sm text-muted-foreground">
                A plataforma definitiva para sessões de RPG de mesa online.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                Produto
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-primary transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#download" className="hover:text-primary transition-colors">
                    Download
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                Comunidade
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4" style={{ fontFamily: 'Cinzel' }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 RPG Meet. Desenvolvido com ⚔️ e 🛡️ para a comunidade de RPG.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
