import Character from "./Character.ts";

export default class Barbarian extends Character {

    protected berserkAttack(target : Character[]){
        let random = Math.floor(Math.random() * target.length);
        let attack = this.physicalAttack - target[random].physicalDefense * 1.3;
        target[random].currentLifePoints -= attack;
        if (target[random].currentLifePoints < 0){
            target[random].currentLifePoints = 0;
        }
        this.currentLifePoints -= this.maxLifePoints * 0.2;
        if (this.currentLifePoints < 0){
            this.currentLifePoints = 0;
        }
    }
    

}