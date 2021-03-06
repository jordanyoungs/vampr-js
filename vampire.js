class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberAway = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberAway++;
    }
    return numberAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      let namedVamp = null;
      for (let child of this.offspring) {
        if (child.vampireWithName(name) !== null) {
          namedVamp = child.vampireWithName(name);
        }
      }
      return namedVamp;
    }
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;

    for (let child of this.offspring) {
      total++;
      total += child.totalDescendents;
    }

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted > 1980) {
      millenials.push(this);
    }

    for (let child of this.offspring) {
      millenials = millenials.concat(child.allMillennialVampires);
    }

    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampA = this;
    let vampB = vampire;
    if (!vampA.creator) {
      return vampA;
    } else if (!vampB.creator) {
      return vampB;
    } else if (vampA === vampB) {
      return vampA;
    } else if (vampA === vampB.creator) {
      return vampA;
    } else if (vampB === vampA.creator) {
      return vampB;
    }

    while (vampA.creator && vampB.creator) {
      if (vampA.isMoreSeniorThan(vampB)) {
        vampB = vampB.creator;
        return vampA.closestCommonAncestor(vampB);
      } else {
        vampA = vampA.creator;
        return vampB.closestCommonAncestor(vampA);
      }
    }
  }
}

module.exports = Vampire;

