import Character from "./Character.ts";

export default class Thief extends Character {
    
    protected steal(){
        let random = Math.floor(Math.random() * 100);
        if (random < 40){
            console.log("You stole nothing !");
        } else if (random < 70 && random >= 40){
            console.log("You stole a potion !");
        } else if (random < 85 && random >= 70){
            console.log("You stole a piece of star !");
        } else if (random < 95 && random >= 85){
            console.log("You stole an ether !");
        } else {
            console.log("You stole an half star !");
        }
    }
}