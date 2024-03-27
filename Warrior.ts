import Character from "./Character.ts";
import Menu from "./menu.ts";

export default class Warrior extends Character {
  type = "ally";

  specialAttack(targets: Character[]) {
    console.log("");
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Warrior have no special attack, he will attack normally.",
    );
    console.log("");
    this.attack(targets);
  }
}
