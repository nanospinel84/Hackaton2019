const fs = require('fs')

const walk = (dir) => {
    let results = []
    let list = fs.readdirSync(dir)
    list.forEach(file => {
        file = dir + '/' + file
        let stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file))
        } else {
            results.push(file)
        }
    })
    return results
}

const requires = (files) => {
  let out = {}

  files.forEach(file => {
    let paths = file.split('/')
    let filename = paths[path.length - 1]
    let typeless = filename.substr(0, filename.lastIndexOf('.')) || filename

    out[typeless] = require(file)
  })

  return out
}

module.exports = requires(walk('.'))
