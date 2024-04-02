export default class Menu {
  public selection: string | null = null;
  public option: string[];
  public typeOfQuestion: string = "";

  constructor(option: string[]) {
    this.option = option;
    this.selection = this.askQuestion();
  }

  public askQuestion() {
    if (this.option.length === 0) {
      console.log("No option available");
      return "No Item in your inventory";
    }
    for (let i = 0; i < this.option.length; i++) {
      console.log("\x1b[36m%s\x1b[0m", i + 1 + ". " + this.option[i]);
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
