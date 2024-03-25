import Character from "./Character.ts";

export default class Boss extends Character {

    protected bossAttack(target : Character[]){
        let random = Math.floor(Math.random() * 100);
        if (random < 30){
            for (let characters of target){
                console.log(`${this.name} attacks ${characters.name}`);
                characters.currentLifePoints -= (this.physicalAttack - characters.physicalDefense)*0.4;
            }
        } else {
            random = Math.floor(Math.random() * target.length);
            console.log(`${this.name} attacks ${target[random].name}`);
            target[random].currentLifePoints -= this.physicalAttack - target[random].physicalDefense;
        }

    }
}