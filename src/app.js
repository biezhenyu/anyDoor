
const http = require('http');
// 美化输出内容
const chalk = require('chalk');
const config = require('./config/defaultConfig');
const fs = require('fs');
const path = require('path');


http.createServer((req, res) => {
  res.statusCode = 200;
  // 拼接路径
  const filePath = path.join(config.root, req.url);
  
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Tyoe', 'text/palin');
      res.end(`${filePath} is not a file or directory`);
      return;
    }

    // 是文件
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Tyoe', 'text/palin');

      // 读取文件
      fs.createReadStream(filePath, {
        encoding: 'utf8'
      }).pipe(res)
    } else if (stats.isDirectory()) {  // 文件夹

      // 读取文件夹
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader('Content-Tyoe', 'text/palin');
        // 显示里面的文件
        res.end(files.join(','))

      })
    }
  })
 

}).listen(config.port, config.hostName, () => {
  let add = `http://${config.hostName}:${config.port}`;

  // chalk.green 打印为绿色
  console.info(`server start at ${chalk.green(add)}`)
})