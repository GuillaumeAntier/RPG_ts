import Character from "./Character.ts";

export default class Priest extends Character {

    protected healPriest(targetAllies : Character[]){
        for (let i = 0; i<targetAllies.length; i++){
            console.log(i, targetAllies[i].name, targetAllies[i].currentLifePoints)
        }
        let targetHeal = prompt("Choose an ally to heal");
        while (targetHeal===null) {
            prompt("Choose an ally to heal");
        };
        targetAllies[targetHeal].currentLifePoints += this.maxLifePoints * 0.25;
        if (targetAllies[targetHeal].currentLifePoints > targetAllies[targetHeal].maxLifePoints){
            targetAllies[targetHeal].currentLifePoints = targetAllies[targetHeal].maxLifePoints;
        }
    }
}