import Color from "./Color.ts";

export default class Menu { // Create a class named Menu
  public selection: string | null = null;
  public option: string[];
  public typeOfQuestion: string;

  constructor(option: string[]) { // constructor with option parameter
    this.option = option;
    this.selection = this.askQuestion(); // selection is equal to the result of the askQuestion method
    this.typeOfQuestion = "";
  }

  public askQuestion(): string | null { // askQuestion method
    if (this.option.length === 0) {
      console.log("No option available");
      return "No Item in your inventory";
    }
    for (let i = 0; i < this.option.length; i++) { // for each option in the option array
      console.log(Color.cyan, i + 1 + ". " + this.option[i], Color.reset);
    }
    console.log("");
    let answer = prompt("Choose a number");
    while (answer === null || answer === undefined) {
      console.log("Invalid choice. Please choose a number.");
      answer = prompt("Choose a number");
    }
    return answer;
  }
}
