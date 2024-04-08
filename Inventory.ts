export default class Inventory {
  public teamInventory: string[];

  constructor() {
    this.teamInventory = [
      "Potion",
      "Ether",
      "Piece of Star",
      "Half Star",
    ];
  }

  public add(item: string) {
    this.teamInventory.push(item);
  }

  public remove(item: string) {
    const index = this.teamInventory.indexOf(item);
    if (index > -1) {
      this.teamInventory.splice(index, 1);
    }
  }

  public hasItem(item: string) {
    return this.teamInventory.includes(item);
  }
}
