import Character from "./Character.ts";
import Color from "./Color.ts";

export default class Monster extends Character {
  public type = "enemy";

  public monsterAttack(target: Character[]) {
    let aliveTargets = target.filter((target) => target.currentLifePoints > 0);
    aliveTargets.sort((a, b) => a.currentLifePoints - b.currentLifePoints);
    let random = Math.floor(Math.random() * 100);
    if (random < 20) {
      let attack = aliveTargets[0].currentLifePoints -= this.physicalAttack;
      if (attack < 0) {
        attack = 0;
      }
      if (aliveTargets[0].currentLifePoints < 0) {
        aliveTargets[0].currentLifePoints = 0;
        console.log(
          "%s attacks %s with %s points of damage. %s is dead.",
          Color.red + this.name + Color.reset,
          Color.cyan + aliveTargets[0].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + aliveTargets[0].name + Color.reset,
        )
      } else {
        console.log(
          "%s attacks %s with %s points of damage. %s has %s life points left.",
          Color.red + this.name + Color.reset,
          Color.cyan + aliveTargets[0].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + aliveTargets[0].name + Color.reset,
          Color.green + aliveTargets[0].currentLifePoints + Color.reset,
        );
      }
    } else {
      random = Math.floor(Math.random() * aliveTargets.length);
      let attack = aliveTargets[random].currentLifePoints -=
        this.physicalAttack;
      if (attack < 0) {
        attack = 0;
      }
      if (aliveTargets[random].currentLifePoints < 0) {
        aliveTargets[random].currentLifePoints = 0;
        console.log(
          "%s attacks %s with %s points of damage. %s is dead.",
          Color.red + this.name + Color.reset,
          Color.cyan + aliveTargets[random].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + aliveTargets[random].name + Color.reset,
        );
      } else {
        console.log(
          "%s attacks %s with %s points of damage. %s has %s life points left.",
          Color.red + this.name + Color.reset,
          Color.cyan + aliveTargets[random].name + Color.reset,
          Color.red + attack + Color.reset,
          Color.cyan + aliveTargets[random].name + Color.reset,
          Color.green + aliveTargets[random].currentLifePoints + Color.reset,
        );
      }
    }
  }
}
