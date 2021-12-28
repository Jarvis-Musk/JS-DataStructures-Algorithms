// const { HashTableSeparateChaining } = PacktDataStructuresAlgorithms;
import HashTableSeparateChaining from './../../src/js/data-structures/hash-table-separate-chaining.js';

const hashTable = new HashTableSeparateChaining();

hashTable.put('Ygritte', 'ygritte@email.com');
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Jack', 'jack@email.com');
hashTable.put('Jasmine', 'jasmine@email.com');
hashTable.put('Jake', 'jake@email.com');
hashTable.put('Nathan', 'nathan@email.com');
hashTable.put('Athelstan', 'athelstan@email.com');
hashTable.put('Sue', 'sue@email.com');
hashTable.put('Aethelwulf', 'aethelwulf@email.com');
hashTable.put('Sargeras', 'sargeras@email.com');

console.log(hashTable.hashCode('Ygritte') + ' - Ygritte');
console.log(hashTable.hashCode('Jonathan') + ' - Jonathan');
console.log(hashTable.hashCode('Jamie') + ' - Jamie');
console.log(hashTable.hashCode('Jack') + ' - Jack');
console.log(hashTable.hashCode('Jasmine') + ' - Jasmine');
console.log(hashTable.hashCode('Jake') + ' - Jake');
console.log(hashTable.hashCode('Nathan') + ' - Nathan');
console.log(hashTable.hashCode('Athelstan') + ' - Athelstan');
console.log(hashTable.hashCode('Sue') + ' - Sue');
console.log(hashTable.hashCode('Aethelwulf') + ' - Aethelwulf');
console.log(hashTable.hashCode('Sargeras') + ' - Sargeras');

console.log('**** Printing Hash **** ');

console.log(hashTable.getTable());
console.log(hashTable.toString());
// {4 => [#Ygritte: ygritte@email.com]},{5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Sue: sue@email.com],[#Aethelwulf: aethelwulf@email.com]},{7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}

console.log('**** Get **** ');

console.log("get('Jamie')", hashTable.get('Jamie')); // jamie@email.com
console.log("get('Sue')", hashTable.get('Sue')); // sue@email.com
console.log("get('Jonathan')", hashTable.get('Jonathan')); // jonathan@email.com
console.log("get('Aethelwulf')", hashTable.get('Aethelwulf')); // jonathan@email.com
console.log("get('Loiane')", hashTable.get('Loiane')); // undefined

console.log('**** Remove **** ');

console.log(hashTable.remove('Ygritte')); // true
console.log(hashTable.get('Ygritte')); // undefined
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Sue: sue@email.com],[#Aethelwulf: aethelwulf@email.com]},{7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}

console.log(hashTable.remove('Sue')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Aethelwulf: aethelwulf@email.com]},{7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}

console.log(hashTable.remove('Jamie')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com],[#Aethelwulf: aethelwulf@email.com]},{7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}

console.log(hashTable.remove('Aethelwulf')); // true
console.log(hashTable.toString());
// {5 => [#Jonathan: jonathan@email.com]},{7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]},{8 => [#Jasmine: jasmine@email.com]},{9 => [#Jake: jake@email.com]},{10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}
