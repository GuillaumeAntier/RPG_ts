import GameManager from "./GameManager.ts";
import Inventory from "./Inventory.ts";
import Mage from "./mage.ts";

export default class Character {
  public name: string;
  protected physicalAttack: number;
  public physicalDefense: number;
  public speed: number;
  protected maxLifePoints: number;
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
    }
    console.log(
      `${this.name} attacks ${target.name} for ${damage} damage ${target.name} has ${target.currentLifePoints} HP left`,
    );
  }

  public heal(target: Character) {
    if (this.inventory.has("Potion") == false) {
      return;
    } else {
      this.inventory.remove("Potion");
      let heal = this.maxLifePoints * 0.5;
      target.currentLifePoints += heal;
      console.log(`${this.name} heals ${target.name} for ${heal} HP`);
      if (target.currentLifePoints > target.maxLifePoints) {
        target.currentLifePoints = target.maxLifePoints;
      }
      console.log(`${target.name} has ${target.currentLifePoints} HP left`);
    }
  }

  public revive(target: Character, item: string) {
    if (this.inventory.has(item)) {
      if (item == "Piece of Star") {
        this.inventory.remove(item);
        if (target.isAlive() == false) {
          target.currentLifePoints = target.maxLifePoints * 0.2;
          console.log(
            `${this.name} revives ${target.name} with ${target.currentLifePoints} HP`,
          );
        } else {
          target.currentLifePoints = target.maxLifePoints * 0.5;
          console.log(
            `${this.name} heals ${target.name} for ${target.currentLifePoints} HP`,
          );
        }
      } else if (item == "Half Star") {
        this.inventory.remove(item);
        if (target.isAlive() == false) {
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            `${this.name} revives ${target.name} with ${target.currentLifePoints} HP`,
          );
        } else {
          target.currentLifePoints = target.maxLifePoints;
          console.log(
            `${this.name} heals ${target.name} for ${target.currentLifePoints} HP`,
          );
        }
      }
    } else {
      return;
    }
  }

  public restoreMana(target: Mage, name: string) {
    if (this.inventory.has("Ether") == false) {
      return false;
    } else if (target.name == "Mage") {
      this.inventory.remove("Ether");
      let mana = target.MaxManaPoints * 0.3;
      console.log(`${name} restores ${mana} points to ${target.name}`);
      if (target.currentManaPoints > target.MaxManaPoints) {
        target.currentManaPoints = target.MaxManaPoints;
      }
      console.log(
        `${target.name} has ${target.currentManaPoints} mana points left`,
      );
      return true;
    } else {
      console.log(`${name} doesn't have mana points`);
      return false;
    }
  }

  public isAlive(): boolean {
    return this.currentLifePoints > 0;
  }

  public specialAttack(targets: Character[]) {
  }

  public monsterAttack(target: Character[]) {
  }
}
