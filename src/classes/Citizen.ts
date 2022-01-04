export interface CitizenProps {
  role?: "noble" | "soldier" | "hero" | "worker" | "invalid" | "child";
  // temper: "sanguine" | "choleric" | "phlegmatic" | "melancholic";
  birthTick?: number;
}

const firstNames = ["Zaphod", "Mung", "Brox", "Sheen", "Azuri"];
const lastNames = ["Nefer", "Juul", "Kong"];

export class Citizen {
  name: string = "";
  role: "noble" | "soldier" | "hero" | "worker" | "invalid" | "child" = "worker";
  temper: "sanguine" | "choleric" | "phlegmatic" | "melancholic" = "sanguine";
  birthTick: number = 0;
  health: number = 100;

  constructor(props: CitizenProps) {
    this.name =
      firstNames[Math.floor(Math.random() * firstNames.length)] +
      lastNames[Math.floor(Math.random() * lastNames.length)];
    Object.assign(this, props);
  }
}
