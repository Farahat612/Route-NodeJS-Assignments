// desc : Function to extract even numbers from an array
/*
  @param {array} arr
*/

// 01 - Simple Approach: [using filter() method]
const evenNumExtractSimple = (arr) => {
  return arr.filter((num) => num % 2 === 0)
}
// Example usage
console.log(evenNumExtractSimple([1, 2, 3, 4, 5, 6])) // [2, 4, 6]

// 02 - Beginner Approach: [Without using filter and using for loop]
const evenNumExtractIntermediate = (arr) => {
  let evenNums = []
  for (let num of arr) {
    num % 2 === 0 && evenNums.push(num)
  }
  return evenNums
}
// Example usage
console.log(evenNumExtractIntermediate([1, 2, 3, 4, 5, 6])) // [2, 4, 6]

// 03 - Advanced Approach: [Using reduce() method]
const evenNumExtractAdvanced = (arr) => {
  return arr.reduce((acc, num) => {
    num % 2 === 0 && acc.push(num)
    return acc
  }, [])
}
// Example usage
console.log(evenNumExtractAdvanced([1, 2, 3, 4, 5, 6])) // [2, 4, 6]

// 04 - Expert Approach: [Using reduce() method with ternary operator]
const evenNumExtractExpert = (arr) => {
  return arr.reduce((acc, num) => (num % 2 === 0 ? acc.concat(num) : acc), [])
}
// Example usage
console.log(evenNumExtractExpert([1, 2, 3, 4, 5, 6])) // [2, 4, 6]
