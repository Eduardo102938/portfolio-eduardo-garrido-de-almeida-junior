// Tipos de dados para o RPG Meet

export interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  avatar: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: string[];
  hp: number;
  maxHp: number;
  ac: number;
  background: string;
  traits: string;
  createdAt: Date;
}

export interface DiceRoll {
  id: string;
  diceType: string;
  quantity: number;
  modifier: number;
  result: number;
  rolls: number[];
  isCritical: boolean;
  timestamp: Date;
  characterId: string;
}

export interface ChatMessage {
  id: string;
  characterId: string;
  characterName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'dice' | 'system';
  diceRoll?: DiceRoll;
}

export interface VideoRoom {
  id: string;
  name: string;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: Date;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  characters: Character[];
  currentCharacterId?: string;
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export const DICE_TYPES: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

export const CHARACTER_CLASSES = [
  'Guerreiro',
  'Mago',
  'Ladino',
  'Clérigo',
  'Paladino',
  'Druida',
  'Bardo',
  'Ranger',
  'Mago da Guerra',
  'Feiticeiro',
];

export const CHARACTER_RACES = [
  'Humano',
  'Elfo',
  'Anão',
  'Halfling',
  'Draconato',
  'Gnomo',
  'Meia-Orc',
  'Tiefling',
];

export const ATTRIBUTES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;

export const ATTRIBUTE_LABELS: Record<string, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
};
