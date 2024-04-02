import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Boss extends Character {
  public type = "enemy";

  public monsterAttack(target: Character[]) {
    let random = Math.floor(Math.random() * 100);
    if (random < 30) {
      console.log(
        "%s attacks all the characters with 40% of his physical attack",
        Color.red + this.name + Color.reset,
      );
      for (let characters of target) {
        let attack = (this.physicalAttack - characters.physicalDefense) * 0.4;
        if (attack < 0) {
          attack = 0;
        }
        this.currentLifePoints -= attack;
        if (characters.currentLifePoints < 0) {
          characters.currentLifePoints = 0;
          console.log(
            "%s attacks %s with %s points of damage. %s is dead.",
            Color.red + this.name + Color.reset,
            Color.cyan + characters.name + Color.reset,
            Color.red + attack + Color.reset,
            Color.cyan + characters.name + Color.reset,
          );
        } else {
          console.log(
            "%s attacks %s with %s points of damage. %s has %s life points left.",
            Color.red + this.name + Color.reset,
            Color.cyan + characters.name + Color.reset,
            Color.red + attack + Color.reset,
            Color.cyan + characters.name + Color.reset,
            Color.green + characters.currentLifePoints + Color.reset,
          );
          }
      }
    } else {
      random = Math.floor(Math.random() * target.length);
      let attack = this.physicalAttack - target[random].physicalDefense;
      if (attack < 0) {
        attack = 0;
      }
      target[random].currentLifePoints -= attack;
      if (target[random].currentLifePoints < 0) {
        target[random].currentLifePoints = 0;
        console.log(
          "%s attacks %s with %s points of damage. %s is dead.",
          Color.red + this.name + Color.reset,
          Color.cyan + target[random].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + target[random].name + Color.reset,
        );
      } else {
        console.log(
          "%s attacks %s with %s points of damage. %s has %s life points left.",
          Color.red + this.name + Color.reset,
          Color.cyan + target[random].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + target[random].name + Color.reset,
          Color.green + target[random].currentLifePoints + Color.reset,
        );
      }
    }
  }
}
