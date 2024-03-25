import Character from "./Character.ts";

export default class Monster extends Character {
    
    protected monsterAttack(target: Character[]){
        let lifeTargets = target.map(target => target.currentLifePoints);
        lifeTargets.sort((a, b) => a - b);
        let random = Math.floor(Math.random() * 100);
        if (random < 20){
            console.log(`${this.name} attacks ${target[0].name}`);
            target[0].currentLifePoints -= this.physicalAttack;
        } else {
            random = Math.floor(Math.random() * target.length);
            console.log(`${this.name} attacks ${target[random].name}`);
        }
    }
}