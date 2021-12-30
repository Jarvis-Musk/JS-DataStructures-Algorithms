const map = new Map();

console.log('------------ ES6 Map ------------');

map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion1@email.com');
map.set('Tyrion', 'tyrion2@email.com'); // 会覆盖前面的同键的数据
map.set('nullVal', null);

console.log("hasKey('nullVal'):", map.has('nullVal'));
console.log("hasKey('Gandalf'):", map.has('Gandalf')); // true
console.log('size:', map.size); // 3

console.log('keys():', map.keys()); // MapIterator {"Gandalf", "John", "Tyrion"}
console.log('values():', map.values()); // MapIterator {"gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"}
console.log("get('Tyrion'): ", map.get('Tyrion')); // tyrion@email.com

console.log("delete('John'):", map.delete('John'));

console.log('keys():', map.keys()); // MapIterator {"Gandalf", "Tyrion"}
console.log('values():', map.values()); // MapIterator {"gandalf@email.com", "tyrion@email.com"}
