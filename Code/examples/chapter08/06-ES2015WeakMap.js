const map = new WeakMap();

console.log('------------ ES6 WeakMap ------------');

const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

const retrn = map.set(ob1, 'gandalf@email.com');
console.log(retrn);
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');

console.log('has(ob1):', map.has(ob1)); // true
console.log('has(ob2):', map.has(ob2)); // true
console.log('has(ob3):', map.has(ob3)); // true

console.log('get(ob3):', map.get(ob3)); // tyrion@email.com

console.log('delete(ob2):', map.delete(ob2));
console.log('has(ob2):', map.has(ob2)); // false
