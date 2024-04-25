// desc : Function that takes in a number representing age in years and returns the age in days.
/*
 @param {number} age - age in years
*/

//  01 - Simple Approach: [Multiplying age by 365]
const ageToDaysSimple = (age) => {
  return age * 365
}
// Example usage
console.log(ageToDaysSimple(5)) // 1825
console.log(ageToDaysSimple(10)) // 3650

//  02 - Intermediate Approach: [Considering leap years]
function ageToDaysIntermediate(age) {
  return (
    age * 365 +
    Math.floor(age / 4) -
    Math.floor(age / 100) +
    Math.floor(age / 400)
  )
}
// Example usage
console.log(ageToDaysIntermediate(5)) // 1826
console.log(ageToDaysIntermediate(10)) // 3652
