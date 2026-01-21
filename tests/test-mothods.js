const obj = {
  a: 1,
  b: function () {
    console.log(this)
  },
  c() {
    console.log(this)
  },
  d: () => {
    console.log(this)
  }
}

obj.b()
obj.c()
obj.d()
