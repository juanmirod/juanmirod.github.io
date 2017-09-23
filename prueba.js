const fs = require('fs')

function thread(fn) {
  var gen = fn()

  function next(res) {
    var ret = gen.next(res)
    if (ret.done) return
    ret.value.then(next)
  }
  
  next()
}

thread(function *(){
  var a = yield read('README.md')
  var b = yield read('index.html')
  console.log(a)
  console.log(b)
})


function read(path) {
  return new Promise(resolve => fs.readFile(path, 'utf8', (err, res) => resolve(res)))
}