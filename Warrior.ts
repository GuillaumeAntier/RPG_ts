import Character from "./Character.ts";
import Color from "./Color.ts";


export default class Warrior extends Character {
  public type = "ally";
  public color = Color.green;

  public specialAttack(targets: Character[]) {
    console.log("");
    console.log(
      Color.yellow + "Warrior have no special attack, he will attack normally.",
    );
    console.log("");
    this.attack(targets);
  }
}
