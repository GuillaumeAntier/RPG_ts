import Character from "./Character.ts";

export default class Barbarian extends Character {

    type = "ally";

    specialAttack(target : Character[]){
        let random = Math.floor(Math.random() * target.length);
        let attack = this.physicalAttack - target[random].physicalDefense * 1.3;
        target[random].currentLifePoints -= attack;
        if (target[random].currentLifePoints < 0){
            target[random].currentLifePoints = 0;
            console.log(`${this.name} enters a rage and attacks ${target[random].name} with ${attack} points of damage, but also takes 20% of his max life points in damage. ${this.name} has ${this.currentLifePoints} life points left and ${target[random].name} has 0 life points left.`)
        }
        this.currentLifePoints -= this.maxLifePoints * 0.2;
        if (this.currentLifePoints < 0){
            this.currentLifePoints = 0;
            console.log(`${this.name} enters a rage and attacks ${target[random].name} with ${attack} points of damage, but also takes 20% of his max life points in damage. ${this.name} has 0 life points left and ${target[random].name} has ${target[random].currentLifePoints} life points left.`)
        } else {
            console.log(`${this.name} enters a rage and attacks ${target[random].name} with ${attack} points of damage, but also takes 20% of his max life points in damage. ${this.name} has ${this.currentLifePoints} life points left and ${target[random].name} has ${target[random].currentLifePoints} life points left.`);
        }
    }
    

}