'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = () => {
  // git命令，远程拉取项目并自定义项目名
  let cmdStr = `npm start -d`;

  console.log(chalk.white('\n Start server...'));

  exec(cmdStr, (error, stdout, stderr) => {
    console.log(stdout);
    if (error) {
      console.log(error);
      process.exit()
    }
    console.log(chalk.green('\n Server Started!'));
    process.exit()
  })

};
