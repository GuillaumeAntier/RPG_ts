import Character from "./Character.ts";

export default class Thief extends Character {

    type = "ally";
    
    specialAttack(){
        console.log("")
        let random = Math.floor(Math.random() * 100);
        if (random < 40){
            console.log("\x1b[30m%s\x1b[0m stole nothing !", this.name);
        } else if (random < 70 && random >= 40){
            console.log("\x1b[30m%s\x1b[0m stole a" + "\x1b[35m" + " potion " + "\x1b[0m !", this.name);
        } else if (random < 85 && random >= 70){
            console.log("\x1b[30m%s\x1b[0m stole a"  + "\x1b[35m" + " piece of star " + "\x1b[0m", "!", this.name);
        } else if (random < 95 && random >= 85){
            console.log("\x1b[30m%s\x1b[0m stole a" + "\x1b[35m" + " ether " + "\x1b[0m", "!", this.name);
        } else {
            console.log("\x1b[30m%s\x1b[0m stole an" + "\x1b[35m" + " half star " + "\x1b[0m", "!", this.name);
        }
    }
}