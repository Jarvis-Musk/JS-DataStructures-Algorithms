// const { parenthesesChecker } = PacktDataStructuresAlgorithms;
import { parenthesesChecker } from './../../src/js/others/balanced-symbols.js';

console.log('{([])}', parenthesesChecker('{([])}')); // true
console.log('{{([][])}()}', parenthesesChecker('{{([][])}()}')); // true
console.log('[{}][', parenthesesChecker('[{}][')); // false
