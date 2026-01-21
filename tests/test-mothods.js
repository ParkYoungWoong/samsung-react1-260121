const obj = {
  a: 1,
  b: function () {
    console.log(this) // obj
  },
  c() {
    console.log(this) // obj
  },
  d: () => {
    console.log(this) // undefined
  }
}

obj.b()
obj.c()
obj.d()

export {}
