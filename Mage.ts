import Character from "./Character.ts";

export default class Mage extends Character {

    private magicAttack : number;
    private MaxManaPoints : number;
    private currentManaPoints : number;
    type = "ally";

    constructor(name : string, physicalAttack : number, physicalDefense : number, speed : number, maxLifePoints : number, magicAttack : number, MaxManaPoints : number) {
        super(name, physicalAttack, physicalDefense, speed, maxLifePoints);
        this.magicAttack = magicAttack;
        this.MaxManaPoints = MaxManaPoints;
        this.currentManaPoints = MaxManaPoints;
    }

    specialAttack(targets : Character[]){
        let target = targets[0];
        target.currentLifePoints -= this.magicAttack;
        this.currentManaPoints -= 10;
        if (target.currentLifePoints < 0){
            target.currentLifePoints = 0;
        }
        console.log(`${this.name} attacks with a fire ball ${target.name} for ${this.magicAttack} damage ${target.name} has ${target.currentLifePoints} HP left`);
    }

    protected restoreMana(){
        if (this.inventory.includes("Ether")){
            this.currentManaPoints += this.MaxManaPoints * 0.3;
            if (this.currentManaPoints > this.MaxManaPoints){
                this.currentManaPoints = this.MaxManaPoints;
            }
        }
    }
}