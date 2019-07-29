'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = () => {
  // git命令，远程拉取项目并自定义项目名
  let cmdStr = `npm run build`;

  console.log(chalk.white('\n Start build...'));

  let workerProcess = exec(cmdStr, (error, stdout, stderr) => {
    console.log(stdout);
    if (error) {
      console.log(error);
      process.exit()
    }
    console.log(chalk.green('\n Build failed!'));
    process.exit()
  })

  workerProcess.stdout.on('data', function (message) {
    console.log(message);
  });

  workerProcess.stderr.on('data', function (err) {
    console.log(err);
  });

};
