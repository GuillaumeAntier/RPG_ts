import Inventory from "./Inventory.ts";
import Mage from "./mage.ts";
import Color from "./Color.ts";

// Create an abstract class named Character
export default abstract class Character {
  public name: string;
  public physicalAttack: number;
  public physicalDefense: number;
  public speed: number;
  public readonly maxLifePoints: number;
  public currentLifePoints: number;
  public type: string;
  public inventory: Inventory;
  public color: string;

  // Constructor with name, physicalAttack, physicalDefense, speed, maxLifePoints, and inventory parameters
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

  public attack(targets: Character[]) { // attack method
    let target = targets[0];
    let damage = this.physicalAttack - target.physicalDefense;
    if (damage < 0) { // if the damage is less than 0
      damage = 0;
    }
    target.currentLifePoints -= damage;
    if (target.currentLifePoints < 0) { // if the target is dead
      target.currentLifePoints = 0;
      console.log(
        "%s attacks %s for %s damage %s is dead",
        Color.red + this.name + Color.reset,
        Color.cyan + target.name + Color.reset,
        Color.red + damage + Color.reset,
        Color.cyan + target.name + Color.reset,
      );
    } else { // if the target is alive
      console.log(
        "%s attacks %s for %s damage %s has %s HP left",
        Color.red + this.name + Color.reset,
        Color.cyan + target.name + Color.reset,
        Color.red + damage + Color.reset,
        target.name,
        Color.green + target.currentLifePoints + Color.reset,
      );
    }
  }

  public heal(target: Character) { // heal method
    if (
      this.inventory.hasItem("Potion") == false || target.isAlive() == false // if the character doesn't have a potion or the target is dead
    ) {
      if (target.isAlive() == false) { // if the target is dead
        console.log(
          `${target.color}${target.name}${Color.reset} is dead you can't heal him`,
        );
      }
      return; // return
    } else { // if the character has a potion and the target is alive
      this.inventory.remove("Potion");
      let heal = target.maxLifePoints * 0.5;
      target.currentLifePoints += heal;
      console.log(
        "%s heals %s for %s HP",
        this.color + this.name + Color.reset,
        target.color + target.name + Color.reset,
        Color.green + heal + Color.reset,
      );
      if (target.currentLifePoints > target.maxLifePoints) { // if the target has more life points than his max life points
        target.currentLifePoints = target.maxLifePoints;
      }
      console.log(
        "%s has %s HP left",
        target.color + target.name + Color.reset,
        Color.green + target.currentLifePoints + Color.reset,
      );
    }
  }

  public revive(target: Character, item: string) { // revive method
    if (this.inventory.hasItem(item)) { // if the character has the item
      if (item == "Piece of Star") { // if the item is a piece of star
        this.inventory.remove(item);
        if (target.isAlive() === false) { // if the target is dead
          target.currentLifePoints = target.maxLifePoints * 0.2;
          console.log(
            "%s revives %s with %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        } else { // if the target is alive
          let heal = target.maxLifePoints * 0.5;
          if (target.currentLifePoints + heal > target.maxLifePoints) { // if the target has more life points than his max life points
            target.currentLifePoints = target.maxLifePoints;
          } else { // if the target has less life points than his max life points
            target.currentLifePoints = target.currentLifePoints +
              (target.maxLifePoints * 0.5);
          }
          console.log(
            "%s heals %s for %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        }
      } else if (item == "Half Star") { // if the item is a half star
        this.inventory.remove(item);
        if (target.isAlive() === false) { // if the target is dead
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            "%s revives %s with %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        } else { // if the target is alive
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            "%s heals %s for %s HP",
            this.name,
            Color.cyan + target.name + Color.reset,
            Color.green + target.currentLifePoints + Color.reset,
          );
        }
      }
    } else { // if the character doesn't have the item
      return;
    }
  }

  public restoreMana(target: Mage, name: string): boolean { // restoreMana method
    if (this.inventory.hasItem("Ether") == false) { // if the character doesn't have an ether
      return false;
    } else if (target.name == "Mage") { // if the target is a mage
      this.inventory.remove("Ether");
      let mana = target.MaxManaPoints * 0.3;
      if (target.currentManaPoints + mana > target.MaxManaPoints) { // if the target has more mana points than his max mana points
        target.currentManaPoints = target.MaxManaPoints;
      } else { // if the target has less mana points than his max mana points
        target.currentManaPoints = target.currentManaPoints + mana;
      }
      console.log(
        "%s restores %s points to %s",
        this.color + this.name + Color.reset,
        Color.blue + mana + Color.reset,
        Color.cyan + target.name + Color.reset,
      );
      if (target.currentManaPoints > target.MaxManaPoints) { // if the target has more mana points than his max mana points
        target.currentManaPoints = target.MaxManaPoints;
      }
      console.log(
        "%s has %s mana points left",
        target.color + target.name + Color.reset,
        Color.blue + target.currentManaPoints + Color.reset,
      );
      return true;
    } else { // if the target is not a mage
      console.log(
        "%s doesn't have mana points",
        name,
      );
      return false;
    }
  }

  public isAlive(): boolean { // isAlive method
    return this.currentLifePoints > 0;
  }

  public abstract specialAttack(targets: Character[]): void; // abstract specialAttack method
}
