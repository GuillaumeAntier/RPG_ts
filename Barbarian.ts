import Character from "./Character.ts";

export default class Barbarian extends Character {
  public type = "ally";
  public currentLifePoints = 0;

  public specialAttack(target: Character[]) {
    console.log("");
    let aliveTargets = target.filter((target) => target.currentLifePoints > 0);
    aliveTargets.sort((a, b) => a.currentLifePoints - b.currentLifePoints);
    let random = Math.floor(Math.random() * aliveTargets.length);
    let attack = Math.round(
      this.physicalAttack - aliveTargets[random].physicalDefense * 1.3,
    );
    aliveTargets[random].currentLifePoints -= attack;
    if (aliveTargets[random].currentLifePoints < 0) {
      aliveTargets[random].currentLifePoints = 0;
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m has \x1b[31m%d\x1b[0m life points left.",
        this.name,
        aliveTargets[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        aliveTargets[random].name,
        aliveTargets[random].currentLifePoints,
      );
    }
    this.currentLifePoints -= this.maxLifePoints * 0.2;
    if (this.currentLifePoints < 0) {
      this.currentLifePoints = 0;
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m is dead.",
        this.name,
        aliveTargets[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        aliveTargets[random].name,
      );
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m has \x1b[31m%d\x1b[0m life points left.",
        this.name,
        aliveTargets[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        aliveTargets[random].name,
        aliveTargets[random].currentLifePoints,
      );
    }
  }
}
