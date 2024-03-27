export default class Menu {
  public selection: string | null = null;
  private option: string[];

  constructor(option: string[]) {
    this.option = option;
    this.selection = this.askQuestion();
  }

  public askQuestion() {
    console.log("What do you want to do?");
    console.log("");
    for (let i = 0; i < this.option.length; i++) {
      console.log("\x1b[36m%s\x1b[0m", i + ". " + this.option[i]);
    }
    console.log("");
    let answer = prompt("Choose a number");
    return answer;
  }
}
