// desc : Function to check if a string is a palindrome
/*
 @{param} {string} str
*/

// 01 - Simple Approach: [using reverse() method]
const isPalindromeSimple = (str) => {
  const reversedStr = str.split('').reverse().join('')
  return str === reversedStr
}
// Example usage
console.log(isPalindromeSimple('madam')) // true
console.log(isPalindromeSimple('hello')) // false

// 02 - Beginner Approach: [Without using reverse() method]
const isPalindromeBeginner = (str) => {
  const len = Math.floor(str.length / 2)
  for (let i = 0; i < len; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false
    }
  }
  return true
}
// Example usage
console.log(isPalindromeBeginner('madam')) // true
console.log(isPalindromeBeginner('hello')) // false

// 03 - Intermediate Approach: [Using Two Pointers]
const isPalindromeIntermediate = (str) => {
  let left = 0
  let right = str.length - 1
  while (left < right) {
    if (str[left] !== str[right]) {
      return false
    }
    left++
    right--
  }
  return true
}
// Example usage
console.log(isPalindromeIntermediate('madam')) // true
console.log(isPalindromeIntermediate('hello')) // false

// 04 - Advanced Approach: [Using Recursion]
function isPalindromeAdvanced(str) {
  if (str.length <= 1) {
    return true
  }
  if (str[0] !== str[str.length - 1]) {
    return false
  }
  return isPalindromeAdvanced(str.slice(1, str.length - 1))
}
// Example usage
console.log(isPalindromeAdvanced('madam')) // true
console.log(isPalindromeAdvanced('hello')) // false
