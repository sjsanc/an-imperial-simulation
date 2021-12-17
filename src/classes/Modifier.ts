enum ModifierEffects {
  REDUCE = "reduce",
  NONE = "none",
}

export class Modifier {
  name: string = "";
  description: string = "";
  target: string = "";
  effect: ModifierEffects = ModifierEffects.NONE;

  constructor(init: Partial<Modifier>) {
    Object.assign(this, init);
  }
}
