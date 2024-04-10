import Character from "./Character.ts";
import Menu from "./Menu.ts";
import Color from "./Color.ts";
import mage from "./mage.ts";

export default class Fight {
  private allies: Character[];
  private ennemies: Character[];
  protected turn: number;

  constructor(allies: Character[], ennemies: Character[]) {
    this.allies = allies;
    this.ennemies = ennemies;
    this.turn = 0;
  }

  private get SpeedOrder(): Character[] {
    let characters = this.allies.concat(this.ennemies);
    characters.sort((a, b) => b.speed - a.speed);
    return characters;
  }

  private isFightOver(): boolean {
    let isAlliesAlive = this.allies.some((ally) => ally.isAlive());
    let isEnnemiesAlive = this.ennemies.some((ennemy) => ennemy.isAlive());
    return !isAlliesAlive || !isEnnemiesAlive;
  }

  public winner(): string {
    if (this.isFightOver()) {
      if (this.allies.some((ally) => ally.isAlive())) {
        return "Allies";
      } else {
        return "Ennemies";
      }
    } else {
      return "The fight is not over yet";
    }
  }

  private displayFight() {
    let alliesDisplay: string[] = [];
    let enemiesDisplay: string[] = [];

    for (let ally of this.allies) {
        if (ally instanceof mage) {
            alliesDisplay.push(
                `${ally.name} : ` + Color.green + `${ally.currentLifePoints}/${ally.maxLifePoints} HP` +
                Color.reset + ' | ' + Color.blue + `${ally.currentManaPoints}/${ally.MaxManaPoints} MP` + Color.reset + " ".repeat(15)
            );
        } else {
            alliesDisplay.push(
                `${ally.name} : ` + Color.green + `${ally.currentLifePoints}/${ally.maxLifePoints} PV` +
                Color.reset
            );
        }
    }

    for (let enemy of this.ennemies) {
        enemiesDisplay.push(
            `${enemy.name} : ` + Color.red + `${enemy.currentLifePoints}/${enemy.maxLifePoints} HP` +
            Color.reset
        );
    }

    let maxRows = Math.max(alliesDisplay.length, enemiesDisplay.length);
    let display = "";

    for (let i = 0; i < maxRows; i++) {
        let allyRow = i < alliesDisplay.length ? alliesDisplay[i] : '';
        let enemyRow = i < enemiesDisplay.length ? enemiesDisplay[i] : '';
        display += allyRow.padEnd(50) + enemyRow + '\n';
    }

    console.log("\n");
    console.log(Color.green + "Allies" + Color.reset + " ".repeat(35) + Color.red + "Ennemies" + Color.reset, '\n')
    console.log(display);
}

