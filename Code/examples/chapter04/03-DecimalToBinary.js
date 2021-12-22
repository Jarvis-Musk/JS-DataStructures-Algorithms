// const { decimalToBinary } = PacktDataStructuresAlgorithms;
// const { baseConverter } = PacktDataStructuresAlgorithms;
import { decimalToBinary, baseConverter } from './../../src/js/others/base-converter.js';

// 233 == 11101001
// 2x(10x10) + 3x(10) + 3x(1)
console.log(decimalToBinary(0));
console.log(decimalToBinary(1));
console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000

console.log('-----');

const decNum = 36;
console.log(baseConverter(decNum, 2)); // 11000011111111001
console.log(baseConverter(decNum, 8)); // 303771
console.log(baseConverter(decNum, 16)); // 187F9
console.log(baseConverter(decNum, 35)); // 2BW0
console.log(baseConverter(decNum, 36)); // 25FD
