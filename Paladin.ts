import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Paladin extends Character {
  public type = "ally";

  public specialAttack(target: Character[]) {
    console.log(
      "%s attacks all the characters with is %s, dealing 40%% of his physical attack in damage to each one.",
      Color.yellow + this.name + Color.reset,
      Color.yellow + "holy light" + Color.reset
    );
    for (let i = 0; i < target.length; i++) {
      let attack = Math.round(
        this.physicalAttack - target[i].physicalDefense * 0.4,
      );
      target[i].currentLifePoints -= attack;
      if (target[i].currentLifePoints < 0) {
        target[i].currentLifePoints = 0;
        console.log(
          "%s attacks %s with %s points of damage. %s is dead.",
          Color.yellow + this.name + Color.reset,
          Color.cyan + target[i].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + target[i].name + Color.reset,
        );
      } else {
        console.log(
          "%s attacks %s with %s points of damage. %s has %s life points left.",
          Color.yellow + this.name + Color.reset,
          Color.cyan + target[i].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + target[i].name + Color.reset,
          Color.green + target[i].currentLifePoints + Color.reset,
        );
      }
    }
  }
}
