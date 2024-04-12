import Character from "./Character.ts";
import Menu from "./Menu.ts";
import Color from "./Color.ts";
import mage from "./mage.ts";

export default class Fight { // Create a class named Fight
  private allies: Character[];
  private ennemies: Character[];
  protected turn: number;

  constructor(allies: Character[], ennemies: Character[]) { // Constructor with allies and ennemies parameters
    this.allies = allies;
    this.ennemies = ennemies;
    this.turn = 0;
  }

  private get SpeedOrder(): Character[] { // Get the speed order of the characters
    let characters = this.allies.concat(this.ennemies);
    characters.sort((a, b) => b.speed - a.speed);
    return characters;
  }

  private isFightOver(): boolean { // Check if the fight is over
    let isAlliesAlive = this.allies.some((ally) => ally.isAlive());
    let isEnnemiesAlive = this.ennemies.some((ennemy) => ennemy.isAlive());
    return !isAlliesAlive || !isEnnemiesAlive; // Return true if the allies or the ennemies are dead
  }

  public winner(): string { // Get the winner of the fight
    if (this.isFightOver()) {  // If the fight is over
      if (this.allies.some((ally) => ally.isAlive())) { // If the allies are alive
        return "Allies";
      } else { // If the ennemies are alive
        return "Ennemies";
      }
    } else { // If the fight is not over
      return "The fight is not over yet";
    }
  }

  private displayFight() { // Display the fight
    let alliesDisplay: string[] = [];
    let enemiesDisplay: string[] = [];

    for (let ally of this.allies) { // For each ally in the allies array
      if (ally instanceof mage) { // If the ally is an instance of the Mage class
        alliesDisplay.push(
          `${ally.name} : ` + Color.green +
            `${ally.currentLifePoints}/${ally.maxLifePoints} HP` +
            Color.reset + " | " + Color.blue +
            `${ally.currentManaPoints}/${ally.MaxManaPoints} MP` + Color.reset +
            " ".repeat(15),
        );
      } else { // If the ally is not an instance of the Mage class
        alliesDisplay.push(
          `${ally.name} : ` + Color.green +
            `${ally.currentLifePoints}/${ally.maxLifePoints} PV` +
            Color.reset,
        );
      }
    }

    for (let enemy of this.ennemies) { // For each enemy in the ennemies array
      enemiesDisplay.push(
        `${enemy.name} : ` + Color.red +
          `${enemy.currentLifePoints}/${enemy.maxLifePoints} HP` +
          Color.reset,
      );
    }

    let maxRows = Math.max(alliesDisplay.length, enemiesDisplay.length);
    let display = "";

    for (let i = 0; i < maxRows; i++) { // For each row
      let allyRow = i < alliesDisplay.length ? alliesDisplay[i] : "";
      let enemyRow = i < enemiesDisplay.length ? enemiesDisplay[i] : "";
      display += allyRow.padEnd(50) + enemyRow + "\n";
    }

    console.log("\n");
    console.log(
      Color.green + "Allies" + Color.reset + " ".repeat(35) + Color.red +
        "Ennemies" + Color.reset,
      "\n",
    );
    console.log(display);
  }

