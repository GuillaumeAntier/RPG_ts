import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Thief extends Character {
  public type = "ally";
  public color = Color.black;

  public specialAttack(Character: Character[]) {
    console.log("");
    let random = Math.floor(Math.random() * 100);
    if (random < 40) {
      console.log(
        "%s stole nothing !", 
        Color.black + this.name + Color.reset,
      );
    } else if (random < 70 && random >= 40) {
      console.log(
        "%s stole a %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "potion" + Color.reset,
      );
    } else if (random < 85 && random >= 70) {
      console.log(
        "%s stole a %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "piece of star" + Color.reset,
      );
    } else if (random < 95 && random >= 85) {
      console.log(
        "%s stole an %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "ether" + Color.reset,
      );
    } else {
      console.log(
        "%s stole an %s !",
        Color.black + this.name + Color.reset,
        Color.magenta + "half star" + Color.reset,
      );
    }
  }
}
