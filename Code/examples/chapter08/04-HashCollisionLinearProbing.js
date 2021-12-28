// const { HashTableLinearProbing } = PacktDataStructuresAlgorithms;
// import HashTableLinearProbing from './../../src/js/data-structures/hash-table-linear-probing.js';
import HashTableLinearProbingLazy from './../../src/js/data-structures/hash-table-linear-probing-lazy.js';

// const hashTable = new HashTableLinearProbing();
const hashTable = new HashTableLinearProbingLazy();

hashTable.put('Ygritte', 'ygritte@email.com');
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Jack', 'jack@email.com');
hashTable.put('Jasmine', 'jasmine@email.com');
hashTable.put('Jake', 'jake@email.com');
hashTable.put('Nathan', 'nathan@email.com');
hashTable.put('Athelstan', 'athelstan_old@email.com');
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

console.log('------------ Printing Hash ------------');
console.log(hashTable.toString());

console.log('------------ Get ------------');
console.log('get Nathan: ', hashTable.get('Nathan')); // nathan@email.com
console.log('get Loiane: ', hashTable.get('Loiane')); // undefined

console.log('------------ Remove Ygritte ------------');
console.log('Remove Ygritte:', hashTable.remove('Ygritte'));
console.log('get Ygritte: ', hashTable.get('Ygritte')); // undefined
console.log('------------ Printing Hash ------------');
console.log(hashTable.toString());

console.log('------------ Remove Athelstan ------------');
console.log('Remove Athelstan:', hashTable.remove('Athelstan')); // true
console.log('get Athelstan: ', hashTable.get('Athelstan'));
console.log('------------ Printing Hash ------------');
console.log(hashTable.toString());

console.log('------------ add Athelstan ------------');
const putResponse = hashTable.put('Athelstan', 'athelstan_new@email.com');
console.log('add Athelstan: ', putResponse);
console.log('get Athelstan: ', hashTable.get('Athelstan'));
console.log('------------ Printing Hash ------------');
console.log(hashTable.toString());


console.log('------------ Printing Table ------------');
console.log(hashTable.getTable());
