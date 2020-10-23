'use strict';
const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');

module.exports = () => {
  co(function *() {
    // 处理用户输入
    let tplName = 'base',
    projectName = yield prompt('Project name: '),
      initTemplateUrl,
      localPath = process.cwd();
    // branch;

    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n × Template does not exit!'));
      process.exit()
    }
    // gitUrl = config.tpl[tplName].url;
    // branch = config.tpl[tplName].branch;

    // git命令，远程拉取项目并自定义项目名
    // let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
    initTemplateUrl = config.tpl[tplName].url;
    // 修改为本地模版不使用远程模版
    let cmdStr = `cp -r ${initTemplateUrl} ${localPath} && 
    rm -rf ./${projectName} && 
    mv -f ./react-cli-init-project ./${projectName}`;

    console.log(chalk.white('\n Start generating...'));

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        process.exit()
      }

      console.log(
        chalk.green('\n √ Generation completed!'),`\n Please `,
        chalk.blue(`\n cd ${projectName} && npm install \n`)
      );

      process.exit()
    })


    // 普及知识。
    // 使用spawn需要下面两个函数进行监听
    // workerProcess.stdout.on('data', function (message) {
    //   console.log(message);
    // });
    //
    // workerProcess.stderr.on('close', function () {
    // });

    //exec 可以接受最大200k shell返回数据，而spawn可以接受任意返回数据，一般用于文件读取，图像处理等
  })
};
