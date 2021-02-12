const fetch = require('node-fetch')

function objSlice(obj, lastExclusive) {
  var filteredKeys = Object.keys(obj).slice(0, lastExclusive)
  var newObj = {}
  filteredKeys.forEach(function (key) {
    newObj[key] = obj[key]
  })
  return newObj
}


exports.getIndex = (req, res, next) => {
  fetch('https://api.wazirx.com/api/v2/tickers')
    .then((res) => res.json())
    .then((data) => {
      var details = objSlice(data, 10)
      res.render('home', {
        pageTitle: 'Home Page',
        path: '/index',
        details: details,
      })
    })
    .catch((err) => {
      const error = new Error(err)
      error.httpStatusCode = 500
      return next(error)
    })
    
}
