// desc : Function to find the factorial of a number
/*
  @param {number} num
*/

// 01 - Beginner Approach: [Using for loop]
const factorialBeginner = (num) => {
  let factorial = 1
  for (let i = 1; i <= num; i++) {
    factorial *= i
  }
  return factorial
}
// Example usage
console.log(factorialBeginner(5)) // 120

// 02 - Intermediate Approach: [Using recursion]
function factorialIntermediate(num) {
  if (num === 0) {
    return 1
  } else {
    return num * factorialIntermediate(num - 1)
  }
}
// Example usage
console.log(factorialIntermediate(5)) // 120

// 03 - Advanced Approach: [Using reduce() method]
const factorialAdvanced = (num) => {
  return Array.from({ length: num }, (_, i) => i + 1).reduce((acc, num) => acc * num, 1)
}
// Example usage
console.log(factorialAdvanced(5)) // 120