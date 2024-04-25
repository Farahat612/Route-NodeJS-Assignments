// desc : Function to check if a number is an integer or not.
/*
  @param {number} num
*/

// 01 - Simple Approach: [Using Number.isInteger() method]
const isIntegerSimple = (num) => {
  return Number.isInteger(num)
}
// Example usage
console.log(isIntegerSimple(5)) // true
console.log(isIntegerSimple(5.5)) // false;

// 02 - Beginner Approach: [Using modulos operator]
const isIntegerBeginner = (num) => {
  return num % 1 === 0
}
// Example usage
console.log(isIntegerBeginner(5)) // true
console.log(isIntegerBeginner(5.5)) // false;

// 03 - Intermediate Approach: [Using parseInt() method]
const isIntegerIntermediate = (num) => {
  return num === parseInt(num)
}
// Example usage
console.log(isIntegerIntermediate(5)) // true
console.log(isIntegerIntermediate(5.5)) // false

// 04 - Advanced Approach: [Using bitwise operator]
const isIntegerAdvanced = (num) => {
  return (num | 0) === num
}
// Example usage
console.log(isIntegerAdvanced(5)) // true
console.log(isIntegerAdvanced(5.5)) // false
