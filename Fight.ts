import Character from './Character.ts';

export default class Fight{
    allies : Character[];
    ennemies : Character[];
    turn : number = 0;

    constructor(allies : Character[], ennemies : Character[]){
        this.allies = allies;
        this.ennemies = ennemies;
    }

    getSpeedOrder(){
        let characters = this.allies.concat(this.ennemies);
        characters.sort((a, b) => b.speed - a.speed);
        return characters;
    }

    isFightOver(){
        let isAlliesAlive = this.allies.some(ally => ally.isAlive());
        let isEnnemiesAlive = this.ennemies.some(ennemy => ennemy.isAlive());
        return !isAlliesAlive || !isEnnemiesAlive;
    }

    winner(){
        if (this.isFightOver()){
            if (this.allies.some(ally => ally.isAlive())){
                return "Allies";
            } else {
                return "Ennemies";
            }
        }
    }

    fight(){
        let characters = this.getSpeedOrder();
        while (!this.isFightOver()){
            for (let character of characters){
                if (character.isAlive()){
                    console.log(character.name + "'s turn");
                    character.attack(character)
                } else {
                    console.log(character.name + " is dead");
                }
            }
            prompt();
        }
        console.log(this.winner() + " won the fight");
    }
}