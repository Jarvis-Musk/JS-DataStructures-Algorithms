class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
    this.el3 = el2;
  }
  /* toString() {
    return `${this.el1.toString()}-${this.el2.toString()}`;
  } */
};

const ls1 = new MyObj(3, 4);
console.log(`${ls1}`);
console.log(ls1);