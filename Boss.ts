import Character from "./Character.ts";
import Color from "./Color.ts";

// Boss class that extends Character
export default class Boss extends Character {
  public type: string = "enemy";

  public specialAttack(target: Character[]) { // special attack method
    let random = Math.floor(Math.random() * 100); // random number between 0 and 100
    if (random < 30) { // if random number is less than 30
      console.log(
        "%s attacks all the characters with 40% of his physical attack",
        Color.red + this.name + Color.reset,
      );
      for (let characters of target) { // for each character in the target array
        let attack = (this.physicalAttack - characters.physicalDefense) * 0.4;
        if (attack < 0) {
          attack = 0;
        }
        this.currentLifePoints -= attack;
        if (characters.currentLifePoints < 0) { // if the character is dead
          characters.currentLifePoints = 0;
          console.log(
            "%s attacks %s with %s points of damage. %s is dead.",
            Color.red + this.name + Color.reset,
            Color.cyan + characters.name + Color.reset,
            Color.red + attack + Color.reset,
            Color.cyan + characters.name + Color.reset,
          );
        } else { // if the character is alive
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
    } else { // if random number is greater than 30
      random = Math.floor(Math.random() * target.length); // random number between 0 and the length of the target array
      let attack = this.physicalAttack - target[random].physicalDefense;
      if (attack < 0) {
        attack = 0;
      }
      target[random].currentLifePoints -= attack;
      if (target[random].currentLifePoints < 0) { // if the target is dead
        target[random].currentLifePoints = 0;
        console.log(
          "%s attacks %s with %s points of damage. %s is dead.",
          Color.red + this.name + Color.reset,
          Color.cyan + target[random].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + target[random].name + Color.reset,
        );
      } else { // if the target is alive
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
