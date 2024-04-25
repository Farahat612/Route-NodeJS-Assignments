// desc : Deep clone function that creates a copy of a nested object or array without any reference to the original.
/*
  @param {object} obj
*/

// 01 - Simple Approach: [Using JSON.parse() and JSON.stringify()]
const deepCloneSimple = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
// Example usage
const obj1 = { a: 1, b: { c: 2 } }
const obj2 = deepCloneSimple(obj1)
obj2.b.c = 20
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 1, b: { c: 20 } }

// 02 - Beginner Approach: [Using recursion]
const deepCloneIntermediate = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const clone = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    clone[key] = deepCloneIntermediate(obj[key])
  }
  return clone
}
// Example usage
const obj3 = { a: 1, b: { c: 2 } }
const obj4 = deepCloneIntermediate(obj3)
obj4.b.c = 20
console.log(obj3) // { a: 1, b: { c: 2 } }
console.log(obj4) // { a: 1, b: { c: 20 } }

// 03 - Advanced Approach: [Using Spread Operator and Recursion]
function deepCloneAdvanced(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const clone = Array.isArray(obj) ? [...obj] : { ...obj }
  Object.keys(clone).forEach((key) => {
    clone[key] = deepCloneAdvanced(clone[key])
  })
  return clone
}
// Example usage
const obj5 = { a: 1, b: { c: 2 } }
const obj6 = deepCloneAdvanced(obj5)
obj6.b.c = 20
console.log(obj5) // { a: 1, b: { c: 2 } }
console.log(obj6) // { a: 1, b: { c: 20 } }
