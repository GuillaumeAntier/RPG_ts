import Character from "./Character.ts";
import Menu from "./menu.ts";

export default class Warrior extends Character {

    type = "ally";

    specialAttack(targets : Character[]){
        let target = targets[0];
        console.log("Warrior have no special attack, he will attack normally.");
        this.attack(target);
    }
}