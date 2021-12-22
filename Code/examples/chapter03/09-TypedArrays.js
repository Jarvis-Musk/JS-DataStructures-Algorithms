// @ts-check

const length = 5;
const int16 = new Float32Array(length);

const array16 = [];
array16.length = length;

for (let i = 0; i < length; i++) {
  int16[i] = i + 1;
}

console.log(int16);


interface Person {
  name: string;
  age: number;
}

// const friends: {name: string, age: number}[];
const friends = [
  { name: 'John', age: 30, gender: 'male' },
  { name: 'Ana', age: 20, gender: 'female' },
  { name: 'Chris', age: 25, gender: 'female' }, // trailing comma ES2017
];

function comparePerson(a: Person, b: Person) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  return 0;
}

console.log('friends.sort(comparePerson)', friends.sort(comparePerson));

// Int8Array();
// Uint8Array();
// Uint8ClampedArray();
// Int16Array();
// Uint16Array();
// Int32Array();
// Uint32Array();
// Float32Array();
// Float64Array();

// http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
// http://www.i-programmer.info/programming/javascript/6135-javascript-data-structures-typed-arrays.html
