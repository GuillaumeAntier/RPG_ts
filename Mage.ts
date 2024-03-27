import Character from "./Character.ts";

export default class Mage extends Character {
  private magicAttack: number;
  private MaxManaPoints: number;
  private currentManaPoints: number;
  public type = "ally";

  constructor(
    name: string,
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxLifePoints: number,
    magicAttack: number,
    MaxManaPoints: number,
    inventory: string[],
  ) {
    super(
      name,
      physicalAttack,
      physicalDefense,
      speed,
      maxLifePoints,
      inventory,
    );
    this.magicAttack = magicAttack;
    this.MaxManaPoints = MaxManaPoints;
    this.currentManaPoints = MaxManaPoints;
  }

  public specialAttack(targets: Character[]) {
    console.log("");
    let target = targets[0];
    target.currentLifePoints -= this.magicAttack;
    this.currentManaPoints -= 10;
    if (target.currentLifePoints < 0) {
      target.currentLifePoints = 0;
    }
    console.log(
      "\x1b[37m%s\x1b[0m attacks with a \x1b[31m%s\x1b[0m \x1b[37m%s\x1b[0m for \x1b[31m%d\x1b[0m damage \x1b[37m%s\x1b[0m has \x1b[32m%d\x1b[0m HP left",
      this.name,
      "fire ball",
      target.name,
      this.magicAttack,
      target.name,
      target.currentLifePoints,
    );
    console.log("");
    console.log(
      "\x1b[37m%s\x1b[0m has \x1b[34m%d\x1b[0m mana points left",
      this.name,
      this.currentManaPoints,
    );
  }

  protected restoreMana() {
    console.log("");
    console.log(
      "\x1b[37m%s\x1b[0m restores \x1b[34m%d\x1b[0m mana points",
      this.name,
      this.MaxManaPoints * 0.3,
    );
    if (this.inventory.includes("Ether")) {
      this.currentManaPoints += this.MaxManaPoints * 0.3;
      if (this.currentManaPoints > this.MaxManaPoints) {
        this.currentManaPoints = this.MaxManaPoints;
      }
    }
  }
}
