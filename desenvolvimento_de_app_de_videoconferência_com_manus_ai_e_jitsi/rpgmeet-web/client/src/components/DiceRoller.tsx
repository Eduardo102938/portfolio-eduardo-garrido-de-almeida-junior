import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DiceType, DICE_TYPES } from '@/types';
import { Plus, Minus } from 'lucide-react';

interface DiceRollerProps {
  diceTypes: DiceType[];
  onRoll: (type: DiceType, quantity: number, modifier: number) => void;
}

export default function DiceRoller({ diceTypes, onRoll }: DiceRollerProps) {
  const [selectedDice, setSelectedDice] = useState<DiceType>(diceTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);

  const handleRoll = () => {
    onRoll(selectedDice, quantity, modifier);
  };

  return (
    <div className="space-y-6">
      {/* Dice Selection */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Tipo de Dado</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {diceTypes.map((dice) => (
            <button
              key={dice}
              onClick={() => setSelectedDice(dice)}
              className={`py-2 px-3 rounded-lg border-2 font-bold transition-all ${
                selectedDice === dice
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-input border-border text-foreground hover:border-primary'
              }`}
            >
              {dice.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Quantidade</label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="border-primary text-primary"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 bg-input border border-border rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="border-primary text-primary"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Modifier */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Modificador</label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setModifier(modifier - 1)}
            className="border-primary text-primary"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            className="w-20 bg-input border border-border rounded-lg px-3 py-2 text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setModifier(modifier + 1)}
            className="border-primary text-primary"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Roll Button */}
      <Button
        onClick={handleRoll}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-bold"
        style={{ fontFamily: 'Cinzel' }}
      >
        🎲 Rolar {quantity}x {selectedDice.toUpperCase()} {modifier > 0 ? `+${modifier}` : modifier < 0 ? modifier : ''}
      </Button>
    </div>
  );
}
