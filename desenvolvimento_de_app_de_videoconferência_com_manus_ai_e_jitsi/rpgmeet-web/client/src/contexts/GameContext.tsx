import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Character, User } from '@/types';

interface GameContextType {
  user: User | null;
  currentCharacter: Character | null;
  characters: Character[];
  setCurrentCharacter: (character: Character) => void;
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  deleteCharacter: (characterId: string) => void;
  login: (username: string) => void;
  logout: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('rpgmeet_user');
    const savedCharacters = localStorage.getItem('rpgmeet_characters');
    const savedCurrentCharacterId = localStorage.getItem('rpgmeet_current_character');

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }

    if (savedCharacters) {
      const parsedCharacters = JSON.parse(savedCharacters);
      setCharacters(parsedCharacters);

      if (savedCurrentCharacterId) {
        const current = parsedCharacters.find((c: Character) => c.id === savedCurrentCharacterId);
        if (current) {
          setCurrentCharacter(current);
        }
      }
    }
  }, []);

  const login = (username: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      characters: characters,
    };
    setUser(newUser);
    localStorage.setItem('rpgmeet_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setCurrentCharacter(null);
    localStorage.removeItem('rpgmeet_user');
  };

  const addCharacter = (character: Character) => {
    const newCharacters = [...characters, character];
    setCharacters(newCharacters);
    localStorage.setItem('rpgmeet_characters', JSON.stringify(newCharacters));

    if (!currentCharacter) {
      setCurrentCharacter(character);
      localStorage.setItem('rpgmeet_current_character', character.id);
    }
  };

  const updateCharacter = (character: Character) => {
    const newCharacters = characters.map((c) => (c.id === character.id ? character : c));
    setCharacters(newCharacters);
    localStorage.setItem('rpgmeet_characters', JSON.stringify(newCharacters));

    if (currentCharacter?.id === character.id) {
      setCurrentCharacter(character);
      localStorage.setItem('rpgmeet_current_character', character.id);
    }
  };

  const deleteCharacter = (characterId: string) => {
    const newCharacters = characters.filter((c) => c.id !== characterId);
    setCharacters(newCharacters);
    localStorage.setItem('rpgmeet_characters', JSON.stringify(newCharacters));

    if (currentCharacter?.id === characterId) {
      const nextCharacter = newCharacters[0] || null;
      setCurrentCharacter(nextCharacter);
      if (nextCharacter) {
        localStorage.setItem('rpgmeet_current_character', nextCharacter.id);
      } else {
        localStorage.removeItem('rpgmeet_current_character');
      }
    }
  };

  const handleSetCurrentCharacter = (character: Character) => {
    setCurrentCharacter(character);
    localStorage.setItem('rpgmeet_current_character', character.id);
  };

  return (
    <GameContext.Provider
      value={{
        user,
        currentCharacter,
        characters,
        setCurrentCharacter: handleSetCurrentCharacter,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        login,
        logout,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de GameProvider');
  }
  return context;
}
