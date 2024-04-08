import Character from "./Character.ts";
import Color from "./Color.ts";


export default class Warrior extends Character {
  public type = "ally";

  public specialAttack(targets: Character[]) {
    console.log("");
    console.log(
      "%s have no special attack, he will attack normally.",
      Color.green + this.name + Color.reset,
    );
    console.log("");
    this.attack(targets);
  }
}
