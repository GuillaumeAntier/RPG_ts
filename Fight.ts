import Character from "./Character.ts";
import Menu from "./menu.ts";

export default class Fight {
  private allies: Character[];
  private ennemies: Character[];
  protected turn: number = 0;

  constructor(allies: Character[], ennemies: Character[]) {
    this.allies = allies;
    this.ennemies = ennemies;
  }

  private getSpeedOrder() {
    let characters = this.allies.concat(this.ennemies);
    characters.sort((a, b) => b.speed - a.speed);
    return characters;
  }

  private isFightOver() {
    let isAlliesAlive = this.allies.some((ally) => ally.isAlive());
    let isEnnemiesAlive = this.ennemies.some((ennemy) => ennemy.isAlive());
    return !isAlliesAlive || !isEnnemiesAlive;
  }

  public winner() {
    if (this.isFightOver()) {
      if (this.allies.some((ally) => ally.isAlive())) {
        return "Allies";
      } else {
        return "Ennemies";
      }
    }
  }

  private displayFight() {
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

  private targetSelection() {
    let menu = new Menu(this.ennemies.map((ennemy) => ennemy.name));
    let choice = menu.selection;
    while (choice === null) {
      choice = menu.selection;
    }
    if (choice === "1") {
      return [this.ennemies[0]];
    } else if (choice === "2") {
      return [this.ennemies[1]];
    } else if (choice === "3") {
      return [this.ennemies[2]];
    } else {
      console.log("Invalid choice");
      return this.targetSelection();
    }
  }

  public async fight() {
    let turn = 1;
    let characters = this.getSpeedOrder();
    let playerTurn = 0;
    while (!this.isFightOver() && playerTurn < characters.length) {
      let character = characters[playerTurn];
      this.displayFight();
      if (character.isAlive()) {
        console.log("\n");
        console.log("\x1b[36m%s\x1b[0m", `${character.name}'s turn`);
        console.log("\n");
        if (character.type === "ally") {
          let menu = new Menu(["Attack", "Special Attack", "Item"]);
          let choice = menu.selection;
          if (choice === "1") {
            let target = this.targetSelection();
            character.attack(target);
          } else if (choice === "2") {
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
      playerTurn++;
      if (playerTurn === characters.length) {
        playerTurn = 0;
        console.log(`End of turn ${turn}`);
        turn++;
        console.log("\n");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("\x1b[33m%s\x1b[0m", `Turn ${turn}`);
      }
    }
    console.log("\n");
    console.log(`The fight is over, the winner is ${this.winner()}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
