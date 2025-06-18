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

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase;
      do {
        newBase = returnRandBase();
      } while (newBase === this.dna[randIndex]);
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(other) {
      const sameBases = this.dna.filter((base, index) => base === other.dna[index]).length;
      const percentage = ((sameBases / this.dna.length) * 100).toFixed(2);
      console.log(`Specimen #${this.specimenNum} and Specimen #${other.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive() {
      const survivalRate = this.dna.filter(base => base === 'C' || base === 'G').length / this.dna.length;
      return survivalRate >= 0.6;
    }
  };
}




