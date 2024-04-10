import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Barbarian extends Character {
  public currentLifePoints: number =40;
  public type: string = "ally";
  public color = Color.red;

  public specialAttack(target: Character[]) {
    console.log("");
    let aliveTargets = target.filter((target) => target.currentLifePoints > 0);
    aliveTargets.sort((a, b) => a.currentLifePoints - b.currentLifePoints);
    let random = Math.floor(Math.random() * aliveTargets.length);
    let attack = Math.round(
      (this.physicalAttack - aliveTargets[random].physicalDefense) * 1.3,
    );
    aliveTargets[random].currentLifePoints -= attack;
    if (aliveTargets[random].currentLifePoints < 0) {
      aliveTargets[random].currentLifePoints = 0;
      console.log(
        "%s enters a rage and attacks %s with %s points of damage, but also takes 20% of his max life points in damage. %s has %s life points left and %s is dead.",
        Color.red + this.name + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.red + attack + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.green + aliveTargets[random].currentLifePoints + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
      );
    }
    this.currentLifePoints -= this.maxLifePoints * 0.2;
    if (this.currentLifePoints < 0) {
      this.currentLifePoints = 0;
      console.log(
        "%s enters a rage and attacks %s with %s points of damage, but also takes 20% of his max life points in damage. %s has %s HP left so he dies and %s has %s life points left.",
        Color.red + this.name + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.red + attack + Color.reset,
        Color.red + this.name + Color.reset,
        Color.green + this.currentLifePoints + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.green + aliveTargets[random].currentLifePoints + Color.reset,
      );
    } else {
      console.log(
        "%s enters a rage and attacks %s with %s points of damage, but also takes 20% of his max life points in damage. %s has %s life points left and %s has %s life points left.",
        Color.red + this.name + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.red + attack + Color.reset,
        Color.red + this.name + Color.reset,
        Color.green + this.currentLifePoints + Color.reset,
        Color.cyan + aliveTargets[random].name + Color.reset,
        Color.green + aliveTargets[random].currentLifePoints + Color.reset,
      );
    }
  }
}
