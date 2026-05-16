import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Character, CHARACTER_CLASSES, CHARACTER_RACES } from '@/types';

interface CharacterFormProps {
  character?: Character;
  onClose: () => void;
}

const AVATARS = ['⚔️', '🧙', '🗡️', '⛪', '🛡️', '🏹', '🎵', '👹', '🐉', '🧝'];

export default function CharacterForm({ character, onClose }: CharacterFormProps) {
  const { addCharacter, updateCharacter } = useGame();
  const [formData, setFormData] = useState({
    name: character?.name || '',
    class: character?.class || CHARACTER_CLASSES[0],
    race: character?.race || CHARACTER_RACES[0],
    level: character?.level || 1,
    avatar: character?.avatar || AVATARS[0],
    hp: character?.hp || 10,
    maxHp: character?.maxHp || 10,
    ac: character?.ac || 10,
    background: character?.background || '',
    attributes: character?.attributes || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCharacter: Character = {
      id: character?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      skills: character?.skills || [],
      traits: character?.traits || '',
      createdAt: character?.createdAt || new Date(),
    };

    if (character) {
      updateCharacter(newCharacter);
    } else {
      addCharacter(newCharacter);
    }

    onClose();
  };

  const handleAttributeChange = (attr: string, value: number) => {
    setFormData({
      ...formData,
      attributes: {
        ...formData.attributes,
        [attr]: value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Avatar</label>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setFormData({ ...formData, avatar })}
                className={`text-2xl p-2 rounded border-2 transition-all ${
                  formData.avatar === avatar ? 'border-primary bg-primary/20' : 'border-border hover:border-primary/50'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Classe</label>
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CHARACTER_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Raça</label>
          <select
            value={formData.race}
            onChange={(e) => setFormData({ ...formData, race: e.target.value })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CHARACTER_RACES.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Nível</label>
          <input
            type="number"
            min="1"
            max="20"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">AC (Classe de Armadura)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.ac}
            onChange={(e) => setFormData({ ...formData, ac: parseInt(e.target.value) })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">HP Máximo</label>
          <input
            type="number"
            min="1"
            value={formData.maxHp}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setFormData({ ...formData, maxHp: val, hp: Math.min(formData.hp, val) });
            }}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">HP Atual</label>
          <input
            type="number"
            min="0"
            max={formData.maxHp}
            value={formData.hp}
            onChange={(e) => setFormData({ ...formData, hp: parseInt(e.target.value) })}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Attributes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Atributos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(formData.attributes).map(([attr, value]) => (
            <div key={attr}>
              <label className="block text-xs font-semibold text-muted-foreground mb-2 capitalize">{attr}</label>
              <input
                type="number"
                min="1"
                max="20"
                value={value}
                onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Background</label>
        <textarea
          value={formData.background}
          onChange={(e) => setFormData({ ...formData, background: e.target.value })}
          placeholder="Conte a história do seu personagem..."
          className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          {character ? 'Atualizar' : 'Criar'} Personagem
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-primary text-primary">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
