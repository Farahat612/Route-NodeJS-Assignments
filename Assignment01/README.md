# Assignment 01

This assignment consists of 13 JavaScript problems. Below are the problems and my best solution for each of them.

> Code file attahced for each problem contains my multiple solutions varying in approach difficulty as possible.

| Problem                            | Solution            | code file                                    |
| ---------------------------------- | ------------------- | -------------------------------------------- |
| Sum of Two Numbers                 | [Link](#problem-1)  | [Link](./Assignment01/01.basicSum.js)        |
| Check Palindrome                   | [Link](#problem-2)  | [Link](./Assignment01/02.palindrome.js)      |
| Reverse String                     | [Link](#problem-3)  | [Link](./Assignment01/03.reverseString.js)   |
| Extract Even Numbers               | [Link](#problem-4)  | [Link](./Assignment01/04.evenNumExtract.js)  |
| Deep Clone                         | [Link](#problem-5)  | [Link](./Assignment01/05.deepClone.js)       |
| Reverse String without `reverse()` | [Link](#problem-6)  | [Link](./Assignment01/06.reverseString.js)   |
| Sum of Array                       | [Link](#problem-7)  | [Link](./Assignment01/07.arraySum.js)        |
| Factorial                          | [Link](#problem-8)  | [Link](./Assignment01/08.factorial.js)       |
| Average Value                      | [Link](#problem-9)  | [Link](./Assignment01/09.avgValue.js)        |
| Index of Element                   | [Link](#problem-10) | [Link](./Assignment01/10.indexOfElement.js)  |
| Check Integer                      | [Link](#problem-11) | [Link](./Assignment01/11.isInteger.js)       |
| Age to Days                        | [Link](#problem-12) | [Link](./Assignment01/12.ageToDays.js)       |
| Callbacks                          | [Link](#problem-13) | [Link](./Assignment01/13.callbackExample.js) |

## Problem 01 : Sum of Two Numbers <a name="problem-1"></a>

> Write a JavaScript function to calculate the sum of two numbers.

Solution:

```javascript
const basicSum = (a, b) => {
  return a + b
}
// Exapmle usage
console.log(basicSum(2, 3)) // 5
console.log(basicSum(5, 7)) // 12
```

## Problem 02 : Check Palindrome <a name="problem-2"></a>

> Write a JavaScript function to check if a given string is a palindrome.

Solution:

```javascript
// Advanced Approach: [Using Recursion]
function isPalindrome(str) {
  if (str.length <= 1) {
    return true
  }
  if (str[0] !== str[str.length - 1]) {
    return false
  }
  return isPalindrome(str.slice(1, str.length - 1))
}
// Example usage
console.log(isPalindrome('madam')) // true
console.log(isPalindrome('hello')) // false
```

Explaination:

> - The base case of the recursion is when the length of the string is less than or equal to 1. In this case, the function returns true because a single character or an empty string is considered a palindrome.
> - If the base case is not met, the function checks if the first character of the string `str[0]` is equal to the last character of the string `str[str.length - 1]`. If they are not equal, it means the string is not a palindrome, so the function returns false.
> - If the first and last characters are equal, the function calls itself recursively with the substring obtained by removing the first and last characters of the original string. This is done using the slice method: `str.slice(1, str.length - 1)`. The function then repeats the process with the new substring.
> - The recursion continues until the base case is met or the string is determined to be not a palindrome. If the recursion reaches the base case, the function returns true, indicating that the string is a palindrome

## Problem 03 : Reverse String <a name="problem-3"></a>

> Write a JavaScript program to reverse a given string.

Solution:

```javascript
// Beginner Approach: [Without using reverse() method]
const reverseStringBeginner = (str) => {
  let reversedStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i]
  }
  return reversedStr
}
// Example usage
console.log(reverseString('abcde')) // edcba
```

Explaination:

> - First, we initialized a variable called `reversedStr` as an empty string.
> - Next, we iterate over the characters of the input string in reverse order using `for` loop.
> - In each iteration, the current character is appended to the `reversedStr` variable using the `+=` operator.
> - Finally, the `reversedStr` variable, which now contains the reversed string, is returned as the result of the function.

## Problem 04 : Extract Even Numbers <a name="problem-4"></a>

> Write a JavaScript function that takes an array of numbers and returns a new array with only the even numbers.

Solution:

```javascript
// Simple Approach: [using filter() method]
const evenNumExtract = (arr) => {
  return arr.filter((num) => num % 2 === 0)
}
// Example usage
console.log(evenNumExtract([1, 2, 3, 4, 5, 6])) // [2, 4, 6]
```

Explaination:

> The function simply utilizes filter method to return specific elemnts from the array filtered according a specified condition.

## Problem 05 : Deep Clone <a name="problem-5"></a>

> Implement a deep clone function in JavaScript that creates a copy of a nested object or array without any reference to the original.

Solution:

```javascript
// Simple Approach: [Using JSON.parse() and JSON.stringify()]
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
// Example usage
const obj1 = { a: 1, b: { c: 2 } }
const obj2 = deepClone(obj1)
obj2.b.c = 20
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 1, b: { c: 20 } }
```

Explaination:

> - The function takes an object as its parameter and returns a deep copy of that object.
> - It achieves this by first converting the object to a `JSON` string using `JSON.stringify()`, and then parsing that `JSON` string back into a new object using `JSON.parse()`.
> - This process creates a new object with the same structure and values as the original, but without any reference to the original object.

## Problem 06 : Reverse String without `reverse()` <a name="problem-6"></a>

> Implement a function to reverse a string without using the built-in `reverse()` method.

Solution:

```javascript
// Advanced Approach: [Using Recursion]
function reverseString(str) {
  if (str === '') {
    return ''
  } else {
    return reverseString(str.substr(1)) + str[0]
  }
}
// Example usage
console.log(reverseString('abcde')) // edcba
```

Explaination:

> The function reverses a string by breaking it down into smaller substrings and gradually building up the reversed string through the recursive calls.
>
> - The base case checks if the string `str` is empty `''`. If it is, it means we have reached the end of the string and there is nothing more to reverse. In this case, the function simply returns an empty string.
> - If the base case is not met, the function enters the recursive case. It calls itself with the substring of `str` starting from the second character `str.substr(1)` and concatenates it with the first character of the original string `str[0]`. This reverses the order of the characters in the string.
> - The recursive calls continue until the base case is met, at which point the function starts returning the reversed substrings one by one, eventually resulting in the fully reversed string.

## Problem 07 : Sum of Array <a name="problem-7"></a>

> Implement a function to find the sum of all the numbers in an array.

Solution:

```javascript
// Simple Approach: [Using reduce() method]
const arraySum = (arr) => {
  return arr.reduce((acc, num) => acc + num, 0)
}
// Example usage
console.log(arraySum([1, 2, 3, 4, 5])) // 15
```

Explaination:

> The function simply utilizes reduce method with a `callback` function that adds each element to the `accumlator`.

## Problem 08 : Factorial <a name="problem-8"></a>

> Write a function that accepts a number and returns its factorial (e.g., factorial of 5 is 5 x 4 x 3 x 2 x 1).

Solution:

```javascript
// Intermediate Approach: [Using recursion]
function factorial(num) {
  if (num === 0) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
// Example usage
console.log(factorial(5)) // 120
```

Explaination:

> - First, we have an if statement that checks if the `num` is equal to 0. If it is, the function returns 1, because the factorial of 0 is defined as 1.
> - If the num is not equal to 0, the function recursively calls itself with the argument `num - 1` and multiplies it with the current value of `num`.
> - This process continues until `num` becomes 0, at which point the recursion stops and the final result is returned.

## Problem 09 : Average Value <a name="problem-9"></a>

> Implement a function that returns the average value of numbers in an array.

Solution:

```javascript
// Simple Approach: [Using reduce() method]
const avgValue = (arr) => {
  return arr.reduce((acc, num) => acc + num, 0) / arr.length
}
// Example usage
console.log(avgValue([1, 2, 3, 4, 5])) // 3
```

Explaination:

> The function simply utilizes reduce method with a `callback` function that adds each element to the `accumlator` to sum all elements and then divide by the arr `length`.

## Problem 10 : Index of Element <a name="problem-10"></a>

> Implement a function that finds the index of a specific element in an array. If the element is not found, the function should return -1.

Solution:

```javascript
// Simple Approach: [Using indexOf() method]
const indexOfElement = (arr, element) => {
  return arr.indexOf(element)
}
// Example usage
console.log(indexOfElement([1, 2, 3, 4, 5], 3)) // 2
```

Explaination:

> The function simply utilizes built-in `indexOf` method to return the `index` of specified element or `-1`.

## Problem 11 : Check Integer <a name="problem-11"></a>

> How would you check if a number is an integer?

Solution:

```javascript
// Simple Approach: [Using modulos operator]
const isInteger = (num) => {
  return num % 1 === 0
}
// Example usage
console.log(isInteger(5)) // true
console.log(isInteger(5.5)) // false;
```

Explaination:

> The function simply determines if the `num` is `integer` using `modulos` operator, if the reminder of dividing the `num` by 1 is zero, then it's an `integer` number.

## Problem 12 : Age to Days <a name="problem-12"></a>

> Create a function that takes the age in years and returns the age in days.

Solution:

```javascript
// Intermediate Approach: [Considering leap years]
function ageToDays(age) {
  return (
    age * 365 +
    Math.floor(age / 4) -
    Math.floor(age / 100) +
    Math.floor(age / 400)
  )
}
// Example usage
console.log(ageToDays(5)) // 1826
console.log(ageToDays(10)) // 3652
```

Explaination:

> - `age * 365`: This calculates the number of days for complete years. Since there are 365 days in a year, we multiply the age by 365.
> - `Math.floor(age / 4)`: This accounts for the extra day added for leap years. A leap year occurs every 4 years, so we divide the age by 4 and take the floor value to get the number of leap years.
> - `Math.floor(age / 100)`: This adjusts for the years that are not leap years. Every 100 years, there is no leap year. So we divide the age by 100 and take the floor value to subtract the number of non-leap years.
> - `Math.floor(age / 400)`: This corrects for the exception to the previous rule. Every 400 years, there is a leap year. So we divide the age by 400 and take the floor value to add the number of leap years.

## Problem 13 : Callbacks <a name="problem-13"></a>

> Explain what a callback function is and provide a simple example.

Solution:

> A callback function is a function that is passed as an argument to another function and is executed after its parent function has finished executing. Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution.

Here's a simple example of a callback function:

```javascript
function greeting(name) {
  console.log('Hello ' + name)
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.')
  callback(name)
}

processUserInput(greeting)
```

> In this example, `greeting` is a callback function. It's passed as an argument to `processUserInput`. When `processUserInput` is called, it prompts the user to enter their `name`, then it calls the `greeting` function, passing in the `name` entered by the user.
