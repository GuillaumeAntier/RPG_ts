import Character from "./Character.ts";
import Barbarian from "./barbarian.ts";
import Mage from "./mage.ts";
import Paladin from "./paladin.ts";
import Priest from "./Priest.ts";
import Thief from "./Thief.ts";
import Warrior from "./Warrior.ts";

export default class GameManager {
  characters: Character[] = [];
  team: Character[] = [];

  constructor() {
    this.characters.push(new Barbarian("Barbarian", 15, 10, 5, 100));
    this.characters.push(new Mage("Mage", 10, 5, 15, 50, 20, 100));
    this.characters.push(new Paladin("Paladin", 10, 10, 10, 100));
    this.characters.push(new Priest("Priest", 5, 5, 15, 50));
    this.characters.push(new Thief("Thief", 10, 5, 20, 50));
    this.characters.push(new Warrior("Warrior", 15, 10, 10, 105));
  }

  startGame() {
    console.log("Welcome to the game !");
    console.log(
      "You will have to choose 3 characters to fight against 3 ennemies.",
    );
    console.log("You can choose between 6 characters :");
    console.log("1 - Barbarian");
    console.log("2 - Mage");
    console.log("3 - Paladin");
    console.log("4 - Priest");
    console.log("5 - Thief");
    console.log("6 - Warrior");
    this.characterSelection();
  }

  characterSelection() {
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
    return this.team;
  }

  chooseCharacter() {
    console.log("Choose your character :");
    for (let i = 0; i < this.characters.length; i++) {
      console.log(`${i + 1} - ${this.characters[i].name}`);
    }
    console.log("7 : Info");
    console.log("8 : Exit");
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

  createEnnemies() {
  }
}
