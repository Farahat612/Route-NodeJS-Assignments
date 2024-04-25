// desc : function to find the sum of all the numbers in an array.
/*
  @param {array} arr
*/

// 01 - Simple Approach: [Using for loop]
const arraySumSimple = (arr) => {
  let sum = 0
  for (let num of arr) {
    sum += num
  }
  return sum
}
// Example usage
console.log(arraySumSimple([1, 2, 3, 4, 5])) // 15

// 02 - Intermediate Approach: [Using reduce() method]
const arraySumIntermediate = (arr) => {
  return arr.reduce((acc, num) => acc + num, 0)
}
// Example usage
console.log(arraySumIntermediate([1, 2, 3, 4, 5])) // 15
