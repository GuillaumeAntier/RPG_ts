import Character from "./Character.ts";
import Color from "./Color.ts";
import Menu from "./Menu.ts";

export default class Priest extends Character { // Priest class that extends Character
  public type = "ally";
  public color = Color.magenta;

  public specialAttack(targetAllies: Character[]) { // special attack method
      let allyMenu: string[] = [];
      for (let i = 0; i < targetAllies.length; i++) { // for each character in the target array
        let estimatedHeal = targetAllies[i].currentLifePoints ;
        estimatedHeal = targetAllies[i].currentLifePoints + this.maxLifePoints * 0.25;
        if (estimatedHeal > targetAllies[i].maxLifePoints) { // if the estimated heal is greater than the max life points
          estimatedHeal = targetAllies[i].maxLifePoints - targetAllies[i].currentLifePoints;
        }
        allyMenu.push( 
          targetAllies[i].name + " " + Color.green +
            targetAllies[i].currentLifePoints + "/" +
            targetAllies[i].maxLifePoints + " HP" + Color.reset +
            " ".repeat(10) + Color.black + "Estimated Heal" + " ".repeat(3) +
            estimatedHeal + " HP" +
            Color.reset,
        );
      }
      allyMenu.push("Return");
      console.log("Choose an ally to heal:");
      let menu = new Menu(allyMenu); // create a new menu with the allyMenu array
      let choice = menu.selection;
      while (choice === null) {
        choice = menu.selection;
      }
      if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4") { // if the choice is not 1, 2, 3, or 4
        console.log("Invalid choice");
        return this.specialAttack(targetAllies);
      }
    let target = parseInt(choice) - 1;
    targetAllies[target].currentLifePoints += this.maxLifePoints * 0.25;
    if (
      targetAllies[target].currentLifePoints >
        targetAllies[target].maxLifePoints
    ) {
      targetAllies[target].currentLifePoints =
        targetAllies[target].maxLifePoints;
    }
    console.log( 
      "%s heals %s for %s points of life. %s has %s life points left.",
      Color.magenta + this.name + Color.reset,
      Color.cyan + targetAllies[target].name + Color.reset,
      Color.green + this.maxLifePoints * 0.25 + Color.reset,
      Color.cyan + targetAllies[target].name + Color.reset,
      Color.green + targetAllies[target].currentLifePoints + Color.reset,
    );
  }
}
