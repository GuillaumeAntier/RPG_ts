import Character from "./Character.ts";
import Fight from "./fight.ts";
import Mage from "./mage.ts";
import Thief from "./Thief.ts";
import Warrior from "./Warrior.ts";
import Paladin from "./paladin.ts";
import Barbarian from "./barbarian.ts";
import Priest from "./Priest.ts";
import Monster from "./Monster.ts";
import Boss from "./Boss.ts";
import GameManager from "./GameManager.ts";

const gameManager = new GameManager();

const allies = gameManager.characterSelection();

const ennemy1 = new Monster("Ennemy1", 10, 5, 10, 50);
const ennemy2 = new Monster("Ennemy2", 15, 10, 5, 100);
const ennemy3 = new Monster("Ennemy3", 15, 5, 15, 50);

const ennemies = [ennemy1, ennemy2, ennemy3];

const fight = new Fight(allies, ennemies);

fight.fight();
