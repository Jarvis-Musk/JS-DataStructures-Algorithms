let number = 233;
const rem = Math.floor(number % 2);
console.log('rem', rem);
number = Math.floor(number / 2);
console.log('number', number);

const source = [3];
const dest = [1, 2];
const moves = [
  { // move
    source: '3,2',
    helper: '',
    dest: '1',
  }, {
    source: '3',
    helper: '',
    dest: '1,2',
  }
];