  private targetSelection(character: Character, isSpecialAttack = false) { // Target selection method
    let ennemyMenu: string[] = [];
    let printed = false;
    for (let i = 0; i < this.ennemies.length; i++) { // For each ennemy in the ennemies array
      let estimatedDamage = this.ennemies[i].currentLifePoints ;
      if (isSpecialAttack == true && character.name === "Mage" && !printed) {
        console.log("Mage special attack")
        printed = true;
        estimatedDamage = this.ennemies[i].currentLifePoints - 20;
        if (estimatedDamage < 0) { // If the estimated damage is less than 0
          estimatedDamage = 0;
        }
      } else { // If the character is not a mage
      estimatedDamage = this.ennemies[i].currentLifePoints -
        (character.physicalAttack - this.ennemies[i].physicalDefense);
      if (estimatedDamage < 0) { // If the estimated damage is less than 0
        estimatedDamage = 0;
      }
    }
      ennemyMenu.push(
        this.ennemies[i].name + " " + Color.red +
          this.ennemies[i].currentLifePoints + "/" +
          this.ennemies[i].maxLifePoints + " HP" + Color.reset +
          " ".repeat(10) + Color.black + "Estimated life" + " ".repeat(3) +
          estimatedDamage + "/" + this.ennemies[i].maxLifePoints + " HP" +
          Color.reset,
      );
    }
    ennemyMenu.push("Return");
    console.log("Choose a target to attack:");
    let menu = new Menu(ennemyMenu); // Create a new menu with the ennemyMenu array
    let choice = menu.selection;
    while (choice === null) {
      choice = menu.selection;
    }
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4") { // If the choice is not 1, 2, 3 or 4
      console.log("Invalid choice");
      return this.targetSelection(character);
    }
    if (choice === "1" && this.ennemies[0].currentLifePoints > 0) { // If the choice is 1 and the first ennemy is alive
      return [this.ennemies[0]];
    } else if (choice === "2" && this.ennemies[1].currentLifePoints > 0) { // If the choice is 2 and the second ennemy is alive
      return [this.ennemies[1]];
    } else if (choice === "3" && this.ennemies[2].currentLifePoints > 0) { // If the choice is 3 and the third ennemy is alive
      return [this.ennemies[2]];
    } else if (choice === "4") { // If the choice is 4
      return "return";
    } else if (this.ennemies[parseInt(choice) - 1].currentLifePoints <= 0) { // If the ennemy is dead
      console.log("This ennemy is dead");
    } else { // If the choice is not 1, 2, 3 or 4
      console.log("Invalid choice");
    }
    return this.targetSelection(character);
  }

  private allySelection(item: string) { // Ally selection method
    let allyMenu: string[] = [];
    for (let i = 0; i < this.allies.length; i++) { // For each ally in the allies array
      let mana = 0;
      let heal = this.allies[i].currentLifePoints;
      if (item === "Potion") { // If the item is a potion
        heal = this.allies[i].currentLifePoints + this.allies[i].maxLifePoints * 0.5;
        if (heal > this.allies[i].maxLifePoints) {
          heal = this.allies[i].maxLifePoints
        }
      } else if (item === "Ether") { // If the item is an ether
        if (this.allies[i].name === "Mage" && this.allies[i] instanceof mage) { // If the ally is a mage
          let mage = this.allies[i] as mage; // Cast the ally to a mage
          mana = mage.currentManaPoints + mage.MaxManaPoints * 0.3;
          if (mana > mage.MaxManaPoints) {
            mana = mage.MaxManaPoints
          }
        } 
      } else if (item === "Piece of Star") { // If the item is a piece of star
        if (this.allies[i].currentLifePoints > 0) { // If the ally is alive
          heal = this.allies[i].currentLifePoints +  this.allies[i].maxLifePoints * 0.5;
          if (heal > this.allies[i].maxLifePoints) {
            heal = this.allies[i].maxLifePoints
          }
        } else { // If the ally is dead
          heal = this.allies[i].maxLifePoints * 0.2;
        }
      } else if (item === "Half Star") { // If the item is a half star
        heal = this.allies[i].maxLifePoints;
      } 
      if (this.allies[i] instanceof mage) { // If the ally is an instance of the Mage class
        let mage = this.allies[i] as mage; // Cast the ally to a mage

        allyMenu.push(        
        this.allies[i].name + " " + Color.green + this.allies[i].currentLifePoints + "/" + 
        this.allies[i].maxLifePoints + " HP" + Color.reset + 
        " ".repeat(3) + Color.blue + mage.currentManaPoints + "/" + mage.MaxManaPoints +  " MP" +
         " ".repeat(5) + Color.black + "Estimated Heal" + " ".repeat(3) +
        heal + "/" + this.allies[i].maxLifePoints + " HP" + 
        " ".repeat(10) + "Estimated Mana" + " ".repeat(3) + mana + "/" +
        mage.MaxManaPoints + " MP" + Color.reset,
        );
      } else { // If the ally is not an instance of the Mage class
      allyMenu.push(
        this.allies[i].name + " " + Color.green + this.allies[i].currentLifePoints + "/" + 
        this.allies[i].maxLifePoints + " HP" + Color.reset +
         " ".repeat(10) + Color.black + "Estimated Heal" + " ".repeat(3) +
        heal + "/" + this.allies[i].maxLifePoints + " HP" + Color.reset,
        );
    }
    }
    allyMenu.push("Return");
    console.log("Choose an ally to heal:");
    let menu = new Menu(allyMenu); // Create a new menu with the allyMenu array
    let choice = menu.selection; // Get the selection of the menu
    while (choice === null) { // While the choice is null
      choice = menu.selection;
    }
    if (choice === "1") { // If the choice is 1
      return this.allies[0];
    } else if (choice === "2") { // If the choice is 2
      return this.allies[1];
    } else if (choice === "3") { // If the choice is 3
      return this.allies[2];
    } else if (choice === "4") { // If the choice is 4
      return "return"; 
    } else { // If the choice is not 1, 2, 3 or 4
      console.log("Invalid choice");
      return this.allySelection(item);
    }
  }

  public async fight() { // Fight method async
    let turn = 1; 
    let characters = this.SpeedOrder; // Get the speed order of the characters
    let playerTurn = 0;
    while (!this.isFightOver() && playerTurn < characters.length) { // While the fight is not over and the player turn is less than the length of the characters array
      let character = characters[playerTurn];
      this.displayFight();
      if (character.isAlive()) { // If the character is alive
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
            "Item",
          ]);
          let choice = menu.selection;
          if (choice === "1") { // If the choice is 1
            let target = this.targetSelection(character); // Get the target selection
            if (target === "return") {
              continue;
            }
            character.attack(target); // Attack the target
          } else if (choice === "2") { // If the choice is 2 cast the special attack
            if (character.name === "Priest") { 
              character.specialAttack(this.allies);
            } else if (character.name === "Paladin") {
              character.specialAttack(this.ennemies);
            } else if (character.name === "Thief") {
              character.specialAttack(this.ennemies);
            } else if (character.name === "Barbarian") {
              character.specialAttack(this.ennemies);
            } else {
              let target = this.targetSelection(character, true);
              if (target === "return") {
                continue;
              }
              character.specialAttack(target);
            }
          } else if (choice === "3") { // If the choice is 3 use an item
            let itemMenu: string[] = [];
            if (this.allies[playerTurn].inventory === undefined) { // If the inventory is undefined
              console.log("You have no item in your inventory");
              continue;
            }
            for (let item in this.allies[playerTurn].inventory.teamInventory) { // For each item in the team inventory
              itemMenu.push(
                this.allies[playerTurn].inventory.teamInventory[item],
              );
            }
            if (itemMenu.length !== 0) { // If the item menu length is not 0
              itemMenu.push("Return");
            }
            console.log("Choose an item to use:");
            let menu = new Menu(itemMenu); // Create a new menu with the itemMenu array
            while (menu.selection === null) { // While the selection of the menu is null
              menu.selection = menu.askQuestion();
            }
            if (menu.selection === "No Item in your inventory") { // If the selection is "No Item in your inventory"
              console.log("You have no item in your inventory");
              continue;
            } else if (menu.selection === "Return") { // If the selection is "Return"
              continue;
            }
            let choice: number = parseInt(menu.selection);
            if (choice === menu.option.length) {
              continue;
            }
            let itemName =
              this.allies[playerTurn].inventory.teamInventory[choice - 1];
            if (itemName === "Potion") { // If the item is a potion
              let target = this.allySelection(itemName);
              if (target === "return") {
                continue;
              }
              character.heal(target);
            } else if (itemName === "Piece of Star") { // If the item is a piece of star
              let target = this.allySelection(itemName);
              if (target === "return" || !(target instanceof Character)) {
                continue;
              }
              character.revive(target, itemName);
            } else if (itemName === "Half Star") { // If the item is a half star
              let target = this.allySelection(itemName);
              if (target === "return" || !(target instanceof Character)) {
                continue;
              }
              character.revive(target, itemName);
            } else if (itemName === "Ether") { // If the item is an ether
              let target = this.allySelection(itemName);
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
            } else { // If the item is not a potion, a piece of star, a half star or an ether
              console.log("Invalid choice");
            }
          } else { // If the choice is not 1, 2 or 3
            console.log("Invalid choice");
            continue;
          }
        } else if (character.type === "enemy") { // If the character type is enemy
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
          character.specialAttack(this.allies);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        }
      } else {
        console.log(character.name + " is dead");
      }
      playerTurn++;
      if (playerTurn === characters.length) { // If the player turn is equal to the length of the characters array
        playerTurn = 0;
        console.log(`End of turn ${turn}`);
        turn++;
        console.log("\n");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        console.log(Color.yellow + "%s" + Color.reset, `Turn ${turn}`);
      }
    }
    console.log("\n");
    console.log(`The fight is over, the winner is ${this.winner()}`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
