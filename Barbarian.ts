import Character from "./Character.ts";

export default class Barbarian extends Character {
  public type = "ally";

  public specialAttack(target: Character[]) {
    console.log("");
    let random = Math.floor(Math.random() * target.length);
    let attack = Math.round(
      this.physicalAttack - target[random].physicalDefense * 1.3,
    );
    target[random].currentLifePoints -= attack;
    if (target[random].currentLifePoints < 0) {
      target[random].currentLifePoints = 0;
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m has \x1b[31m%d\x1b[0m life points left.",
        this.name,
        target[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        target[random].name,
        target[random].currentLifePoints,
      );
    }
    this.currentLifePoints -= this.maxLifePoints * 0.2;
    if (this.currentLifePoints < 0) {
      this.currentLifePoints = 0;
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m is dead.",
        this.name,
        target[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        target[random].name,
      );
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m enters a rage and attacks \x1b[36m%s\x1b[0m with \x1b[31m%d\x1b[0m points of damage, but also takes 20% of his max life points in damage. \x1b[31m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left and \x1b[36m%s\x1b[0m has \x1b[31m%d\x1b[0m life points left.",
        this.name,
        target[random].name,
        attack,
        this.name,
        this.currentLifePoints,
        target[random].name,
        target[random].currentLifePoints,
      );
    }
  }
}
