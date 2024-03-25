import Character from "./Character.ts";
import Fight from "./fight.ts";

const thief = new Character("Thief", 10, 5, 20, 50);
const warrior = new Character("Warrior", 15, 10, 10, 105);
const mage = new Character("Mage", 10, 5, 15, 50);

const ennemy1 = new Character("Ennemy1", 10, 5, 10, 50);
const ennemy2 = new Character("Ennemy2", 15, 10, 5, 100);
const ennemy3 = new Character("Ennemy3", 15, 5, 15, 50);

const allies = [thief, warrior, mage];
const ennemies = [ennemy1, ennemy2, ennemy3];

const fight = new Fight(allies, ennemies);

fight.fight();