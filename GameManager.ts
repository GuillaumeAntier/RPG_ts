import Character from "./Character.ts";
import Barbarian from "./barbarian.ts";
import Mage from "./mage.ts";
import Paladin from "./paladin.ts";
import Priest from "./Priest.ts";
import Thief from "./Thief.ts";
import Warrior from "./Warrior.ts";
import Monster from "./Monster.ts";
import Boss from "./Boss.ts";
import Fight from "./fight.ts";
import Inventory from "./Inventory.ts";

export default class GameManager {
  private characters: Character[] = [];
  private team: Character[] = [];
  public teamInventory = new Inventory();
  public items = ["Potion", "Ether", "Piece of Star", "Half Star"];

  constructor() {
    this.characters.push(
      new Barbarian("Barbarian", 15, 10, 5, 100, this.teamInventory),
    );
    this.characters.push(
      new Mage("Mage", 10, 5, 15, 50, 20, 100, this.teamInventory),
    );
    this.characters.push(
      new Paladin("Paladin", 100, 100, 100, 100, this.teamInventory),
    );
    this.characters.push(
      new Priest("Priest", 5, 5, 15, 50, this.teamInventory),
    );
    this.characters.push(new Thief("Thief", 10, 5, 20, 50, this.teamInventory));
    this.characters.push(
      new Warrior("Warrior", 15, 10, 10, 105, this.teamInventory),
    );
  }

  public startGame() {
    console.log("");
    console.log("Welcome to the game !");
    console.log("\n");
    console.log(
      "You will have to choose 3 characters to fight against 3 ennemies.",
    );
    console.log("You will have to clear 5 rooms to win the game.");
    console.log("Good luck !");
    console.log("\n");
    this.characterSelection();
  }

  public characterSelection() {
    while (this.team.length < 3) {
      let character = this.chooseCharacter();
      if (character !== undefined) {
        this.team.push(character);
        console.log(`${character.name} has been added to your team.`);
        console.log(`Your team is now composed of :`);
        for (let i = 0; i < this.team.length; i++) {
          console.log(`${i + 1} - ${this.team[i].name}`);
        }
      }
    }
    this.manageRooms();
  }

  private chooseCharacter() {
    console.log("Choose your character :");
    for (let i = 0; i < this.characters.length; i++) {
      console.log(`${i + 1} - ${this.characters[i].name}`);
    }
    console.log("7 - Info");
    console.log("8 - Exit");
    let choice = prompt("Choose your character :");
    while (choice == null) {
      let choice = prompt("Choose your character :");
    }
    let number = parseInt(choice);

    if (number === 7) {
      console.log(
        "Barbarian : A strong character with a lot of life points and physical attack.",
      );
      console.log(
        "Mage : A character with a lot of magic points and magic attack.",
      );
      console.log(
        "Paladin : A character with a lot of versatility with a zone attack.",
      );
      console.log("Priest : A character with healing abilities.");
      console.log(
        "Thief : A character with a lot of speed and can steal items.",
      );
      console.log(
        "Warrior : A character with a lot of physical attack and life points.",
      );
      return undefined;
    } else if (number === 8) {
      console.log("Goodbye");
      return;
    } else if (number < 1 || number > 6) {
      console.log("Invalid choice");
      return undefined;
    }
    if (this.team.includes(this.characters[number - 1])) {
      console.log("You already chose this character");
      return undefined;
    }
    return this.characters[number - 1];
  }

