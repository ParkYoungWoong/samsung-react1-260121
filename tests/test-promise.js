function a() {
  return 1
}
async function b() {
  return 2
}

a() // 1
const res = b() // Promise {2}
console.log(await res) // 2
