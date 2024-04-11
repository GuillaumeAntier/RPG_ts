import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Thief extends Character { // Thief class that extends Character
  public type = "ally";
  public color = Color.black;

  public specialAttack(Character: Character[]) { // special attack method
    console.log("");
    let random = Math.floor(Math.random() * 100); // random number between 0 and 100
    if (random < 40) { // if random number is less than 40 get nothing
      console.log(
        "%s stole nothing !",
        Color.black + this.name + Color.reset,
      );
    } else if (random < 70 && random >= 40) { // if random number is less than 70 and greater than or equal to 40 get a potion
      console.log(
        "%s stole a %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "potion" + Color.reset,
      );
    } else if (random < 85 && random >= 70) { // if random number is less than 85 and greater than or equal to 70 get a piece of star
      console.log(
        "%s stole a %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "piece of star" + Color.reset,
      );
    } else if (random < 95 && random >= 85) { // if random number is less than 95 and greater than or equal to 85 get an ether
      console.log(
        "%s stole an %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "ether" + Color.reset,
      );
    } else { // if random number is greater than or equal to 95 get a half star
      console.log(
        "%s stole an %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "half star" + Color.reset,
      );
    }
  }
}