  private targetSelection(character: Character) {
    let ennemyMenu: string[] = [];
    for (let i = 0; i < this.ennemies.length; i++) {
      let estimatedDamage = this.ennemies[i].currentLifePoints - (character.physicalAttack - this.ennemies[i].physicalDefense);
      if (estimatedDamage < 0) {
        estimatedDamage = 0;
      }
      ennemyMenu.push(this.ennemies[i].name + " " + Color.red + this.ennemies[i].currentLifePoints + "/" + this.ennemies[i].maxLifePoints + " HP" + Color.reset +
      " ".repeat(10) +  Color.black +  "Estimated life" + " ".repeat(3) + estimatedDamage + "/" + this.ennemies[i].maxLifePoints + " HP" + Color.reset
      );
    }
    ennemyMenu.push("Return");
    console.log("Choose a target to attack:");
    let menu = new Menu(ennemyMenu);
    let choice = menu.selection;
    while (choice === null) {
      choice = menu.selection;
    }
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4") {
      console.log("Invalid choice");
      return this.targetSelection(character);
    }
    if (choice === "1" && this.ennemies[0].currentLifePoints > 0) {
      return [this.ennemies[0]];
    } else if (choice === "2" && this.ennemies[1].currentLifePoints > 0) {
      return [this.ennemies[1]];
    } else if (choice === "3" && this.ennemies[2].currentLifePoints > 0) {
      return [this.ennemies[2]];
    } else if (choice === "4") {
      return "return";
    } else if (this.ennemies[parseInt(choice) - 1].currentLifePoints <= 0) {
      console.log("This ennemy is dead");
    } else {
      console.log("Invalid choice");
    }
    return this.targetSelection(character);
  }

  private allySelection() {
    let allyMenu: string[] = [];
    for (let i = 0; i < this.allies.length; i++) {
      allyMenu.push(this.allies[i].name);
    }
    allyMenu.push("Return");
    console.log("Choose an ally to heal:");
    let menu = new Menu(allyMenu);
    let choice = menu.selection;
    while (choice === null) {
      choice = menu.selection;
    }
    if (choice === "1") {
      return this.allies[0];
    } else if (choice === "2") {
      return this.allies[1];
    } else if (choice === "3") {
      return this.allies[2];
    } else if (choice === "4") {
      return "return";
    } else {
      console.log("Invalid choice");
      return this.allySelection();
    }
  }

  public async fight() {
    let turn = 1;
    let characters = this.SpeedOrder;
    let playerTurn = 0;
    while (!this.isFightOver() && playerTurn < characters.length) {
      let character = characters[playerTurn];
      this.displayFight();
      if (character.isAlive()) {
        console.log("\n");
        console.log(
          Color.cyan + "%s" + Color.reset,
          `${character.name}'s turn`,
        );
        console.log("\n");
        if (character.type === "ally") {
          console.log("Choose an action:");
          let menu = new Menu([
            "Attack", 
            "Special Attack",
            "Item"]);
          let choice = menu.selection;
          if (choice === "1") {
            let target = this.targetSelection(character);
            if (target === "return") {
              continue;
            }
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
              let target = this.targetSelection(character);
              if (target === "return") {
                continue;
              }
              character.specialAttack(target);
            }
          } else if (choice === "3") {
            let itemMenu: string[] = [];
            for (let item in this.allies[playerTurn].inventory.teamInventory) {
              itemMenu.push(
                this.allies[playerTurn].inventory.teamInventory[item],
              );
            }
            if (itemMenu.length !== 0) {
              itemMenu.push("Return");
            }
            console.log("Choose an item to use:");
            let menu = new Menu(itemMenu);
            while (menu.selection === null) {
              menu.selection = menu.askQuestion();
            }
            if (menu.selection === "No Item in your inventory") {
              console.log("You have no item in your inventory");
              continue;
            } else if (menu.selection === "Return") {
              continue;
            }
            let choice: number = parseInt(menu.selection);
            if (choice === menu.option.length) {
              continue;
            }
            let itemName =
              this.allies[playerTurn].inventory.teamInventory[choice - 1];
            if (itemName === "Potion") {
              let target = this.allySelection();
              if (target === "return") {
                continue;
              }
              character.heal(target);
            } else if (itemName === "Piece of Star") {
              let target = this.allySelection();
              if (target === "return" || !(target instanceof Character)) {
                continue;
              }
              character.revive(target, itemName);
            } else if (itemName === "Half Star") {
              let target = this.allySelection();
              if (target === "return" || !(target instanceof Character)) {
                continue;
              }
              character.revive(target, itemName);
            } else if (itemName === "Ether") {
              let target = this.allySelection();
              if (target === "return") {
                continue;
              }
              let isDone = character.restoreMana(
                target,
                target.name,
              );
              if (isDone === false) {
                continue;
              }
            } else {
              console.log("Invalid choice");
            }
          }
        } else if (character.type === "enemy") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          character.specialAttack(this.allies);
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
        console.log(Color.yellow + "%s" + Color.reset, `Turn ${turn}`);
      }
    }
    console.log("\n");
    console.log(`The fight is over, the winner is ${this.winner()}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

}


