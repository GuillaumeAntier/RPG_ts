import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Priest extends Character {
  public type = "ally";
  public color = Color.magenta;

  public specialAttack(targetAllies: Character[]) {
    for (let i = 0; i < targetAllies.length; i++) {
      console.log(
        i + 1,
        targetAllies[i].name,
        targetAllies[i].currentLifePoints,
      );
    }
    let targetHeal = prompt("Choose an ally to heal");
    while (targetHeal === null) {
      prompt("Choose an ally to heal");
    }
    let target = parseInt(targetHeal) - 1;
    targetAllies[target].currentLifePoints += this.maxLifePoints * 0.25;
    if (
      targetAllies[target].currentLifePoints >
        targetAllies[target].maxLifePoints
    ) {
      targetAllies[target].currentLifePoints =
        targetAllies[target].maxLifePoints;
    }
    console.log(
      "%s heals %s for %s points of life. %s has %s life points left.",
      Color.magenta + this.name + Color.reset,
      Color.cyan + targetAllies[target].name + Color.reset,
      Color.green + this.maxLifePoints * 0.25 + Color.reset,
      Color.cyan + targetAllies[target].name + Color.reset,
      Color.green + targetAllies[target].currentLifePoints + Color.reset,
    );
  }
}
