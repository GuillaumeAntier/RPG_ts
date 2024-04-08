import Inventory from "./Inventory.ts";
import Mage from "./mage.ts";
import Color from "./Color.ts";

export default abstract class Character {
  public name: string;
  protected physicalAttack: number;
  public physicalDefense: number;
  public speed: number;
  public maxLifePoints: number;
  public currentLifePoints: number;
  public type: string;
  public inventory: Inventory;

  constructor(
    name: string,
    physicalAttack: number,
    physicalDefense: number,
    speed: number,
    maxLifePoints: number,
    inventory: Inventory,
  ) {
    this.name = name;
    this.physicalAttack = physicalAttack;
    this.physicalDefense = physicalDefense;
    this.speed = speed;
    this.maxLifePoints = maxLifePoints;
    this.currentLifePoints = maxLifePoints;
    this.inventory = inventory;
  }

  public attack(targets: Character[]) {
    let target = targets[0];
    let damage = this.physicalAttack - target.physicalDefense;
    if (damage < 0) {
      damage = 0;
    }
    target.currentLifePoints -= damage;
    if (target.currentLifePoints < 0) {
      target.currentLifePoints = 0;
      console.log(
        "$%s attacks %s for %s damage %s is dead",
        this.name,
        Color.cyan + target.name + Color.reset,
        Color.red + damage + Color.reset,
        Color.cyan + target.name + Color.reset,
      );
    } else {
      console.log(
        "$%s attacks %s for %s damage %s has %s HP left",
        this.name,
        Color.cyan + target.name + Color.reset,
        Color.red + damage + Color.reset,
        target.name,
        Color.green + target.currentLifePoints + Color.reset,
      );
    }
  }

  public heal(target: Character) {
    if (this.inventory.has("Potion") == false || target.isAlive() == false) {
      if (target.isAlive() == false) {
        console.log(`${target.name} is dead you can't heal him`);
      }
      return;
    } else {
      this.inventory.remove("Potion");
      let heal = target.maxLifePoints * 0.5;
      target.currentLifePoints += heal;
      console.log(
        "%s heals %s for %s HP",
        this.name,
        target.name,
        heal,
      );
      if (target.currentLifePoints > target.maxLifePoints) {
        target.currentLifePoints = target.maxLifePoints;
      }
      console.log(
        "$%s has %s HP left",
        target.name,
        Color.green + target.currentLifePoints + Color.reset,
      );
    }
  }

  public revive(target: Character, item: string) {
    if (this.inventory.has(item)) {
      if (item == "Piece of Star") {
        this.inventory.remove(item);
        if (target.isAlive() === false) {
          target.currentLifePoints = target.maxLifePoints * 0.2;
          console.log(
            "%s revives %s with %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        } else {
          target.currentLifePoints = target.maxLifePoints * 0.5;
          console.log(
            "%s heals %s for %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        }
      } else if (item == "Half Star") {
        this.inventory.remove(item);
        if (target.isAlive() === false) {
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            "$%s revives %s with %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        } else {
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            "%s heals %s for %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        }
      }
    } else {
      return;
    }
  }

  public restoreMana(target: Mage, name: string) : boolean {
    if (this.inventory.has("Ether") == false) {
      return false;
    } else if (target.name == "Mage") {
      this.inventory.remove("Ether");
      let mana = target.MaxManaPoints * 0.3;
      console.log(
        "$%s restores %s points to %s",
        this.name,
        Color.blue + mana + Color.reset,
        Color.cyan + target.name + Color.reset,
      );
      if (target.currentManaPoints > target.MaxManaPoints) {
        target.currentManaPoints = target.MaxManaPoints;
      }
      console.log(
        "%s has %s mana points left",
        target.name,
        Color.blue + target.currentManaPoints + Color.reset,
      );
      return true;
    } else {
      console.log(
        "%s doesn't have mana points",
        name,
      );
      return false;
    }
  }

  public isAlive(): boolean {
    return this.currentLifePoints > 0;
  }

  public abstract specialAttack(targets: Character[]) : void;
}
