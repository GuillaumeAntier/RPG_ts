export default class Inventory {
  public teamInventory: string[] = [
    "Potion",
    "Ether",
    "Piece of Star",
    "Half Star",
  ];

  add(item: string) {
    this.teamInventory.push(item);
  }

  remove(item: string) {
    const index = this.teamInventory.indexOf(item);
    if (index > -1) {
      this.teamInventory.splice(index, 1);
    }
  }

  has(item: string) {
    return this.teamInventory.includes(item);
  }
}
