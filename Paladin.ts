import Character from "./Character.ts";

export default class Paladin extends Character {

    protected holyAttack(target : Character[]) {
        for (let i = 0; i < target.length; i++){
            let attack = this.physicalAttack - target[i].physicalDefense * 0.4;
            target[i].currentLifePoints -= attack;
            if (target[i].currentLifePoints < 0){
                target[i].currentLifePoints = 0;
            }
        }
    }
}