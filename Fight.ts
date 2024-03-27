import Character from "./Character.ts";
import Menu from "./menu.ts";

export default class Fight {
  allies: Character[];
  ennemies: Character[];
  turn: number = 0;

  constructor(allies: Character[], ennemies: Character[]) {
    this.allies = allies;
    this.ennemies = ennemies;
  }

  getSpeedOrder() {
    let characters = this.allies.concat(this.ennemies);
    characters.sort((a, b) => b.speed - a.speed);
    return characters;
  }

  isFightOver() {
    let isAlliesAlive = this.allies.some((ally) => ally.isAlive());
    let isEnnemiesAlive = this.ennemies.some((ennemy) => ennemy.isAlive());
    return !isAlliesAlive || !isEnnemiesAlive;
  }

  winner() {
    if (this.isFightOver()) {
      if (this.allies.some((ally) => ally.isAlive())) {
        return "Allies";
      } else {
        return "Ennemies";
      }
    }
  }

  displayFight() {
    console.clear();
    console.log("\n");
    console.log("\x1b[32m%s\x1b[0m", "Allies");
    for (let ally of this.allies) {
      console.log(
        `${ally.name} : ` + "\x1b[32m" + `${ally.currentLifePoints} PV` +
          "\x1b[0m",
      );
    }
    console.log("\n");
    console.log("\x1b[31m%s\x1b[0m", "Ennemies");
    for (let ennemy of this.ennemies) {
      console.log(
        `${ennemy.name} : ` + "\x1b[31m" + `${ennemy.currentLifePoints} PV` +
          "\x1b[0m",
      );
    }
  }

  targetSelection() {
    let menu = new Menu(this.ennemies.map((ennemy) => ennemy.name));
    let choice = menu.selection;
    while (choice === null) {
      choice = menu.selection;
    }
    if (choice === "0") {
      return [this.ennemies[0]];
    } else if (choice === "1") {
      return [this.ennemies[1]];
    } else if (choice === "2") {
      return [this.ennemies[2]];
    } else {
      console.log("Invalid choice");
      return this.targetSelection();
    }
  }

  async fight() {
    let turn = 1;
    let characters = this.getSpeedOrder();
    while (!this.isFightOver()) {
      this.displayFight();
      console.log("\n");
      console.log("\x1b[33m%s\x1b[0m", `Turn ${turn}`);
      for (let character of characters) {
        if (character.isAlive()) {
          console.log("\n");
          console.log("\x1b[36m%s\x1b[0m", `${character.name}'s turn`);
          console.log("\n");
          if (character.type === "ally") {
            let menu = new Menu(["Attack", "Special Attack", "Item"]);
            let choice = menu.selection;
            if (choice === "0") {
              let target = this.targetSelection();
              character.attack(target);
            } else if (choice === "1") {
              if (character.name === "Priest") {
                character.specialAttack(this.allies);
              } else if (character.name === "Paladin") {
                character.specialAttack(this.ennemies);
              } else if (character.name === "Thief") {
                character.specialAttack(this.ennemies);
              } else if (character.name === "Barbarian") {
                character.specialAttack(this.ennemies);
              } else {
                let target = this.targetSelection();
                character.specialAttack(target);
              }
            } else {
              console.log("No item available");
            }
          } else if (character.type === "enemy") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            character.monsterAttack(this.allies);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } else {
          console.log(character.name + " is dead");
        }
      }
      console.log(`End of turn ${turn}`);
      turn++;
    }
    console.log(this.winner() + " won the fight");
  }
}
