import Character from "./Character.ts";

export default class Paladin extends Character {
  type = "ally";

  specialAttack(target: Character[]) {
    console.log(
      `${this.name} attacks all the characters with a holy light, dealing 40% of his physical attack in damage to each one.`,
    );
    for (let i = 0; i < target.length; i++) {
      let attack = Math.round(
        this.physicalAttack - target[i].physicalDefense * 0.4,
      );
      target[i].currentLifePoints -= attack;
      if (target[i].currentLifePoints < 0) {
        target[i].currentLifePoints = 0;
        console.log(
          `${this.name} attacks ${
            target[i].name
          } with ${attack} points of damage. ${
            target[i].name
          } has 0 life points left.`,
        );
      } else {
        console.log(
          `${this.name} attacks ${
            target[i].name
          } with ${attack} points of damage. ${target[i].name} has ${
            target[i].currentLifePoints
          } life points left.`,
        );
      }
    }
  }
}
