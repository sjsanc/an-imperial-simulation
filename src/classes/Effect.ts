import { DataClasses } from "../types/types";

export interface EffectProps {
  name: string;
  description: string;
  message: React.ReactNode;
}

export class Effect {
  name: string = "";
  description: string = "";
  message: string = "";
  index: number = 0;

  type = "effects" as keyof DataClasses;
  // engine: GameEngine;

  constructor(props: EffectProps) {
    Object.assign(this, props);
  }
}

// Example effects
// RaisePopCap -- raises the global popcap by N for the duration of the effect. Stacks
// Winter -- reduces the yield of farming jobs that complete during its duraiton
// Pestilence -- reduces the empire fertility / sanitation / constitution for its duration
// Arcane Torrents -- increases empire mana regeneration by X for its duration
