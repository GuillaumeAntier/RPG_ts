export default class Character {
    name : string;
    physicalAttack : number;
    physicalDefense : number;
    speed : number;
    maxLifePoints : number;
    currentLifePoints : number;
    inventory : string[];
    type : string;

    constructor(name : string, physicalAttack : number, physicalDefense : number, speed : number, maxLifePoints : number) {
        this.name = name;
        this.physicalAttack = physicalAttack;
        this.physicalDefense = physicalDefense;
        this.speed = speed;
        this.maxLifePoints = maxLifePoints;
        this.currentLifePoints = maxLifePoints;
    }

    public attack(target : Character) {
        let damage = this.physicalAttack - target.physicalDefense;
        if (damage < 0) {
            damage = 0;
        }
        target.currentLifePoints -= damage;
        if (target.currentLifePoints < 0) {
            target.currentLifePoints = 0;
        }
        console.log(`${this.name} attacks ${target.name} for ${damage} damage ${target.name} has ${target.currentLifePoints} HP left`);
    }

    public heal(target: Character){
        let heal = this.maxLifePoints * 0.5;
        target.currentLifePoints += heal;
        if(target.currentLifePoints > target.maxLifePoints){
            target.currentLifePoints = target.maxLifePoints;
        }
    }

    public revive(target: Character, item: string){
        if (this.inventory.includes(item)){
            if (item == "Piece of Star"){
                if (this.isAlive() == false){
                    target.currentLifePoints = target.maxLifePoints*0.2;
                } else {
                    target.currentLifePoints = target.maxLifePoints*0.5;
                }
            } else if (item == "Half Star"){
                target.currentLifePoints = target.maxLifePoints;
            }
        }
    }

    public isAlive() : boolean {
        return this.currentLifePoints > 0;
    }

    public specialAttack(target : any){
        console.log("Special attack")
    }

    public monsterAttack(target : any){
    }
}