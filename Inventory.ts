export default class Inventory { // Inventory class
  public teamInventory: string[];

  constructor() {
    this.teamInventory = [
      
    ];
  }

  public add(item: string) { // add method
    this.teamInventory.push(item);
  }

  public remove(item: string) { // remove method
    const index = this.teamInventory.indexOf(item);
    if (index > -1) {
      this.teamInventory.splice(index, 1);
    }
  }

  public hasItem(item: string) :boolean { // hasItem method
    return this.teamInventory.includes(item);
  }
}
