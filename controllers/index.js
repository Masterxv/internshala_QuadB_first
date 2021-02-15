const fetch = require('node-fetch')

function objSlice(obj, lastExclusive) {
  var filteredKeys = Object.keys(obj).slice(0, lastExclusive)
  var newObj = {}
  filteredKeys.forEach(function (key) {
    newObj[key] = obj[key]
  })
  return newObj
}

exports.getIndex = async (req, res, next) => {
  try {
    const result = await fetch('https://api.wazirx.com/api/v2/tickers')
    const data = await result.json()
    var details = objSlice(data, 10)
    res.render('home', {
      pageTitle: 'Home Page',
      path: '/index',
      details: details,
    })
  } catch (err) {
    const error = new Error(err)
    error.httpStatusCode = 500
    return next(error)
  }
}