  private createEnnemies() {
    let ennemiesRoomOne = [
      new Monster("Bat", 5, 5, 5, 20, new Inventory()),
      new Monster("Goblin", 10, 5, 5, 30, new Inventory()),
      new Monster("Rat", 5, 5, 5, 20, new Inventory()),
      new Monster("Skeleton", 10, 5, 5, 30, new Inventory()),
      new Monster("Spider", 5, 5, 5, 20, new Inventory()),
      new Monster("Slime", 10, 5, 5, 30, new Inventory()),
    ];
    let ennemiesRoomThree = [
      new Monster("Orc", 10, 5, 5, 40, new Inventory()),
      new Monster("Troll", 15, 5, 5, 50, new Inventory()),
      new Monster("Witch", 10, 5, 5, 40, new Inventory()),
      new Monster("Zombie", 15, 5, 5, 50, new Inventory()),
      new Monster("Ghost", 10, 5, 5, 40, new Inventory()),
      new Monster("Demon", 15, 5, 5, 50, new Inventory()),
    ];
    let ennemiesBossRoom = [
      new Monster("Dragon", 15, 10, 5, 60, new Inventory()),
      new Monster("Hydra", 25, 2, 5, 70, new Inventory()),
      new Monster("Giant", 10, 10, 1, 80, new Inventory()),
      new Monster("Beholder", 10, 5, 15, 50, new Inventory()),
      new Monster("Kraken", 25, 5, 3, 40, new Inventory()),
      new Monster("Chimera", 10, 5, 15, 80, new Inventory()),
    ];
    let BossRoom = [new Boss("Boss", 20, 10, 10, 150, new Inventory())];
    return [
      ennemiesRoomOne,
      [],
      ennemiesRoomThree,
      [],
      ennemiesBossRoom,
      BossRoom,
    ];
  }

  private openChest() {
    for (let i = 0; i < this.team.length; i++) {
      console.log(`${i + 1} - ${this.team[i].name}`);
    }
    let characterHowOpen = prompt("Which character will open the chest ?");
    while (
      characterHowOpen === null ||
      this.team[parseInt(characterHowOpen) - 1].isAlive() === false
    ) {
      if (
        characterHowOpen !== null &&
        this.team[parseInt(characterHowOpen) - 1].isAlive() === false
      ) {
        console.log("This character is dead");
      }
      characterHowOpen = prompt("Which character will open the chest ?");
    }
    var index = parseInt(characterHowOpen);

    let random = Math.floor(Math.random() * 100);
    if (random < 20) {
      console.log("Too bad, the chest was a trap !");
      this.team[index - 1].currentLifePoints -= 10;
    } else {
      for (let i = 0; i < 2; i++) {
        let randomItem = Math.floor(Math.random() * this.items.length);
        this.teamInventory.add(this.items[randomItem]);
        console.log(`You found a ${this.items[randomItem]}`);
      }
    }
  }

  private async manageRooms() {
    let room = 1;
    while (room <= 5 && this.team.length > 0) {
      console.log("");
      console.log(`You are in room ${room}`);
      if (room === 2 || room === 4) {
        this.openChest();
      } else if (room === 5) {
        let fightingEnemies: (Monster | Boss)[] = [];
        let boss = this.createEnnemies()[room];
        let ennemies = this.createEnnemies()[room - 1];
        fightingEnemies.push(boss[0]);
        for (let i = 0; i < 2; i++) {
          let randomEnnemy = Math.floor(Math.random() * ennemies.length);
          if (fightingEnemies.includes(ennemies[randomEnnemy])) {
            i--;
            continue;
          }
          fightingEnemies.push(ennemies[randomEnnemy]);
        }
        let fight = new Fight(this.team, fightingEnemies);
        await fight.fight();
        if (fight.winner() === "Ennemies") {
          console.log("You have been defeated by the boss");
          console.log("Game Over");
          return;
        }
      } else {
        let ennemies = this.createEnnemies()[room - 1];
        let fightingEnemies: Monster[] = [];
        for (let i = 0; i < 3; i++) {
          let randomEnnemy = Math.floor(Math.random() * ennemies.length);
          if (fightingEnemies.includes(ennemies[randomEnnemy])) {
            i--;
            continue;
          }
          fightingEnemies.push(ennemies[randomEnnemy]);
        }
        let fight = new Fight(this.team, fightingEnemies);
        await fight.fight();
        if (fight.winner() === "Ennemies") {
          console.log(`You have been defeated in room ${room}`);
          console.log("Game Over");
          return;
        }
      }
      room++;
      console.log("");
      console.log("You have cleared the room !");
    }
    console.log("You have defeated all the ennemies !");
    console.log("You have won the game !");
  }
}
