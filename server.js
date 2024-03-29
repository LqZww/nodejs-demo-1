var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** start ************/

  if (path === '/') {
    var string = fs.readFileSync('./index.html', 'utf8')
    var amount = fs.readFileSync('./db', 'utf8')
    string = string.replace('&&&amount&&&', amount)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/style.css') {
    var string = fs.readFileSync('./style.css', 'utf8')
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  } else if (path === '/main.js') {
    var string = fs.readFileSync('./main.js', 'utf8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  }
  //①
  // else if (path === '/pay' && method.toUpperCase() === 'POST') {
  //   var amount = fs.readFileSync('./db', 'utf8')
  //   var newAmount = amount - 1
  //   if (Math.random() > 0.5) {
  //     fs.writeFileSync('./db', newAmount)
  //     response.write('success')
  //   } else {
  //     response.write('fail')
  //   }
  //   response.end()

  //②
  // else if (path === '/pay') {
  //   var amount = fs.readFileSync('./db', 'utf8')
  //   var newAmount = amount - 1
  //   if (Math.random() > 0.5) {
  //     fs.writeFileSync('./db', newAmount)
  //     response.setHeader('Content-Type', 'image/jpg')
  //     response.statusCode = 200
  //     response.write(fs.readFileSync('./1.jpg'))
  //   } else {
  //     response.statusCode = 400
  //     response.write('fail')
  //   }
  //   response.end()

  //③
  // else if (path === '/pay') {
  //   var amount = fs.readFileSync('./db', 'utf8')
  //   var newAmount = amount - 1
  //   if (Math.random() > 0.5) {
  //     fs.writeFileSync('./db', newAmount)
  //     response.setHeader('Content-Type', 'application/javascript')
  //     response.statusCode = 200
  //     response.write(`
  //     amount.innerText = amount.innerText - 1
  //     `)
  //   } else {
  //     response.statusCode = 400
  //     response.write('fail')
  //   }
  //   response.end()



  else if (path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db', newAmount)
    response.setHeader('Content-Type', 'application/javascript')
    response.statusCode = 200
    // response.write(`
    //   ${query.callback}.call(undefined,{
    //     "success":true,
    //     "left":${newAmount}
    //   })
    //   `)
    response.write(`
      ${query.callback}.call(undefined,'success')
      `)
    response.end()


    //分隔
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改server.js')
    response.end()
  }

  /******** end ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
