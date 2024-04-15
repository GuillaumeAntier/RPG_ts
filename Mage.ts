import Character from "./Character.ts";
import Inventory from "./Inventory.ts";
import Color from "./Color.ts";

export default class Mage extends Character { // Mage class that extends Character
  public magicAttack: number;
  public MaxManaPoints: number;
  public currentManaPoints: number;
  public type: string = "ally";
  public color = Color.blue;

  constructor( // constructor with name, physicalAttack, physicalDefense, speed, maxLifePoints, magicAttack, MaxManaPoints, and inventory parameters
    name: string,
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxLifePoints: number,
    magicAttack: number,
    MaxManaPoints: number,
    inventory: Inventory,
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
    this.type = "ally";
  }

  public specialAttack(targets: Character[]) { // special attack method
    console.log("");
    let target = targets[0];
    target.currentLifePoints -= this.magicAttack;
    this.currentManaPoints -= 10;
    if (target.currentLifePoints < 0) { // if the target is dead
      target.currentLifePoints = 0;
      console.log(
        "%s attacks with a %s %s for %s damage %s is dead",
        Color.blue + this.name + Color.reset,
        Color.red + "fireball" + Color.reset,
        Color.cyan + target.name + Color.reset,
        Color.red + this.magicAttack + Color.reset,
        Color.cyan + target.name + Color.reset,
      );
    } else { // if the target is alive
      console.log(
        "%s attacks with a %s %s for %s damage %s has %s HP left",
        Color.blue + this.name + Color.reset,
        Color.red + "fireball" + Color.reset,
        Color.cyan + target.name + Color.reset,
        Color.red + this.magicAttack + Color.reset,
        Color.cyan + target.name + Color.reset,
        Color.green + target.currentLifePoints + Color.reset,
      );
    }
    console.log("");
    console.log(
      "%s has %s mana points left",
      Color.blue + this.name + Color.reset,
      Color.blue + this.currentManaPoints + Color.reset,
    );
  }
}
