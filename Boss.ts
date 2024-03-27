import Character from "./Character.ts";

export default class Boss extends Character {
  public type = "enemy";

  public monsterAttack(target: Character[]) {
    let random = Math.floor(Math.random() * 100);
    if (random < 30) {
      console.log(
        `${this.name} attacks all the characters with 40% of his physical attack`,
      );
      for (let characters of target) {
        console.log(`${this.name} attacks ${characters.name}`);
        characters.currentLifePoints -=
          (this.physicalAttack - characters.physicalDefense) * 0.4;
        console.log(
          `${characters.name} has ${characters.currentLifePoints} life points left`,
        );
        if (characters.currentLifePoints < 0) {
          characters.currentLifePoints = 0;
        }
      }
    } else {
      random = Math.floor(Math.random() * target.length);
      console.log(`${this.name} attacks ${target[random].name}`);
      target[random].currentLifePoints -= this.physicalAttack -
        target[random].physicalDefense;
      console.log(
        `${this.name} attacks ${target[random].name} with ${
          this.physicalAttack - target[random].physicalDefense
        } points of damage. ${target[random].name} has ${
          target[random].currentLifePoints
        } life points left.`,
      );
      if (target[random].currentLifePoints < 0) {
        target[random].currentLifePoints = 0;
      }
    }
  }
}
