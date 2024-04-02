import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Thief extends Character {
  public type = "ally";

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
        "\x1b[30m%s\x1b[0m stole a" + "\x1b[35m" + " piece of star " +
          "\x1b[0m !",
        this.name,
      );
    } else if (random < 95 && random >= 85) {
      console.log(
        "\x1b[30m%s\x1b[0m stole a" + "\x1b[35m" + " ether " + "\x1b[0m !",
        this.name,
      );
    } else {
      console.log(
        "\x1b[30m%s\x1b[0m stole an" + "\x1b[35m" + " half star " + "\x1b[0m !",
        this.name,
      );
    }
  }
}
