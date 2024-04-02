import Color from "./Color";

export default class Menu {
  public selection: string | null = null;
  public option: string[];
  public typeOfQuestion: string;

  constructor(option: string[], typeOfQuestion: string) {
    this.option = option;
    this.selection = this.askQuestion();
    this.typeOfQuestion = typeOfQuestion;
  }

  public askQuestion() {
    if (this.typeOfQuestion === "target") {
      console.log("Choose a target");
    } else if (this.typeOfQuestion === "item") {
      console.log("Choose an item to use");
    } else if (this.typeOfQuestion === "action") {
      console.log("Choose an action");
    } else {
      console.log("Choose a number");
    }
    console.log("");
    if (this.option.length === 0) {
      console.log("No option available");
      return "No Item in your inventory";
    }
    for (let i = 0; i < this.option.length; i++) {
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
