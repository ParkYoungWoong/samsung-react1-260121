// import x, { c, b } from './test1.js'
import { c, b as y } from './test1.js'
import x from './test1.js'

console.log(y) // {}
console.log(x) // 345
