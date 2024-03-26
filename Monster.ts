import Character from "./Character.ts";

export default class Monster extends Character {

    type = "enemy";

    monsterAttack(target: Character[]){
        let lifeTargets = target.map(target => target.currentLifePoints);
        lifeTargets.sort((a, b) => a - b);
        let random = Math.floor(Math.random() * 100);
        if (random < 20){
            console.log(`${this.name} attacks ${target[0].name} with ${this.physicalAttack - target[0].physicalDefense} points of damage. ${target[0].name} has ${target[0].currentLifePoints} life points left.`)
            target[0].currentLifePoints -= this.physicalAttack;
        } else {
            random = Math.floor(Math.random() * target.length);
            target[random].currentLifePoints -= this.physicalAttack - target[random].physicalDefense;
            console.log(`${this.name} attacks ${target[random].name} with ${this.physicalAttack - target[random].physicalDefense} points of damage. ${target[random].name} has ${target[random].currentLifePoints} life points left.`)
        }
        
    }
}