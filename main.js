// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates random specimen taking in two parameters
const pAequorFactory = (specimenNum, dna) => {
  const newSpecimen = {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      let randomBase = this.dna[randomIndex];
      if (newBase !== randomBase) {
        this.dna.splice(randomIndex, 1, newBase);
        const mutated = this.dna;
        return mutated;
        } else {
          newBase = returnRandBase();
          this.dna.splice(randomIndex, 1, newBase);
          return this.dna;
        }
    },
    compareDNA(pAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequor.dna[i]){
          identicalBases++;
        }
      };
      const percentDNA = (identicalBases/this.dna.length) * 100;
      return `specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentDNA}% DNA in common`;
    },
    willLikelySurvive() {
      let baseCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          baseCounter++;
        }
      } // Count the number of 'C' and 'G' bases
      // If the count is greater than 60% of the total length of the DNA strand
      if (baseCounter / this.dna.length >= 0.6) {
        return true;
      } else {
        return false;
      }
    }
  };
  // Return Full New Specimen object
  return newSpecimen;
}
// Loop to fill up the array based on the instances desired
const survivingSpecimenArray = [];
const survivingSpecimen = instances => {
  const specimen = pAequorFactory(i, mockUpStrand());
  for (let i = 1; i > 0; i++) {
    if (specimen.willLikelySurvive()) {
      survivingSpecimenArray.push(specimen);
    };
    if (survivingSpecimenArray.length === instances){
      break;
    }
  };
  return survivingSpecimenArray;
};

survivingSpecimen(30);
//printing 30 instances of surviving specimen
console.log(survivingSpecimenArray);






