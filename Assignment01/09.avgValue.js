// desc : Function to find the average value of all the numbers in an array.
/*
  @param {array} arr
*/

// 01 - Beginner Approach: [Using for loop]
const avgValueBeginner = (arr) => {
  let sum = 0
  for (let num of arr) {
    sum += num
  }
  return sum / arr.length
}
// Example usage
console.log(avgValueBeginner([1, 2, 3, 4, 5])) // 3

// 02 - Intermediate Approach: [Using reduce() method]
const avgValueIntermediate = (arr) => {
  return arr.reduce((acc, num) => acc + num, 0) / arr.length
}
// Example usage
console.log(avgValueIntermediate([1, 2, 3, 4, 5])) // 3
