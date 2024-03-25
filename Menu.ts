export default class Menu{
    selection : string | null = null;
    public option : string[];

    constructor(option : string[]){
        this.option = option;
        this.selection = this.askQuestion();
    }

    public askQuestion(){
        console.log("What do you want to do?");
        for (let i = 0; i < this.option.length; i++){
            console.log(i + ". " + this.option[i]);
        }
        let answer = prompt("Choose a number");
        return answer;
    }
}