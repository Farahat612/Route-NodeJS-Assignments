// desc : Function to find the index of an element in an array.
/*
  @param {array} arr
  @param {any} element
*/

// 01 - Simple Approach: [Using indexOf() method]
const indexOfElementSimple = (arr, element) => {
  return arr.indexOf(element)
}
// Example usage
console.log(indexOfElementSimple([1, 2, 3, 4, 5], 3)) // 2

// 02 - Intermediate Approach: [Using for loop]
const indexOfElementIntermediate = (arr, element) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) {
      return i
    }
  }
  return -1
}
// Example usage
console.log(indexOfElementIntermediate([1, 2, 3, 4, 5], 3)) // 2

// 03 - Advanced Approach: [Using recursion]
function indexOfElementAdvanced(arr, element, index = 0) {
  if (arr.length === 0) {
    return -1
  } else if (arr[0] === element) {
    return index
  } else {
    return indexOfElementAdvanced(arr.slice(1), element, index + 1)
  }
}
