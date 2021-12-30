// const { Dictionary } = PacktDataStructuresAlgorithms;
import Dictionary from './../../src/js/data-structures/dictionary.js';

const dictionary = new Dictionary();

console.log('------------ Dictionary ------------');

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
dictionary.set('nullVal', null); // 无法存入

console.log("hasKey('nullVal'):", dictionary.hasKey('nullVal'));
console.log("hasKey('Gandalf'):", dictionary.hasKey('Gandalf')); // true
console.log('size:', dictionary.size()); // 3

console.log('keys():', dictionary.keys()); // ["Gandalf", "John", "Tyrion"]
console.log('values():', dictionary.values()); // ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log("get('Tyrion'): ", dictionary.get('Tyrion')); // tyrion@email.com

console.log("remove('John'):", dictionary.remove('John'));

console.log('keys():', dictionary.keys()); // ["Gandalf", "Tyrion"]
console.log('keysLegacy():', dictionary.keysLegacy()); // ["Gandalf", "Tyrion"]
console.log('values():', dictionary.values()); // ["gandalf@email.com", "tyrion@email.com"]

console.log('keyValues():', dictionary.keyValues()); // [{key: "Gandalf", value: "gandalf@email.com"}, {key: "Tyrion", value: "tyrion@email.com"}]
console.log('keyValuesLegacy():', dictionary.keyValuesLegacy());
console.log('toString():', dictionary.toString()); // [#Gandalf: gandalf@email.com],[#Tyrion: tyrion@email.com]

dictionary.forEach((k, v) => {
  console.log('forEach: ', `key: ${k}, value: ${v}`);
});
// forEach:  key: Gandalf, value: gandalf@email.com
// forEach:  key: Tyrion, value: tyrion@email.com
