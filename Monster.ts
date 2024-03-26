import Character from "./Character.ts";

export default class Monster extends Character {

    type = "enemy";

    monsterAttack(target: Character[]){
        let aliveTargets = target.filter(target => target.currentLifePoints > 0);
        aliveTargets.sort((a, b) => a.currentLifePoints - b.currentLifePoints);
        let random = Math.floor(Math.random() * 100);
        if (random < 20){
            console.log("\x1b[31m%s\x1b[0m attacks \x1b[36m%s\x1b[0m with all his strength for \x1b[31m%d\x1b[0m points of damage. \x1b[36m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left.",
            this.name, aliveTargets[0].name, this.physicalAttack - aliveTargets[0].physicalDefense, aliveTargets[0].name, aliveTargets[0].currentLifePoints);
            aliveTargets[0].currentLifePoints -= this.physicalAttack;
        } else {
            random = Math.floor(Math.random() * aliveTargets.length);
            aliveTargets[random].currentLifePoints -= this.physicalAttack - aliveTargets[random].physicalDefense;
            console.log("\x1b[31m%s\x1b[0m attacks \x1b[36m%s\x1b[0m with all his strength for \x1b[31m%d\x1b[0m points of damage. \x1b[36m%s\x1b[0m has \x1b[32m%d\x1b[0m life points left.",
            this.name, aliveTargets[random].name, this.physicalAttack - aliveTargets[random].physicalDefense, aliveTargets[random].name, aliveTargets[random].currentLifePoints);
        }
        
    }
}