import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

export default function CharacterSelector() {
  const { characters, currentCharacter, setCurrentCharacter, deleteCharacter } = useGame();

  if (characters.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Seus Personagens</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <Card
            key={character.id}
            className={`bg-card border-2 p-4 cursor-pointer transition-all ${
              currentCharacter?.id === character.id ? 'border-primary' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setCurrentCharacter(character)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">{character.avatar}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Deletar ${character.name}?`)) {
                    deleteCharacter(character.id);
                  }
                }}
                className="text-destructive hover:text-destructive/80 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-bold text-primary text-sm" style={{ fontFamily: 'Cinzel' }}>
              {character.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {character.class} • {character.race}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Nível {character.level}</p>
            {currentCharacter?.id === character.id && (
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Personagem Ativo</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
