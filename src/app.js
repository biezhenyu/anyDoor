
const http = require('http');
// 美化输出内容
const chalk = require('chalk');
const config = require('./config/defaultConfig');

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<body>');
  res.write('<h1>');
  res.write('hello http');
  res.write('<h1>');
  res.write('</body>');
  res.end('</html>');


}).listen(config.port, config.hostName, () => {
  let add = `http://${config.hostName}:${config.port}`;

  // chalk.green 打印为绿色
  console.info(`server start at ${chalk.green(add)}`)
})