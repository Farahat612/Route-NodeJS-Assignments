// desc : Function that reverses a string
/*
  @param {string} str
*/
// 03 - Beginner Approach: [Without using reverse() method]
const reverseStringBeginner = (str) => {
  let reversedStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i]
  }
  return reversedStr
}
// Example usage
console.log(reverseStringBeginner('abcde')) // olleh

// 04 - Intermediate Approach: [Using Two Pointers]
const reverseStringIntermediate = (str) => {
  let reversedStr = ''
  let left = 0
  let right = str.length - 1
  while (left <= right) {
    reversedStr = str[left] + reversedStr
    left++
  }
  return reversedStr
}
// Example usage
console.log(reverseStringIntermediate('abcde')) // olleh

// 05 - Advanced Approach: [Using Recursion]
function reverseStringAdvanced(str) {
  if (str === '') {
    return ''
  } else {
    return reverseStringAdvanced(str.substr(1)) + str[0]
  }
}
// Example usage
console.log(reverseStringAdvanced('abcde')) // olleh
